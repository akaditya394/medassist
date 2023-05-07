const router = require("express").Router();
const {
  addPrescriptions,
  getAllPrescriptions,
} = require("../controllers/prescriptionController");
const { protect } = require("../controllers/userController");

router.get("/allPrescriptions", protect, getAllPrescriptions);
router.post("/uploadPrescription", protect, addPrescriptions);

module.exports = router;
