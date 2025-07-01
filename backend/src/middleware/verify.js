import jwt from "jsonwebtoken" 
import User from "../models/user.model.js"

const verify= async(req,res,next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({
                message:"Unauthorized- No Token Provided"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({
                message:"Unauthorized - Invalid Token"
            })
        }

        const user = await User.findById(decoded.id).select("-password")

        if(!user) {
            return res.status(404).json({
                message:"User Not Found "
            })
        }

        req.user = user 
        console.log("Verified !!")
        next()
    } catch (error) {
        console.log("Error in Protect Route",error)
        return res.status(500).json({
            message:"Internal Server Error "
        })
    }
}

export default verify