const {
  register,
  login,
  protectDoc,
  forgotPassword,
  resetPassword,
  verifyDoctor,
  viewMedicalHistory,
  getAllUnverifiedPrescriptions,
  getAllDoctors,
} = require("../controllers/doctorController");
const { protect } = require("../controllers/userController");

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
router.get("/allDoctors", protect, getAllDoctors);

module.exports = router;
