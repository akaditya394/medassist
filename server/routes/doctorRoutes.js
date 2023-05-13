const {
  register,
  login,
  protect,
  forgotPassword,
  resetPassword,
  verifyDoctor,
  viewMedicalHistory,
} = require("../controllers/doctorController");
const {
  getAllUnverifiedPrescriptions,
} = require("../controllers/doctorController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/verify", verifyDoctor);
router.get("/unverifiedPrescriptions", protect, getAllUnverifiedPrescriptions);
router.get("/medicalHistory", viewMedicalHistory);

module.exports = router;
