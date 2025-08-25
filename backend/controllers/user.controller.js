import bcryptjs from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"
import User from "../models/users.model.js"
import fs from "fs"

export const updateUser = async (req,res) => {
    try {
        const {username} = req.body
        const userId = req.user._id
        const existingUser = await User.findById(userId)
        let newProfilePicUrl = existingUser.profilePic
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:"profilePictures",
                unique_filename:false,
                use_filename:true,
                overwrite:true
            })

            newProfilePicUrl = result.secure_url

            fs.unlinkSync(req.file.path)
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {username,profilePic:newProfilePicUrl},
            {new:true}
        )
        await updateUser.save()

        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}

export const updatePassword = async (req,res) => {
    try {
        const {originalpassword,newPassword,Confirmpassword} = req.body
        const userId = req.user._id

        
        const user = await User.findById(userId)
        
        if(!user){
            return res.status(404).json({error:"ไม่พบผู้ใช้งาน"})
        }
        
        const checkPassword = await bcryptjs.compare(originalpassword,user.password)
        
        if(!checkPassword){
            return res.status(400).json({error:"รหัสผ่านเดิมไม่ถูกต้อง"})
        }
        
        if(newPassword !== Confirmpassword){
            return res.status(400).json({error:"รหัสผ่านใหม่ไม่ตรงกัน"})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword,salt)
        user.password = hashedPassword
        await user.save()
        
        res.status(200).json({message:"เปลี่ยนรหัสผ่านสำเร็จ"})
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}

export const addUser = async (req,res) => {
    try {
        const {username,password,department,fullname,year,level,role} = req.body
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"มีชื่อผู้ใช้นี้แล้ว"})
        }

        let ProfilePicUrl = null


        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:"profilePictures",
                use_filename:true
            })

            ProfilePicUrl = result.secure_url

            fs.unlinkSync(req.file.path)
        }

        const newUser = await User.create({
            username,
            password:hashedPassword,
            role,
            department,
            fullname,
            year,
            level,
            profilePic:ProfilePicUrl
        })
     await newUser.save()

     res.status(200).json({message:"เพิ่มผู้ใช้เรียบร้อยเเล้ว"})

    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}


export const getUsers = async (req,res) => {
    try {
       const loggedInUserId = req.user._id
       
       const users = await User.find({_id:{$ne:loggedInUserId}}).select("-password")

       res.status(200).json(users)
    } catch (error) {
       res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"}) 
    }
}


export const updateUserById = async (req,res) => {
    try {
        const { id } = req.params
        const {
            profilePic,
            username,
            department,
            level,
            year,
            fullname
        } = req.body

        let newProfilePicUrl = profilePic
        const existingUser = req.file

        if(existingUser){
            const result = await cloudinary.uploader.upload(existingUser.path,{
                folder:"profilePictures",
                use_filename:true,
                unique_filename:false,
                overwrite:true
            })

            newProfilePicUrl = result.secure_url

            fs.unlinkSync(existingUser.path)
        }

        await User.findByIdAndUpdate(
            id,
            {
                profilePic:newProfilePicUrl,
                username,
                department,
                level,
                year,
                fullname
            }
        )

        res.status(200).json({message:"อัปเดตผู้ใช้งานสำเร็จ"})

    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"}) 
    }
}

export const getUser = async (req,res) => {
    try {
        const { id } = req.params 

        const user = await User.findById(id).select("-password")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"}) 
    }
}

export const deleteUser = async (req,res) => {
    try {
        const { id } = req.params

        await User.findByIdAndDelete(id)

        res.status(200).json({message:"ลบผู้ใช้งานเสร็จสิ้น"})
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"}) 
    }
}


export const getCount = async (req,res) => {
    try {

        const userId = req.user._id
        const count = await User.countDocuments({_id:{$ne:userId}})

        res.json({count})
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"}) 
    }
}

export const getLatestUser = async (req,res) => {
    try {
        const userId = req.user._id

        const users = await User.find({_id:{$ne:userId}}).sort({createdAt: -1 }).limit(5).select("-password")

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"}) 
    }
}