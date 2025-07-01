import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req,res) => {
    const {email,password,fullname} = req.body;
    console.log(email,password,fullname)
    try{
        //validation
        if(!email || !password || !fullname){
            return res.status(400).json({message: "All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"})
        }
        //check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        //create user
        const newUser = new User({email,password:hashedPassword,fullname})
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                
            })
        }
        else{
            return res.status(400).json({message: "Invalid user data"})
        }
    } catch(e){
        console.log("Error in Signup Controller",e)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const login =async (req,res) => {
    const {email,password} = req.body;
    try{
        //validation
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"})
        }
        //compare password
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"})
        }
        generateToken(user._id,res)
        res.status(200).json({
            success: true,  
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            profilePic: user.profilePic
        })

    } catch(e){
        console.log("Error in Login Controller",e.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const logout = (req,res) => {
    res.cookie("jwt","",{
        httpOnly: true,
        expires: new Date(0),
        maxAge:0
    })
    res.status(200).json({message: "Logged out successfully"})
}

export const updateProfile = async(req,res) => {
    try{
        const {profilePic} = req.body;
        const user = req.user;
        const id = user._id;
        let updatedUser;
        
        if(profilePic){
            const result = await cloudinary.uploader.upload(profilePic,{
                folder:"profilepics",
                width: 250,
                height: 250,
                crop: "fill"
            })
            updatedUser = await User.findByIdAndUpdate(id, {profilePic: result.secure_url}, {new: true})
        } else {
            return res.status(400).json({message: "Profile pic is required"})
        }
        
        return res.status(200).json({
            user: updatedUser
        })
    } catch(e){
        console.log("Error in Update Profile Controller",e.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const check = (req,res) => {
    try {
        const user = req.user;
        if(user){
            return res.status(200).json({
                success: true,
                user
            })
        }
    } catch (error) {
        console.log("Error in Check Controller",error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}