const db = require("../config/db")

exports.createGroupChat = async(req, res) =>{
    const {name} = req.body;
    const [result] = await db.query(
        "INSERT INTO `groups`(name, created_by) VALUES(?,?)",
        [name, req.user.id]
    )
    res.json({groupId: result.insertId})



}
    
exports.addMember = async(req, res)=>{
    const {groupId, userId} = req.body

    await db.query(
        "INSERT INTO group_members(group_id,user_id) VALUES(?,?)",
        [groupId, userId]
    )
    res.json({message: "Member added to group"})    
}
    
