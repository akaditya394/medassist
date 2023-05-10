const Doctor = require("../models/Doctor");
const Prescription = require("../models/Prescriptions");
const crypto = require("crypto");
const puppeteer = require("puppeteer");
const sendEmail = require("../utils/email");
const { issueToken } = require("../utils/token");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(401).json({
      type: "error",
      message: "Invalid or No Credentials",
    });
  }

  const oldDoctor = await Doctor.findOne({ email });

  if (oldDoctor) {
    return res.status(409).json({
      type: "error",
      message: "Doctor Already exists",
    });
  }

  try {
    const doctor = new Doctor({
      name,
      email,
      password,
    });

    await doctor.save();

    if (!doctor) {
      return res.json({
        type: "error",
        message: "Some error occured...please try again",
      });
    }
    const token = issueToken(res, doctor);
    res.status(200).json({
      type: "success",
      doctor,
      token,
      message: "Signed up successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(err.status).json({
      type: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        type: "error",
        message: "Invalid or No Credentials",
      });
    }

    const doctor = await Doctor.findOne({ email }).select("+password");

    if (!doctor || !(await doctor.verifyPassword(password, doctor.password))) {
      return res.status(401).json({
        type: "error",
        message: "Incorrect email or password!",
      });
    }
    doctor.password = undefined;

    const token = issueToken(res, doctor);

    res.status(200).json({
      type: "success",
      token,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  let decoded;
  if (token) {
    try {
      decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({
        type: "error",
        message: error.message,
      });
    }

    try {
      const currentDoctor = await Doctor.findById({ _id: decoded.sub });
      if (!currentDoctor) {
        throw new Error("This Doctor does not exist anymore.");
      }
      res.locals.id = decoded.sub;
      console.log("Success from middleware");
      next();
    } catch (error) {
      return res.status(500).json({
        type: "error",
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      type: "error",
      message: "You aren't Logged In",
    });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000), //expires in 10 seconds
    httpOnly: true,
  });

  res.status(200).json({
    type: "success",
    message: "Successfully logged out",
  });
};

exports.getAllUnverifiedPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      isVerified: false,
      doctor: { $in: res.locals.id },
    });
    if (prescriptions.length === 0) {
      return res.json({
        type: "success",
        prescriptions,
        message: "No unverified prescriptions",
      });
    }
    res.status(200).json({
      type: "success",
      prescriptions,
    });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ email: req.body.email });

    if (!doctor) {
      return res.json({
        type: "error",
        message: "There is no doctor registered with this email.",
      });
    }

    const resetToken = doctor.createResetToken();
    await doctor.save({ validateBeforeSave: false });
    try {
      await sendEmail(doctor, { title: "Reset Password", token: resetToken });

      return res.status(200).json({
        type: "success",
        message:
          "Email sent successfully. Check your registered email id and proceed to the given link",
      });
    } catch (err) {
      doctor.passwordResetToken = undefined;
      doctor.passwordResetExpires = undefined;
      await doctor.save({ validateBeforeSave: false });
      return res.json({
        type: "error",
        message: err.message,
      });
    }
  } catch (err) {
    res.json({
      type: "error",
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");
    const doctor = await Doctor.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!doctor) {
      return res.json({
        type: "error",
        message: "Link is invalid or has expired. Please try again",
      });
    }

    doctor.password = req.body.password;
    doctor.passwordResetToken = undefined;
    doctor.passwordResetExpires = undefined;

    issueToken(res, doctor);
    await doctor.save();
    res.status(200).json({
      type: "success",
      message: "Password changed successfully",
    });
  } catch (err) {
    res.json({
      type: "error",
      message: err.message,
    });
  }
};
exports.verifyDoctor = async (req, res) => {
  try {
    const { name, regNumber, value } = req.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://www.nmc.org.in/information-desk/indian-medical-register/"
    );
    const docName = await page.$('input[id="doctorName"]');
    await docName.type(name);
    const docReg = await page.$('input[id="doctorRegdNo"]');
    await docReg.type(regNumber);
    // const selectElem = await page.$('select[id="advsmcId"]');
    // await selectElem.type(value);
    // const ran = await page.click('input[value="2023"]');
    // console.log(ran.handle, "Ypo");

    await page.click("#doctor_advance_Details");
    await page.waitForSelector("#totalRecords5", {
      visible: true,
    });
    const quotes = await page.evaluate(() => {
      const quote = document.querySelector("#totalRecords5").innerText;
      return quote;
    });

    await browser.close();
    if (Number(quotes.split(":")[1]) === 0) {
      return res.status(200).json({
        type: "success",
        message: "Doctor is not verified",
        verified: false,
      });
    }
    return res.status(200).json({
      type: "success",
      message: "Doctor is verified ",
      verified: true,
    });
  } catch (err) {
    res.status(500).json({
      type: "error",
      message: "Error in verifying doctor.",
    });
  }
};
