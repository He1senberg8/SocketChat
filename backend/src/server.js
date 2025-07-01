import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import connectDb from './lib/connectDb.js';
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/messageRoutes.js"
import cors from "cors"
import {app,server} from "./lib/socket.js"


import path from "path"

const __dirname = path.resolve()

dotenv.config();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

const PORT = process.env.PORT || 5001;

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

server.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
})