const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// const express = require('express');
// const  mongoose = require('mongoose');
const  userModel = require("../models/userModel");
// const router = express.Router();
const secret = 'jogi';

/** SIGNUP API */
exports.signup = async (req,res)=>{
    const {firstName,lastName,email,password} = req.body;
    try {
        const oldUser = await userModel.findOne({email});

        if(oldUser) return res.status(400).json({message:"User Already exists"})

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await userModel.create({email:email,password:hashedPassword,name:`${firstName} ${lastName}`});

        const token = jwt.sign({email:result.email,id:result._id},secret,{expiresIn:"1h"});

        res.status(201).json({result,token});

    } catch (error) {
        res.status(500).json({message:"Something went wrong.."});
        console.log(error.message);
    }
}

/** END SIGNUP */

/** SIGN IN */
exports.signin = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const oldUser = await userModel.findOne({email});
        
        if(!oldUser) return res.status(404).json({message : "User doesn't exist"});
    
        const isPasswordCorrect = await bcrypt.compare(password,oldUser.password);
    
        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid credentials"})

        const token = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn : "1h"})

        res.status(200).json({result:oldUser,token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        
    }
}
/**END SIGN IN */