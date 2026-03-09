const db = require('../config/db');

let onlineUsers = []

module.exports = (io) => {
    io.on('connection', (socket) => {
    socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    db.query("UPDATE users SET is_online = 1 WHERE id = ?", [userId]);
    io.emit('userStatu', { userId, isOnline: true });
    })
    socket.on('privateMessage', async(data) =>{
        const { senderId, receiverId, message } = data;
        const  [result] = await db.query(
            "INSERT INTO message(sender_id,receiver_id,message) VALUES(?,?,?)",
            [senderId, receiverId, message]
        )
        if(onlineUsers[receiverId]){
            io.to(onlineUsers[receiverId]).emit('newMessage', {
                id : result.insertId,
                senderId,
                message
             })
        }
        socket.on("disconnect",() =>{
            const user = Object.keys(onlineUsers    ).find(key => onlineUsers[key] === socket.id);

            if(user){
                delete onlineUsers[user];
            }
            db.query("UPDATE users SET is_online = 0 WHERE id = ?", [user]);
            io.emit('userStatue', { userId: user, status : "ofline"})
        })
    })
    })
}