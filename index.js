const express = require("express");
const http = require("http")
const socketio = require('socket.io');
const cors = require('cors')
require("dotenv").config()



const app = express()
app.use(express.json());
app.use(cors())


const authRoutes = require("./src/routes/authRoutes")
const chatRoutes = require("./src/routes/chatRoutes")
const groupchatRoutes = require("./src/routes/groupChat")

app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/groupchat", groupchatRoutes)

const chatSocket = require("./src/socket/chatSocket")
const upload = require("./src/utils/fileUpload")

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

app.use("/uploads", express.static("uploads"))

const server = http.createServer(app)
const io = socketio(server, {cors: {origin: "*"}})
chatSocket(io)
server.listen(4000,()=>{
    console.log("Server is running on port 4000")
})