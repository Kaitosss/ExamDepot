import { getDownloadUrl } from "./getDownloadUrl.js"

export const examsWithDownloadUrl = (exams) => {
    const examsWithDownloadUrl = exams?.map(exam => {
            if(exam.fileUrl && exam.originalFileName && exam.publicId){
                return {...exam.toObject(),downloadUrl:getDownloadUrl(exam.publicId,exam.originalFileName)}
            }
            return exam
    })
    
    return examsWithDownloadUrl
}