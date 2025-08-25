import { Link, useNavigate } from "react-router-dom"
import useExamStore from "../store/useExamStore"
import { ChevronLeft } from 'lucide-react';
import { useState } from "react";

function SearchExam() {

  const {examSearchData,deleteExam,setBackPage} = useExamStore()
  const navigate = useNavigate()
  const [selectedExamId,setSelectedExamId] = useState(null)

   const getFileIcon = (fileUrl) => {

    if(!fileUrl) return null

    const fileName = fileUrl.split("/").pop()
    const extension = fileName.split(".").pop().toLowerCase()

    switch(extension){
    case "pdf" :
      return "/pdf.png"
    case "doc":
    case "docx":
      return "/word.png"
    case "xls":
    case "xlsx":
      return "/excel.png"
    }
  }

  const handleDeleteExam = async () => {
      if(selectedExamId){
        await deleteExam(selectedExamId)
        setSelectedExamId(null)
        document.getElementById("my_modal_1").close()
      }
    }


  return (
    <div className="m-12">
      <button className="btn" onClick={() => {navigate("/manageexam"),setBackPage()}}><ChevronLeft size={15}/>Back</button>

      <dialog id="my_modal_1" className="modal">
    <div className="modal-box">
    <h3 className="font-bold text-lg">แจ้งเตือน!</h3>
    <p className="py-4">คุณต้องการลบข้อสอบนี้หรือไม่</p>
    <div className="modal-action">
      <form method="dialog" className="flex gap-4">
        <button className="btn btn-soft">ยกเลิก</button>
        <button className="btn btn-error text-white" onClick={handleDeleteExam}>ยืนยัน</button>
      </form>
    </div>
  </div>
  </dialog>

      <div className="mt-8">
  <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>ชื่อข้อสอบ</th>
        <th>ชื่อวิชา</th>
        <th>เทอม</th>
        <th>ชั้นปี</th>
        <th>ระดับชั้น</th>
        <th>ปีการศึกษา</th>
        <th>แผนกวิชา</th>
        <th>ลิ้งข้อสอบ</th>
        <th>ไฟล์ข้อสอบ</th>
        <th>อัปโหลดโดย</th>
      </tr>
    </thead>
    <tbody>
      {/* row */}
       {examSearchData?.data.length > 0 ? (
        examSearchData?.data.map((exam,index) => (
        <tr key={index} className="text-center">
          <th>{index + 1 || ""}</th>
          <th>{exam?.title || ""}</th>
          <th>{exam?.subject || ""}</th>
          <th>{exam?.term || ""}</th>
          <th>{exam?.year || ""}</th>
          <th>{exam?.level || ""}</th>
          <th>{exam?.schoolYear || ""}</th>
          <th>{exam?.department || ""}</th>
          <th>{exam?.externalUrl || "-"}</th>
          <th>
            {!exam.fileUrl ? "-" : (
              <a href={!exam.fileUrl ? null : exam.downloadUrl} rel="noopener noreferrer" download={exam.downloadUrl}>
               <img src={getFileIcon(exam.fileUrl)} alt="" className="size-14 object-cover"/>
            </a>
            )}
          </th>
          <th>
            <div className="flex-col flex items-center justify-center">
              <img src={exam.uploadedBy.profilePic} alt="" className="w-8 h-8 rounded-3xl"/>
              {exam.uploadedBy.username}
            </div>
          </th>

          <th>
            <div className="flex gap-4">
              <Link to={`/edit/${exam._id}`} className="btn btn-primary">แก้ไขข้อสอบ</Link>
              <button className="btn btn-error text-white" 
                onClick={()=>{
                document.getElementById('my_modal_1').showModal(),
                setSelectedExamId(exam._id)}}>
                ลบข้อสอบ
              </button>
            </div>
          </th>
        </tr>
          ))
       ) : (
        <tr>
        <td colSpan="10" className="text-center">ไม่พบข้อมูล</td>
      </tr>
       )}
    </tbody>
  </table>
</div>
      </div>
    </div>
  )
}

export default SearchExam
