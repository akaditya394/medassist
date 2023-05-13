const router = require("express").Router();
const {
  addPrescriptions,
  getAllPrescriptions,
  verify,
  addDrugs,
  getSideEffects,
} = require("../controllers/prescriptionController");
const { protect } = require("../controllers/userController");

router.get("/allPrescriptions", protect, getAllPrescriptions);
router.post("/uploadPrescription", protect, addPrescriptions, addDrugs);
router.get("/getSide", getSideEffects);
// router.patch("/verifyPrescription", protect, verify);

module.exports = router;
