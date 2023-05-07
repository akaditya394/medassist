const { register, login, protect } = require("../controllers/doctorController");
const {
  getAllUnverifiedPrescriptions,
} = require("../controllers/doctorController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/unverifiedPrescriptions", protect, getAllUnverifiedPrescriptions);

module.exports = router;
