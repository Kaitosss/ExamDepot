import express from "express";
import { updateUser, updatePassword, addUser, getUsers, updateUserById, getUser, deleteUser, getCount, getLatestUser, searchUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import uploadProfile from "../middleware/uploadProfile.js";

const router = express.Router()

router.post("/update",verifyToken,uploadProfile.single("profilePic"),updateUser)
router.post("/change-password",verifyToken,updatePassword)
router.post("/adduser",uploadProfile.single("profilePic"),addUser)
router.get("/users",verifyToken,getUsers)
router.get("/lastestuser",verifyToken,getLatestUser)
router.post("/search",searchUser)
router.post("/update/:id",uploadProfile.single("profilePic"),updateUserById)
router.get("/count",verifyToken,getCount)
router.get("/:id",getUser)
router.post("/:id",deleteUser)

export default router