import "dotenv/config"
import express from "express";
import { connectDB } from "./config/connectDB.js";
import authRoutes from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js" 
import cors from "cors"
import cookieParser from "cookie-parser";
import examRoutes from "./routes/exam.routes.js"
import multer from "multer";

const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth",authRoutes)
app.use("/api/user",userRouter)
app.use("/api/exam",examRoutes)

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("อนุญาตเฉพาะไฟล์")) {
    return res.status(err.statusCode || 400).json({ error: err.message });
  }

  next(err);
});

const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log("Server Running On PORT : " + PORT)
    connectDB(process.env.MONGODB_URL)
})

