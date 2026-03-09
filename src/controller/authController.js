const bycrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');


exports.login = async(request,response)=>{
    try{
   const {email , password} = request.body
   const [user] = await db.query("SELECT * FROM users WHERE email = ?",[email])

   if(user.length === 0){
    return response.status(404).json({message:"User not found"})
   }

   const valid = await bycrypt.compare(password,user[0].password)
   if(!valid){
    return response.status(401).json({message:"Invalid credentials"})
   }

   const token = jwt.sign({id:user[0].id, email:user[0].email}, process.env.JWT_SECRET, {expiresIn:'1h'})

   response.status(200).json({message:"Login successful", token})
    }catch(error){
        console.log(error)
    }
}


exports.register = async(request,response)=>{
    try{
   const {username, email , password} = request.body

   const hashed = await bycrypt.hash(password,10)

   await db.query("INSERT INTO users(username, email, password) VALUES(?,?,?)",[username,email,hashed]);

   response.status(201).json({message:"User created successfully"})

    }catch(error){
        console.log(error)
    }
}