const router = require("express").Router();
const {
  addPrescriptions,
  getAllPrescriptions,
  verify,
} = require("../controllers/prescriptionController");
const { protect } = require("../controllers/userController");

router.get("/allPrescriptions", protect, getAllPrescriptions);
router.post("/uploadPrescription", protect, addPrescriptions);
// router.patch("/verifyPrescription", protect, verify);

module.exports = router;
