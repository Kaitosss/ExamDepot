import Users from "../models/users.model.js"
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const login = async (req,res) => {
    try {
        const {username,password} = req.body

       const user = await Users.findOne({username})

       if(!user){
         return res.status(404).json({error:"ไม่พบผู้ใช้งาน"})
       }

       const isMath = await bcryptjs.compare(password,user.password)

       if(!isMath){
        return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง"})
       }

       generateToken(user._id,res)

       res.status(200).json({
        _id:user._id,
        username:user.username,
        role:user.role
       })
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"ออกจากระบบเรียบร้อยแล้ว"})
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}