const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");
const User = require("../models/User");
const { issueToken } = require("../utils/token");
const sendEmail = require("../utils/email");
const Prescription = require("../models/Prescriptions");
const Doctor = require("../models/Doctor");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.register = async (req, res) => {
  const { name, email, password, age, weight } = req.body;

  if (!name || !email || !password || !age || !weight) {
    return res.status(401).json({
      type: "error",
      message: "Invalid or No Credentials",
    });
  }

  try {
    const user = new User({
      name,
      email,
      password,
      age,
      weight,
    });

    const token = issueToken(res, user);
    await user.save();

    res.status(200).json({
      type: "success",
      user,
      token,
      message: "Signed up successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({
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

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password, user.password))) {
      return res.status(401).json({
        type: "error",
        message: "Incorrect email or password!",
      });
    }
    user.password = undefined;

    const token = issueToken(res, user);

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
      const currentUser = await User.findById({ _id: decoded.sub });
      if (!currentUser) {
        throw new Error("The user does not exist anymore.");
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

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        type: "error",
        message: "There is no user registered with this email.",
      });
    }

    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });
    try {
      await sendEmail(user, { title: "Reset Password", token: resetToken });

      return res.status(200).json({
        type: "success",
        message:
          "Email sent successfully. Check your registered email id and proceed to the given link",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
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
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({
        type: "error",
        message: "Link is invalid or has expired. Please try again",
      });
    }

    user.password = req.body.formData.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    issueToken(res, user);
    await user.save();
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

exports.uploadImage = async (req, res) => {
  const { file } = req.files;
  // console.log(req);
  console.log(res);
  try {
    cloudinary.uploader
      .upload(file.tempFilePath, {
        public_id: `${Date.now()}`,
        folder: "prescriptions",
        filename_override: file.name,
      })
      .then((result) => {
        // const data = await User.findByIdAndUpdate(req.user.id, {$push: {prescriptions: }})
        console.log(result);
      });
  } catch (error) {
    res.json({
      type: "error",
      message: error.message,
    });
  }
};

exports.getAllUnverifiedPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      isVerified: false,
      user: res.locals.id,
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

exports.getAllVerifiedPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      isVerified: true,
      user: res.locals.id,
    });
    if (prescriptions.length === 0) {
      return res.status(401).json({
        type: "error",
        message: "No verified prescriptions",
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

exports.assignDoctor = async (req, res) => {
  // need to see how these id are coming
  const { d_id, p_id } = req.body;
  const doc = await Doctor.findOne({ _id: d_id });
  const pres = await Prescription.findOne({ _id: p_id });
  try {
    const doctor = await Doctor.findByIdAndUpdate(d_id, {
      $push: { prescriptions: pres },
    });
    const presc = await Prescription.findByIdAndUpdate(p_id, {
      $push: { doctor: doc },
    });

    res.status(200).json({
      type: "success",
    });
  } catch (error) {
    res.status(200).json({
      type: "error",
      message: error.message,
    });
  }
};

// exports.protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     throw new Error("You are not logged in! Please log in to get access.");
//   }

//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const currentUser = await User.findById({ _id: decoded.id });
//   if (!currentUser) {
//     throw new Error("The user does not exist anymore.");
//   }
//   // if (currentUser.changedPasswordAfter(decoded.iat)) {
//   //   return next(
//   //     new AppError('User recently changed password! Please log in again.', 401)
//   //   );
//   // }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   // res.locals.user = currentUser;
//   next();
// };
