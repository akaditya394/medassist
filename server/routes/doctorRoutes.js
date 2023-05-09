const {
  register,
  login,
  protect,
  forgotPassword,
  resetPassword,
} = require("../controllers/doctorController");
const {
  getAllUnverifiedPrescriptions,
} = require("../controllers/doctorController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.get("/unverifiedPrescriptions", protect, getAllUnverifiedPrescriptions);

module.exports = router;
