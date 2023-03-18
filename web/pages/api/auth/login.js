import { connectDb, disconnectDb } from "../../../server/mongo/mongo";
import issueToken from "../../../server/utils/token";
const User = require("../../../server/models/User");
const nc = require("next-connect");
const handler = nc();

// user login handler
handler.post(async (req, res) => {
  try {
    await connectDb();
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password, user.password))) {
      throw new Error("Incorrect email or password!");
    }

    user.password = undefined;

    issueToken(res, user);
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

export default handler;
