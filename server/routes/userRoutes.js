const {
  register,
  login,
  protect,
  logout,
  forgotPassword,
  resetPassword,
  checkUser,
  uploadImage,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/uploadImage", protect, uploadImage);

module.exports = router;
