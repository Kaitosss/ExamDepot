import cloudinary from "../lib/cloudinary.js"
import fs from "fs"
import Exams from "../models/exams.model.js"
import { examsWithDownloadUrl } from "../utils/examsDownloadUrl.js"
import { examWithDownloadUrl } from "../utils/examDownloadUrl.js"

export const uploadExam = async (req,res) => {
    try {
        const {
            examName,
            Coursename,
            term,
            year,
            level,
            schoolYear,
            department,
            examLink,
            description
        } = req.body

        const examFile = req.file
        const userId = req.user._id

        if(!examFile && !examLink){
            return res.status(400).json({error:"กรุณาระบุลิงก์หรือไฟล์ข้อสอบ"})
        }

        let fileUrl = null
        let originalFileName = null
        let publicId = null

        if(examFile){
            const result = await cloudinary.uploader.upload(examFile.path,{
                folder:"exam_files",
                resource_type:"raw",
                use_filename:true,
                unique_filename:true
            })

            fileUrl = result.secure_url
            originalFileName = examFile.originalname
            publicId = result.public_id


            fs.unlink(examFile.path,(err) => {
                if(err) console.error(err)
            })
        }

        const exam = await Exams.create({
            title:examName,
            department,
            level,
            schoolYear,
            year,
            subject:Coursename,
            term,
            fileUrl,
            originalFileName,
            externalUrl:examLink,
            publicId,
            description,
            uploadedBy:userId,
        })

        res.status(200).json(exam)
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}


export const getPagination = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 7
        const skip = (page - 1) * limit

        const total = await Exams.countDocuments()
        const exams = await Exams.find().skip(skip).limit(limit).populate("uploadedBy","username profilePic")

        const totalPages = Math.ceil(total / limit)

        const examsUrl =  examsWithDownloadUrl(exams)

        res.status(200).json({
            exams:examsUrl,
            page,
            totalPages
        })
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}

export const getExam = async (req,res) => {
    try {
        const {id} = req.params

        const exam = await Exams.findById(id)
        res.status(200).json(exam)
    } catch (error) {
        res.status(500).json({error:"ข้อผิดพลาดเซิร์ฟเวอร์ภายใน"})
    }
}

export const updateExam = async (req, res) => {
    try {
        const {
            examName,
            Coursename,
            term,
            year,
            level,
            schoolYear,
            department,
            examLink,
            publicId,
            examFile,
            description
        } = req.body;

        const { id } = req.params;
        const examfile = req.file;

        let updateData = {
            title: examName,
            department,
            level,
            schoolYear,
            year,
            subject: Coursename,
            term,
            externalUrl: examLink,
            description,
            originalFileName:examfile?.originalname
        };

        if (examfile) {
            const result = await cloudinary.uploader.upload(examfile.path, {
                folder: "exam_files",
                resource_type: "raw",
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                invalidate:true,
                public_id:publicId
            });

            updateData.fileUrl = result.secure_url;
            updateData.publicId = result.public_id;


            if (examfile.path) fs.unlinkSync(examfile.path);
        }
        else{
            if(publicId && examFile){
                updateData.fileUrl = examFile
                updateData.publicId = publicId
            }

            if (examFile && examFile.path) {
                fs.unlinkSync(examFile.path);
            }
        }

        
        await Exams.findByIdAndUpdate(id, updateData);
        
        res.status(200).json({ message: "อัปเดตข้อสอบเรียบร้อยแล้ว" });
    } catch (error) {
        res.status(500).json({ error: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
};


export const deleteExam = async (req,res) => {
    try {
        const { id } = req.body

        if(!id) return res.status(400).json({error:"ไม่พบข้อสอบนี้"})

        await Exams.findByIdAndDelete(id)

        res.status(200).json({message:"ลบข้อสอบเรียบร้อยแล้ว"})
    } catch (error) {
        res.status(500).json({ error: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
}

export const searchExams = async (req,res) => {
    try {
        const {
            examName,
            Coursename,
            term,
            year,
            level,
            schoolYear,
            department,
        } = req.body;

        const filters = {};
        if (examName) filters.title = { $regex: examName, $options: "i" };
        if (Coursename) filters.subject = { $regex: Coursename, $options: "i" };
        if (term) filters.term = Number(term);
        if (year) filters.year = Number(year);
        if (level) filters.level = level.trim();
        if (schoolYear) filters.schoolYear = schoolYear.trim();
        if (department) filters.department = department.trim();

        const exams = await Exams.find(filters).populate("uploadedBy", "username profilePic");

       
        const total = await Exams.countDocuments(filters);

        const examsUrl =  examsWithDownloadUrl(exams)

        res.json({
            data:examsUrl,
            total
        });

    } catch (error) {
        res.status(500).json({ error: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
};


export const getCount = async (req,res) => {
    try {
        const count = await Exams.countDocuments()

        res.json({count})
    } catch (error) {
        res.status(500).json({ error: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
}

export const getLatestexam = async (req,res) => {
    try {
        const lastestexam = await Exams.find().sort({uploadedAt: -1 }).limit(5)

        res.status(200).json(lastestexam)
    } catch (error) {
        res.status(500).json({ error: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
}


export const getExams = async (req,res) => {
    try {
        const exams = await Exams.find()

        res.status(200).json(exams)
    } catch (error) {
        res.status(500).json({ error: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
}

export const getExamUser = async (req,res) => {
    try {
        const {id} = req.params
        const exam = await Exams.findById(id).populate("uploadedBy","username profilePic")

        const examsDownloadUrl = examWithDownloadUrl(exam)

        res.status(200).json(examsDownloadUrl)
    } catch (error) {
        res.status(500).json({ error: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
}


export const searchExamUser = async (req,res) => {
    try {
        const {
            title,
            department,
            year,
            subject,
            level,
            schoolYear
        } = req.body


         const orConditions = [] 

         if(title){
            orConditions.push({title:title.trim()})
         }

         if(department){
            orConditions.push({department:department.trim()})
         }

         if(year){
            orConditions.push({year:Number(year)})
         }

         if(subject){
            orConditions.push({subject:{$regex:subject,$options:"i"}})
         }

         if(level){
            orConditions.push({level:level.trim()})
         }

         if(schoolYear){
            orConditions.push({schoolYear:schoolYear.trim()})
         }

         const exams = orConditions.length > 0 
         ? await Exams.find({$or:orConditions})
         : await Exams.find()

         res.status(200).json(exams)
    } catch (error) {
        res.status(500).json({ error: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
}