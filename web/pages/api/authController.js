// This file is under work
// Doing the modifications according to the designed login, signup

const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const { sendOtp, verifyOtp } = require("../utils/twilio");
require("dotenv").config();

function issueToken(res, user) {
  const id = user._id;
  const token = jwt.sign({ sub: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  // return token;
}

exports.register = async (req, res, next) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: `+91${req.body.phone}`,
    });

    // sendOtp(user.phone);
    await user.save();

    // let otp = ;
    // user.otp = otp;
    sendOtp(req.body.phone);
    // if (await this.verifyOTP(req)) {
    // await user.save();
    // sendSms(user.phone, `hello from client connect.`);

    issueToken(res, user);

    // return res.status(200).json({
    //   token,
    // });
    return next();
    // }
  } catch (err) {
    res.json(err.message);
    return;
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password, user.password))) {
      throw new Error("Incorrect email or password!");
    }

    user.password = undefined;

    issueToken(res, user);
    // return res.status(200).json({
    //   token,
    // });
    // showAlert("success", "Logged in Succesfully");
    return next();
  } catch (error) {
    // showAlert("error", "Some error occured");
  }
};

exports.protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/");
      } else {
        // console.log(decodedToken);
        res.locals.id = decodedToken.sub;
        next();
      }
    });
  } else {
    res.redirect("/");
  }
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000), //expires in 10 seconds
    httpOnly: true,
  });

  // res.status(200).json({
  //   status: 'success'
  // })
  next();
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // user = user[0];
    // console.log(user);
    if (!user) {
      throw new Error("There is no user existing with this email.");
    }
    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });
    try {
      await sendEmail(
        user,
        { title: "Reset Password", token: resetToken },
        "resetPassword"
      );
      // console.log("hello");
      next();
      // res.status(200).json({
      //   status: "success",
      //   user,
      // });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error("There was an error sending the email.");
    }
  } catch (err) {
    res.json(err.message);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");
    const user = await User.findOne({ passwordResetToken: hashedToken });
    if (!user) {
      throw new Error("Token is invalid or has expired. Please try again");
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    issueToken(res, user);
    next();
  } catch (err) {
    res.json(err.message);
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { otp } = req.body;
  // console.log(otp, res.locals.id);
  const user = await User.findById(res.locals.id);
  verifyOtp(user.phone, otp);
  res.redirect("/dashboard");
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
