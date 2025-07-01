import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import {getReceiverSocketId ,io} from "../lib/socket.js";

export const getUsersForSidebar = async(req,res)=>{
    try{
        const userId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:userId}}).select("-password")
        res.status(200).json({
            success: true,
            filteredUsers
        });

        
    } catch(e){
        console.log("Error in Get Users For Sidebar Controller",e.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getMessages = async(req,res)=>{
    try{
        const {id:userToChatId}= req.params 
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        }).sort({createdAt:1})  
        res.status(200).json({
            success: true,
            messages
        })

    } catch(e){
        console.log("Error in Get Messages Controller",e.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const sendMessage = async(req,res) => {
    try{
        const {text,image}= req.body;
        const {id:receiverId}= req.params 
        const senderId = req.user._id;
        
        let imageUrl ;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage =  new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save()
        
        //Real time message
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json({
            success: true,
            newMessage
        })
        

    } catch(e){
        console.log("Error in Send Message Controller",e)
        res.status(500).json({message: "Internal Server Error"})
    }
}