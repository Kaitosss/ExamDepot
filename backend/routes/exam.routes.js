import express from "express";
import { uploadExam, getPagination, getExam, updateExam, deleteExam, searchExams, getCount, getLatestexam, getExams, getExamUser, searchExamUser } from "../controllers/exam.controller.js";
const router = express.Router()
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.post("/upload",verifyToken,upload.single("examFile"),uploadExam)
router.get("/page",getPagination)
router.get("/exams",getExams)
router.get("/count",getCount)
router.post("/search/user",searchExamUser)
router.get("/examuser/:id",getExamUser)
router.get("/lastestexam",getLatestexam)
router.get("/:id",getExam)
router.post("/update/:id",upload.single("examFile"),updateExam)
router.post("/search",searchExams)
router.post("/delete",deleteExam)

export default router