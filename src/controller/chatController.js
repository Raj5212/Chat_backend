const db = require("../config/db")

exports.getPrivateChate = async(req, res) =>{
    try{
    const userid = req.user.id;
    const otherUser = req.params.userid
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; 
    const offset = (page - 1) * limit;

    const [message] = await db.query(
        'SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [userid, otherUser, otherUser, userid, limit, offset]
    );

    res.json(message)



    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }



}