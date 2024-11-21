import User from "../model/userModel.js";

import bcrypt from 'bcryptjs';

import jwt from "jsonwebtoken";


// register // or signup 

export const register = async (req,res) => {
    try {
        const {name , email , password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message:"Something is Missing",
                required:false
            })
        }
        // check user exist or not , we are finding through email
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"email alraedy exist",
                success:false
            });
        }
        const hashedPasswrod = await bcrypt.hash(password ,10);
        // now registering new user
        await User.create ({
            name,
            email,
            password:hashedPasswrod,
            role
        });
        return res.status(201).json({
            message:"Account created succesfully",
            required:true
        })
    } catch (error) {
        console.log(error);
    }
}