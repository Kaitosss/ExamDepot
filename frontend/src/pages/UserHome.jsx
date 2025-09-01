import { useEffect, useState } from "react"
import useExamStore from "../store/useExamStore"
import { Link } from "react-router-dom"
import { LoaderCircle, NotebookText,Search  } from "lucide-react"

function UserHome() {

  const { getExams,examData,searchExamUser,isSearchExam } = useExamStore()

  const defaultData = {
    title:"",
    department:"",
    year:1,
    subject:"",
    level:"ปวช",
    schoolYear:""
  }

  const [searchdata,setSearchData] = useState(defaultData)

  const ChangeData = (e) => {
    const {name,value} = e.target
    setSearchData((prev) => ({...prev,[name]:name == "year" ? Number(value) : value}))
  }

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

  const handleSearchExam = () => {
    searchExamUser(searchdata)
    setSearchData(defaultData)
    document.getElementById("my_modal_3").close()
  }

  return (
    <div className="m-7">
      <div className="w-full">
        <p className="text-4xl font-semibold flex items-center gap-3">ข้อสอบ <NotebookText size={30}/></p>
        <p className="text-gray-400/60 font-bold mt-2 text-sm">ข้อสอบทั้งหมด</p> 

      <button className="btn mt-3" onClick={()=>document.getElementById('my_modal_3').showModal()}><Search size={20} />ค้นหาข้อสอบ</button>


      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          
          <div className="grid grid-cols-2">
             <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ชื่อข้อสอบ</span>
                </label>
                   
                <input 
                name="title"
                onChange={ChangeData}
                className="input input-bordered w-[200px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>

            <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">แผนกวิชา</span>
                </label>
                   
                <input 
                name="department"
                onChange={ChangeData}
                className="input input-bordered w-[200px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชั้นปี</span>
              </label>
            <select onChange={ChangeData} name="year" className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>ปี 1</option>
            <option value={2}>ปี 2</option>
            <option value={3}>ปี 3</option>
          </select>
          </div>

           <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">แผนกวิชา</span>
                </label>
                   
                <input 
                name="subject"
                onChange={ChangeData}
                className="input input-bordered w-[200px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ระดับชั้น</span>
              </label>
            <select onChange={ChangeData} name="level" className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={"ปวช"}>ปวช</option>
            <option value={"ปวส"}>ปวส</option>
          </select>
          </div>

           <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ปีการศึกษา</span>
                </label>
                   
                <input 
                name="schoolYear"
                onChange={ChangeData}
                className="input input-bordered w-[200px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>


          </div>

           <button className="btn btn-primary w-[440px] mt-12 hover:drop-shadow-base-content
             duration-200 transition-all ease-in" onClick={handleSearchExam}>
               {isSearchExam ? <LoaderCircle className="size-5 animate-spin"/> : "ค้นหาข้อสอบ"}
         </button>
        </div>
      </dialog>


       <div className="overflow-y-auto w-[1200px] h-[600px] ml-20">
         <div className="grid grid-cols-3  mt-8">
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
    </div>
  )
}

export default UserHome