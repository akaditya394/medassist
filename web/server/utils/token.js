const jwt = require("jsonwebtoken");

// generates a jwt token
export default function issueToken(res, user) {
  const id = user._id;
  const token = jwt.sign({ sub: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
}
