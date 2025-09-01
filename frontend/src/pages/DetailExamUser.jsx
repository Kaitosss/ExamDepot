import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useExamStore from "../store/useExamStore"
import { ArrowDownToLine, ChevronLeft,Link as LucideLink } from "lucide-react"

function DetailExamUser() {

    const { id } = useParams()
    const { getExamUser,exams,loading } = useExamStore()

    useEffect(() => {
        getExamUser(id)
    },[id])

     const getFileIcon = (fileUrl) => {

    if(!fileUrl) return null

    const fileName = fileUrl.split("/").pop()
    const extension = fileName.split(".").pop().toLowerCase()

    switch(extension){
    case "pdf" :
      return "/pdf.png"
    case "doc":
    case "docx":
      return "/doc.png"
    case "xls":
    case "xlsx":
      return "/xls.png"
    }
  }

  return (
    <div className="m-7">
        <div className="w-full">
            <p className="text-4xl font-semibold">รายละเอียดข้อสอบ</p>

            <Link to={"/user/home"} className="btn mt-3"><ChevronLeft size={15}/>Back</Link>

            {loading ? (
              <div className="flex flex-col gap-4 justify-center items-center w-full mt-60">
                <div className="w-24 h-24 rounded-xl bg-gray-600 animate-pulse"></div>
                <div className="w-32 h-4 rounded bg-gray-600 animate-pulse"></div>
                <div className="w-48 h-4 rounded bg-gray-600 animate-pulse"></div>
                <div className="w-56 h-4 rouded bg-gray-600 animate-pulse"></div>
                <div className="w-20 h-4 rouded bg-gray-600 animate-pulse"></div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-3 mt-16">
            <div className="flex gap-3 items-center">
               {!exams?.fileUrl ? null : (
              <div className="group relative flex gap-5 items-center ">
               <a href={!exams?.fileUrl ? null : exams?.downloadUrl} rel="noopener noreferrer" download={exams?.downloadUrl}>
               <img src={getFileIcon(exams?.fileUrl)} alt="" className="size-20 object-cover"/>
              </a>
              
              <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 -top-2 -right-3"><ArrowDownToLine size={20}/></span>

              </div>
             )}

             {exams?.externalUrl && (
              <Link to={exams?.externalUrl}>
                <LucideLink className="mb-7"/>
              </Link>
             )}
            </div>

             <p className="font-semibold">{exams?.title || ""}</p>

             <div className="flex gap-3 font-semibold">
              <p>แผนกวิชา {exams?.department || ""}</p>
              <p>ชั้นปี {exams?.year || ""}</p>
             </div>

             <div className="flex gap-3 font-semibold">
              <p>เทอม {exams?.term || ""}</p>
              <p>วิชา {exams?.subject || ""}</p>
              <p>ระดับชั้น {exams?.level || ""}</p>
             </div>

             <div className="font-semibold">
              <p>ปีการศึกษา {exams?.schoolYear || ""}</p>
             </div>

              {exams?.description && (
                <div className="mt-3 mb-2 flex flex-col items-center gap-1">
                  <p className="font-semibold">คำอธิบาย</p>
                  <p className="font-semibold">{exams?.description || ""}</p>
                </div>
              )}
             

             <div className="mt-8 font-semibold text-center">
              {exams?.uploadedBy?.profilePic && (
                <div>
                 <p className="mb-3">อัปโหลดโดย</p>
                 <img src={exams?.uploadedBy?.profilePic} alt="" className="rounded-full size-20"/>
                </div>
              )}
              <p className="mt-3">{exams?.uploadedBy?.username || ""}</p>
             </div>

            </div>
            )}
        </div>
    </div>
  )
}

export default DetailExamUser