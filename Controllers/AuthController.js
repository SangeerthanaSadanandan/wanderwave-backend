const users = require('../Models/userSchema')

const jwt = require('jsonwebtoken')

//register logic
exports.register=async(req,res)=>{
    console.log("Inside register function");
    try{
        const {name,email,password} = req.body
        console.log(`${name} ${email} ${password}`);
         const existingUser =  await users.findOne({email})
         let role = 'user';
         if (email === 'admin123@gmail.com' && password === 'admin@123') {
            role = 'admin';
        }
         if(existingUser){
            res.status(402).json("User already exists")
         }
         else{
            const newUser = new users({
                name,email,password,role
            })

            await newUser.save()//data saved in mongodb
            res.status(200).json("User created successfully")
         }
    }
    catch(err){
        res.status(500).json("server error")
    }
   
}


// login logic
exports.login=async(req,res)=>{
    const {email,password} = req.body

    try{
        const user = await users.findOne({email,password})
        if(user){
            const role = user.role;
            const token = jwt.sign({userId:user._id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token})//login success
        }
        else{
            res.status(401).json("Invalid user")
        }
       
    }
    catch(err){
        res.status(500).json("server error" + err.message)
    }
}

//get all user logic
exports.getAllUsers=async(req,res)=>{
    try{
        const allUsers = await users.find()
        res.status(200).json(allUsers)
    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message);    
    }
}

//view a particular user details
exports.getUser = async(req,res)=>{
    const {uid} = req.params
    try{
        const oneUser = await users.findOne({_id:uid})
        res.status(200).json(oneUser)
    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message);    
    }
}



