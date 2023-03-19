const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");
const User = require("../models/User");
const { issueToken } = require("../utils/token");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    issueToken(res, user);
    await user.save();
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.json(err.message);
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

    return res.status(200).json({
      user,
    });
  } catch (error) {
    res.json(error.message);
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
    res.json("error");
  }
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000), //expires in 10 seconds
    httpOnly: true,
  });

  res.status(200).json({
    status: "successfully logged out",
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("There is no user existing with this email.");
    }

    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });
    try {
      // await sendEmail(
      //   user,
      //   { title: "Reset Password", token: resetToken },
      //   "resetPassword"
      // );
      console.log("hello");
      res.status(200).json({
        resetToken,
        user,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error("There was an error sending the email.");
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.resetToken)
      .digest("hex");
    const user = await User.findOne({ passwordResetToken: hashedToken });
    if (!user) {
      throw new Error("Token is invalid or has expired. Please try again");
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    issueToken(res, user);
    await user.save();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.json(err.message);
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
