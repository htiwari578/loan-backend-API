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
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}

// login /

export const login = async (req,res) => {
    try{
        const {email , password} = req.body;
        if(!email || !password) {
            return res.status(400).json ({
                message:"Something is Missing",
                success:false
            });
        };
        // user details in database
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"incorrect email or password",
                success:"false"
            })

        };
        //  check user password matched or not 
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                message:"wrong password",
                success:false
            });
        };
        const tokenData = {
            userId:user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role

        }
        return res.status(200).cookie("token", token,{maxAge:1*24*60*60*1000 ,httpsOnly:true, sameSite:'strict'}).json({
            message:`welcome back ${user.name}`,
            success:true
        })
    }catch (error) {
        console.error( error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
           
        }
    }

// logout 

export const logout = async (req,res) =>{
    try {
        return res.status(200).cookie("token" , "" ,{maxAge:0}).json({
            message:"logout succesful",
            success:true
        });
    } catch (error) {
        console.log(error);
        
    }
}