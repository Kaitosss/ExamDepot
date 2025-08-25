import { LoaderCircle, Search } from "lucide-react"
import { useState } from "react"
import useExamStore from "../store/useExamStore"
import { useNavigate } from "react-router-dom"

function SearchExam() {

    const {isSearching,searchExam} = useExamStore()
    const navigate = useNavigate()

  const defaultFilterData = {
    examName:"",
    Coursename:"",
    term: 1,
    year: 1,
    level: "ปวช",
    schoolYear:"",
    department:"",
  }

    const [filterExam,setFilterExam] = useState(defaultFilterData)

    const ChangeFilterData = (e) => {
      const {name,value} = e.target
      const nameFields = ["term","year"]
      setFilterExam((prev) => ({...prev,[name]:nameFields.includes(name) ? Number(value) : value}))
    } 

  return (
    <div>
     <button className="btn mt-4" onClick={()=>document.getElementById('my_modal_4').showModal()}>
          <Search size={15}/>ค้นหาข้อสอบ
      </button>

        <dialog id="my_modal_4" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setFilterExam(defaultFilterData)}>✕</button>
    </form>

    <div className="mt-2 grid grid-cols-2 gap-x-5">
      <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชื่อข้อสอบ</span>
              </label>
              <div className="w-[200px]">
                <input 
                name="examName"
                value={filterExam.examName}
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeFilterData}
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
                value={filterExam.Coursename}
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeFilterData}
                />
              </div>
          </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">เทอม</span>
              </label>
            <select name="term" value={filterExam.term} onChange={ChangeFilterData} className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>เทอม 1</option>
            <option value={2}>เทอม 2</option>
          </select>
          </div>

          <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชั้นปี</span>
              </label>
            <select name="year" value={filterExam.year} onChange={ChangeFilterData} className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>ปี 1</option>
            <option value={2}>ปี 2</option>
            <option value={3}>ปี 3</option>
          </select>
          </div>

           <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ระดับชั้น</span>
              </label>
            <select name="level" onChange={ChangeFilterData} value={filterExam.level} className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
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
                value={filterExam.schoolYear}
                name="schoolYear"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeFilterData}
                />
              </div>
          </div>

           <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">แผนกวิชา</span>
              </label>
              <div className="w-[445px]">
                <input 
                value={filterExam.department}
                name="department"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                onChange={ChangeFilterData}
                />
              </div>
          </div>

    </div>

    <button type="button" className="mt-7 btn btn-primary w-full hover:drop-shadow-base-content
        duration-200 transition-all ease-in"
    onClick={() => {searchExam(filterExam),navigate("/search")}}>
        {isSearching ? <LoaderCircle className="size-5 animate-spin" /> : " ค้นหาข้อสอบ"}
       </button>
  </div>
    </dialog>
    </div>
  )
}

export default SearchExam