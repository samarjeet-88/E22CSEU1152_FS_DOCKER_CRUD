const User=require('../models/userModel')


exports.signUpUser=async(req,res)=>{
    const {name,email,password}=req.body
    try{
        const user=await User.signup(name,email,password)
        res.status(200).json({user})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

exports.loginUser=async(req,res)=>{
    const {name,email,password }=req.body;
    try{
        const user=await User.login(name,email,password);
        res.status(200).json({user});
    } catch(error){
        res.status(400).json({error:error.message});
    }
}