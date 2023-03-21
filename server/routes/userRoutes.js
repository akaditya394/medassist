const {
  register,
  login,
  protect,
  logout,
  forgotPassword,
  resetPassword,
  checkUser,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
