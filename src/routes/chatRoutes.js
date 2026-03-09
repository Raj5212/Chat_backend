const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authMiddleware")
const chat = require("../controller/chatController")


router.post("/register", auth, chat.getPrivateChate)

module.exports = router