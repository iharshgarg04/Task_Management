const User = require('../models/user');


exports.loginController = async(req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"All fields required",
            })
        }
        const response = await User.findOne({username:username});
        if(response && response.password === password){
            return res.status(200).json({
                success:true,
                message:"Login successfull",
                user:response,
            })
        }    
    }catch(error){
        console.error(error);
        console.error("Error while logging in");
    }
}

exports.signUpController = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields required",
            })
        }
        const alreadyExist = await User.findOne({email});
        if(alreadyExist) return res.status(400).json({success:false,message:"user is already registered"});
        const response = await User.create({username:username,email:email,password:password});
        if(response){
            return res.status(200).json({
                success:true,
                message:"User is created successfully",
            })
        }
    }catch(error){
        console.error(error);
        console.log("Error while singing up user");
    }
}