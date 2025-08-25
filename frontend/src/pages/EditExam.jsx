import { useEffect, useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import useExamStore from "../store/useExamStore"
import { ChevronLeft, LoaderCircle,SquarePen  } from "lucide-react"

function EditExam() {

    const { id } = useParams()
    const navigate = useNavigate()
    const {getExam,exams,isUpdating,updateExam,isSearchPage} = useExamStore()
    const defaultExam = {
    examName:"",
    Coursename:"",
    term: 1,
    year: 1,
    level: "ปวช",
    schoolYear:"",
    department:"",
    examLink:"",
    examFile:"",
    publicId:"",
    description:""
    }

    const [examsData,setExamData] = useState(defaultExam)

    useEffect(() => {
        getExam(id)
    },[id,getExam])

    const ChangeData = (e) => {
        const {name,value} = e.target
        const nameFields = ["term","year"]
        setExamData((prev) => ({...prev,[name]:nameFields.includes(name) ? Number(value) : value}))
    }

    const ChangeFile = (e) => {
        const file = e.target.files[0]
        if(!file) return
        setExamData((prev) => ({...prev,examFile:file}))
    }
   
    useEffect(() => {
        setExamData((prev) => ({
            ...prev,
            examName:exams?.title || "",
            Coursename:exams?.subject || "",
            term:exams?.term || 0,
            year:exams?.year || 0,
            level:exams?.level || "",
            schoolYear:exams?.schoolYear || "",
            department:exams?.department || "",
            examLink:exams?.externalUrl || "",
            examFile:exams?.fileUrl || "",
            publicId:exams?.publicId || "",
            description:exams?.description || ""
        }))
    },[exams])

    const handleUpdate = async () => {
        const formData = new FormData()
        Object.keys(examsData).map((key) => {
            if(key == "examFile"){
                formData.append(key,examsData.examFile)
            }
            else{
                formData.append(key,examsData[key])
            }
        })

        await updateExam(formData,id)
    }

  return (
    <div className="m-7">
        <p className="text-4xl font-semibold flex items-center gap-2">แก้ไขข้อสอบ <SquarePen size={21}/></p>

        <button className="btn mt-3" onClick={() => {isSearchPage ? navigate("/search") : navigate("/manageexam")}}><ChevronLeft size={15}/>Back</button>

        <div className="grid grid-cols-3 w-[1200px] shadow-xl p-12 rounded-2xl mt-3">
            <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ชื่อข้อสอบ</span>
                </label>
                   
                <input value={examsData?.examName || ""} 
                name="examName"
                onChange={ChangeData}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>
                    
            <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ชื่อวิชา</span>
                </label>
                   
                <input value={examsData?.Coursename || ""} 
                name="Coursename"
                onChange={ChangeData}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div> 
            
             <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">เทอม</span>
              </label>
            <select name="term" value={examsData?.term || ""} onChange={ChangeData} className="select w-[250px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>เทอม 1</option>
            <option value={2}>เทอม 2</option>
          </select>
          </div>

            
            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชั้นปี</span>
              </label>
            <select name="year" value={examsData?.year || ""} onChange={ChangeData} className="select w-[250px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>ปี 1</option>
            <option value={2}>ปี 2</option>
            <option value={3}>ปี 3</option>
          </select>
          </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ระดับชั้น</span>
              </label>
            <select name="level" onChange={ChangeData} value={examsData?.level || ""} className="select w-[250px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={"ปวช"}>ปวช</option>
            <option value={"ปวส"}>ปวส</option>
          </select>
          </div>  

            <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ปีการศึกษา</span>
                </label>
                   
                <input value={examsData?.schoolYear || ""} 
                name="schoolYear"
                onChange={ChangeData}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>   


            <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">แผนกวิชา</span>
                </label>
                   
                <input value={examsData?.department || ""} 
                name="department"
                onChange={ChangeData}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>   

             <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ลิ้งข้อสอบ</span>
                </label>
                   
                <input value={examsData?.examLink || "-"} 
                name="examLink"
                onChange={ChangeData}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>


            <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ไฟล์ข้อสอบ</span>
                </label>
                   
               <input type="file" name="examFile" className="file-input w-[250px]" onChange={ChangeFile}/>
            </div>

            <div className="ml-[320px] mt-12">
        <textarea className="textarea w-[900px] h-28 mt-7 focus:outline-none focus:ring-0 focus:border-primary pl-3 pt-3 border -ml-[230px]" 
         placeholder="คำอธิบาย" name="description" onChange={ChangeData} value={examsData?.description || ""}></textarea>

         <button className="btn btn-primary w-[400px] mt-12 hover:drop-shadow-base-content
             duration-200 transition-all ease-in" onClick={handleUpdate}>
               {isUpdating ? <LoaderCircle className="size-5 animate-spin"/> : "แก้ไขข้อสอบ"}
        </button>
       </div>
        </div>
       
    </div>
  )
}

export default EditExam