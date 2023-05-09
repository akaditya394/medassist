const {
  createSession,
  sessionPortal,
  getPrices,
} = require("../controllers/bookingController");

const router = require("express").Router();

router.post("/createSession", createSession);
router.get("/getPrices", getPrices);
router.post("/create", sessionPortal);
// router.post("/createSub", createSub);
// router.get("/subs", getSubs);
// router.post("/doAll", doAll);

module.exports = router;
