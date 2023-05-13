const router = require("express").Router();
const {
  addPrescriptions,
  getAllPrescriptions,
  verify,
  addDrugs,
  getSideEffects,
  addAlternativeAndSuggestion,
} = require("../controllers/prescriptionController");
const { protect } = require("../controllers/userController");

router.get("/allPrescriptions", protect, getAllPrescriptions);
router.post("/uploadPrescription", protect, addPrescriptions, addDrugs);
router.post("/getSide", getSideEffects);
router.post(
  "/addAlternativeAndSuggestion",
  protect,
  addAlternativeAndSuggestion
);
// router.patch("/verifyPrescription", protect, verify);

module.exports = router;
