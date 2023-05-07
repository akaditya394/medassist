const { chat } = require("../controllers/chatController");

const router = require("express").Router();

router.post("/chat", chat);

module.exports = router;
