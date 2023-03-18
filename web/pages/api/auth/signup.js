import { connectDb, disconnectDb } from "../../../server/mongo/mongo";
import issueToken from "../../../server/utils/token";
const User = require("../../../server/models/User");
const nc = require("next-connect");
const handler = nc();

// user signup handler
handler.post(async (req, res) => {
  try {
    await connectDb();
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    issueToken(res, user);

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log("error message");
    res.json(err.message);
  }
});

export default handler;
