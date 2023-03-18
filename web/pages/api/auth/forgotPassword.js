import { connectDb, disconnectDb } from "../../../server/mongo/mongo";
const User = require("../../../server/models/User");
const nc = require("next-connect");
const handler = nc();

handler.post(async (req, res) => {
  try {
    await connectDb();
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("There is no user existing with this email.");
    }
    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });
    try {
      // email to be implemented using nodemailer

      //   await sendEmail(
      //     user,
      //     { title: "Reset Password", token: resetToken },
      //     "resetPassword"
      //   );

      res.status(200).json({
        user,
        resetToken,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error("There was an error sending the email.");
    }
  } catch (err) {
    res.json(err.message);
  }
});

export default handler;
