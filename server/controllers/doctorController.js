const Doctor = require("../models/Doctor");
const Prescription = require("../models/Prescriptions");
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
    issueToken(res, doctor);
    res.status(200).json({
      type: "success",
      doctor,
      message: "Signed up successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({
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

    issueToken(res, doctor);

    res.status(200).json({
      type: "success",
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
      return res.status(401).json({
        type: "error",
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
