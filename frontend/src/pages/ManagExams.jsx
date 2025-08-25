import { LoaderCircle, Plus } from "lucide-react"
import TableExam from "../components/TableExam"
import { useState } from "react"
import toast from "react-hot-toast"
import useExamStore from "../store/useExamStore"
import { z } from "zod"
import SearchExam from "../components/SearchExam"

function ManagExams() {

  const defaultForm = {
    examName:"",
    Coursename:"",
    term: 1,
    year: 1,
    level: "ปวช",
    schoolYear:"",
    department:"",
    examLink:"",
    examFile:"",
    description:""
  }

  const [data,setData] = useState(defaultForm)
  const {isAddingExams,uploadExam} = useExamStore() 
  

  const ChangeData = (e) => {
    const {name,value} = e.target
    const nameFields = ["term","year"]

    setData((prev) => ({...prev,[name]:nameFields.includes(name) ? Number(value) : value}))
  }

  const ChangeFile = (e) => {
    const file = e.target.files[0]
    if(!file) return

    setData(prev => ({...prev,examFile:file}))
  }


  const examSchema = z.object({
    examName:z.string().min(1,"กรุณากรอกชื่อข้อสอบ"),
    Coursename:z.string().min(1,"กรุณากรอกชื่อวิชา"),
    term:z.number().min(1,"กรุณากรอกเทอม"),
    year:z.number().min(1,"กรุณากรอกชั้นปี"),
    level:z.string().min(1,"กรุณากรอกระดับชั้น"),
    schoolYear:z.string().min(1,"กรุณากรอกปีการศึกษา"),
    department:z.string().min(1,"กรุณากรอกชื่อแผนก"),
    examLink:z.string().optional(),
    examFile:z.any().optional(),
  })

  
  const validate = () => {
    const result = examSchema.safeParse(data)

    if(!result.success){
      if(!data.examName || !data.Coursename || !data.schoolYear || !data.department) {
        toast.error(result.error.issues[0].message)
        return false
      }
    }

    if(!data.examLink && !data.examFile){
      toast.error("กรุณาระบุลิ้งข้อสอบหรือไฟล์ข้อสอบ")
      return false
    }

   return true

  }
  
  const handleAddExam = async () => {
    const checkValidate = validate()

    const formData = new FormData();
  Object.keys(data).forEach((key) => {
  if(key === 'examFile'){
    if(data.examFile) formData.append(key, data.examFile);
  } else {
    formData.append(key, data[key]);
  }
  }); 
    if(checkValidate){
      await uploadExam(formData)
      setData(defaultForm)
      document.getElementById("fileInput").value = ""
      document.getElementById("my_modal_3").close()
    }
  }

  return (
    <div className="m-7">
        <p className="text-4xl font-semibold">จัดการข้อสอบ</p>

    <div className="flex gap-7 items-center">
      <button className="btn mt-4" onClick={()=>document.getElementById('my_modal_3').showModal()}>
      <Plus size={15}/>
      <p>เพิ่มข้อสอบ</p>
    </button>

    <div>
     <SearchExam />
    </div>
    </div>



    <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex flex-col">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setData(defaultForm)}>✕</button>
        </form>
       
       <div className="mt-2 grid grid-cols-2 gap-x-5">
          <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชื่อข้อสอบ</span>
              </label>
              <div className="w-[200px]">
                <input 
                name="examName"
                value={data.examName}
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeData}
                />
              </div>
          </div>

          <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชื่อวิชา</span>
              </label>
              <div className="w-[200px]">
                <input 
                name="Coursename"
                value={data.Coursename}
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeData}
                />
              </div>
          </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">เทอม</span>
              </label>
            <select name="term" value={data.term} onChange={ChangeData} className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>เทอม 1</option>
            <option value={2}>เทอม 2</option>
          </select>
          </div>

          <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชั้นปี</span>
              </label>
            <select name="year" value={data.year} onChange={ChangeData} className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>ปี 1</option>
            <option value={2}>ปี 2</option>
            <option value={3}>ปี 3</option>
          </select>
          </div>

           <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ระดับชั้น</span>
              </label>
            <select name="level" onChange={ChangeData} value={data.level} className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={"ปวช"}>ปวช</option>
            <option value={"ปวส"}>ปวส</option>
          </select>
          </div>

           <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ปีการศึกษา</span>
              </label>
              <div className="w-[200px]">
                <input 
                value={data.schoolYear}
                name="schoolYear"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeData}
                />
              </div>
          </div>

           <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">แผนกวิชา</span>
              </label>
              <div className="w-[200px]">
                <input 
                value={data.department}
                name="department"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeData}
                />
              </div>
          </div>

          <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ลิ้งข้อสอบ (ถ้ามี)</span>
              </label>
              <div className="w-[200px]">
                <input 
                name="examLink"
                value={data.examLink}
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeData}
                />
              </div>
          </div>

          <div className="mt-8">
             <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ไฟล์ข้อสอบ (ถ้ามี)</span>
              </label>
              <div>
               <input id="fileInput" name="examFile" type="file" className="file-input w-[445px]" onChange={ChangeFile}/>
              </div>
          </div>
       </div>

         <textarea className="textarea w-[445px] h-28 mt-7 focus:outline-none focus:ring-0 focus:border-primary pl-3 pt-3 border" 
         placeholder="คำอธิบาย" name="description" onChange={ChangeData} value={data.description}></textarea>


       <button className="mt-7 btn btn-primary w-full hover:drop-shadow-base-content
        duration-200 transition-all ease-in"
       onClick={() => handleAddExam()}>
        {isAddingExams ? <LoaderCircle className="size-5 animate-spin" /> : " เพิ่มข้อมูล"}
       </button>
      </div>
    </dialog>


    <TableExam />
    </div>
  )
}

export default ManagExams