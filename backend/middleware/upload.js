import multer from "multer";
import path from "path"
import fs from "fs"

const tempDir = path.join(process.cwd(),"temp_uploads")

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


const upload = multer({
    storage,
    limits:{fileSize:10 * 1024 * 1024},
    fileFilter:(req,file,cb) => {
        const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('อนุญาตเฉพาะไฟล์ PDF, Word (.doc, .docx) หรือ Excel (.xls, .xlsx) เท่านั้น'),false)
    }
    }
})

export default upload