import multer from "multer";
import fs from "fs"
import path from "path";


const tempDir = path.join(process.cwd(),"temp_profile")


if(!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir,{recursive:true})
}


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,tempDir)
    },
    filename:(req,file,cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null,file.fieldname + "-" + uniqueSuffix + ext)
    }
})


const uploadProfile = multer({storage})

export default uploadProfile