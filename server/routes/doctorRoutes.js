const {
  register,
  login,
  protectDoc,
  forgotPassword,
  resetPassword,
  verifyDoctor,
  viewMedicalHistory,
  getAllUnverifiedPrescriptions,
} = require("../controllers/doctorController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/verify", verifyDoctor);
router.get(
  "/unverifiedPrescriptions",
  protectDoc,
  getAllUnverifiedPrescriptions
);
router.get("/medicalHistory", viewMedicalHistory);

module.exports = router;
