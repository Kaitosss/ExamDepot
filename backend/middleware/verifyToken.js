import jwt from "jsonwebtoken"
import Users from "../models/users.model.js"

export const verifyToken = async (req,res,next) => {
    try {
       const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message:"ไม่ได้ให้โทเค็น"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message:"โทเค็นไม่ถูกต้อง"})
        }

        const user = await Users.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({message:"ไม่พบผู้ใช้งาน"})
        }

        req.user = user

        next()
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}
