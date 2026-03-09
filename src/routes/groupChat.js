const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authMiddleware")
const group = require("../controller/groupChatController")


router.post("/create", auth, group.createGroupChat)
router.post("/add-member", auth, group.addMember)

module.exports = router