import { useEffect, useState } from "react"
import useExamStore from "../store/useExamStore"
import { Link } from "react-router-dom"

function TableExam() {

  const {getPagination,examData,totalPage,deleteExam,isSearching} = useExamStore()
  const [page,setPage] = useState(1)
  const limit = 7
  const [selectedExamId,setSelectedExamId] = useState(null)

  useEffect(() => {
     if (!isSearching) {
    getPagination(page, limit);
    }
  },[page,limit,isSearching])

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

    const handleNext = () => {
    if (page < totalPage) setPage(prev => prev + 1);
    };

    const handlePrev = () => {
      if(page > 1) setPage(page - 1)
    }

    const handleDeleteExam = async () => {
      if(selectedExamId){
        await deleteExam(selectedExamId)
        setSelectedExamId(null)
        document.getElementById("my_modal_1").close()
      }
    }

  return (
    <div className="mt-5 m-3">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">

        
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

  <table className="table">
    {/* head */}
    <thead>
      <tr className="text-center">
        <th></th>
        <th>ชื่อข้อสอบ</th>
        <th>ชื่อวิชา</th>
        <th>เทอม</th>
        <th>ชั้นปี</th>
        <th>ระดับชั้น</th>
        <th>ปีการศึกษา</th>
        <th>แผนกวิชา</th>
        <th>ลิ้งข้อสอบ</th>
        <th>คำอธิบาย</th>
        <th>ไฟล์ข้อสอบ</th>
        <th>อัปโหลดโดย</th>
      </tr>
    </thead>
    <tbody>
      {/* row  */}
      {examData?.length > 0 ? (
        examData?.map((data,index) => (
        <tr className="text-center" key={index}>
          <th>{(page - 1) * limit + index + 1}</th>
          <th>{data.title}</th>
          <th>{data.subject}</th>
          <th>{data.term}</th>
          <th>{data.year}</th>
          <th>{data.level}</th>
          <th>{data.schoolYear}</th>
          <th>{data.department}</th>
          <th>{!data.externalUrl ? "-" : (
            <a href={data.externalUrl}>ลิ้งข้อสอบ</a>
          )}</th>
          <th>{
          data.description ? data.description.length > 20 ? data.description.slice(0,120) + "..." : data.description : "-"
          }</th>
          <th className="flex justify-center items-center mt-4">
            {!data.fileUrl ? "-" : (
              <a href={!data.fileUrl ? null : data.downloadUrl} rel="noopener noreferrer" download={data.downloadUrl}>
               <img src={getFileIcon(data.fileUrl)} alt="" className="size-14 object-cover"/>
            </a>
            )}
          </th>
          <th>
            <div className="flex-col flex items-center justify-center">
              <img src={data.uploadedBy.profilePic} alt="" className="w-8 h-8 rounded-3xl"/>
              {data.uploadedBy.username}
            </div>
          </th>

          <th>
            <div className="flex gap-4">
              <Link to={`/edit/${data._id}`} className="btn btn-primary">แก้ไขข้อสอบ</Link>
              <button className="btn btn-error text-white" 
                onClick={()=>{
                document.getElementById('my_modal_1').showModal(),
                setSelectedExamId(data._id)}}>
                ลบข้อสอบ
              </button>
            </div>
          </th>
        </tr>
      ))
      ) : (
        <tr>
        <td colSpan="10" className="text-center">ไม่มีข้อมูลข้อสอบ</td>
      </tr>
      )}
    </tbody>
  </table>
 </div>
     <div className="mt-2 flex justify-center">
    <div className="join">
      <button className="join-item btn" onClick={handlePrev}>«</button>
      <button className="join-item btn">{page} / {totalPage || totalPage == 0 ? 1 : totalPage}</button>
      <button className="join-item btn" onClick={handleNext}>»</button>
    </div>
</div>


    </div>
  )
}

export default TableExam