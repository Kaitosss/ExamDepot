import { useEffect } from "react"
import useExamStore from "../store/useExamStore"
import { Link } from "react-router-dom"

function UserHome() {

  const { getExams,examData } = useExamStore()

  useEffect(() => {
    getExams()
  },[getExams])

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
      <div className="w-[700px]">
        <p className="text-4xl font-semibold">ข้อสอบ</p>
        <p className="text-gray-400/60 font-bold mt-2 text-sm">ข้อสอบทั้งหมด</p> 


        <div className="grid grid-cols-3 gap-x-[400px] mt-8">
          {examData?.map((exam) => (
        <div key={exam?._id} className="card bg-base-100 w-96">
            <figure className="px-10 pt-10">
              <img
                src={getFileIcon(exam?.originalFileName) || "/notes.png"}
                alt=""
                className="w-20 h-20 object-cover" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{exam?.title}</h2>

              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <p className="font-semibold">วิชา {exam?.subject}</p>
                  <p className="font-semibold">ชั้นปีที่ {exam?.year}</p>
                </div>
                <p className="font-semibold">แผนก {exam?.department}</p>
              </div>

              <div className="card-actions mt-3">
                <Link to={`/detailexam/${exam?._id}`} className="btn btn-primary">รายละเอียด</Link>
              </div>
            </div>
          </div>
        ))}
        </div>

      </div>
    </div>
  )
}

export default UserHome