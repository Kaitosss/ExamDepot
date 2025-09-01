import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useUserStore from "../store/useUserStore"
import { ChevronLeft, LoaderCircle, UserRoundPen } from "lucide-react"
import toast from "react-hot-toast"

function EditUser() {

    const { id } = useParams()
    const { getUser,user,isUpdatingUser,updateUserById } = useUserStore()
    const defaultData = {
        profilePic:"",
        username:"",
        password:"",
        role:"",
        department:"",
        level:"",
        year:1,
        fullname:""
    }

    const [userData,setUserData] = useState(defaultData)
    const [selectImg,setSelectImg] = useState(null)

    useEffect(() => {
        getUser(id)
    },[id])

    useEffect(() => {
        setUserData((prev) => ({
            ...prev,
            profilePic:user?.profilePic || "",
            username:user?.username || "",
            department:user?.department || "",
            level:user?.level || "",
            year:user?.year || 1,
            role:user?.role || "",
            fullname:user?.fullname || ""
        }))
    },[user])

    const ChangeData = (e) => {
        const {name,value} = e.target
        setUserData((prev) => ({...prev,[name]:name == "year" ? Number(value) : value}))
    }

    const ChangeImg = (e) => {
        const file = e.target.files[0]

        if(!file) return

        if(!file.type.startsWith("image/")){
            return toast.error("รูปแบบไฟล์ไม่ถูกต้อง")
        }

        setSelectImg(URL.createObjectURL(file))
        setUserData((prev) => ({...prev,profilePic:file}))
    }


    const handleUpdateUser = async () => {
        const formData = new FormData()

        Object.keys(userData).forEach((keys) => {
            if(keys == "file"){
                formData.append(keys,userData[keys])
            }
            else{
                formData.append(keys,userData[keys])
            }
        })

        await updateUserById(formData,id)
    }

  return (
    <div className="m-7">
        <p className="text-4xl font-semibold flex items-center gap-2">แก้ไขผู้ใช้งาน <UserRoundPen size={21} /></p>

        <Link to={"/manageusers"} className="btn mt-3"><ChevronLeft size={15}/>Back</Link>

        <div className="w-[1200px] shadow-xl p-12 rounded-2xl mt-3">

        <div className="flex justify-center">
            <label htmlFor="uploadImg">
                <img src={ selectImg ||  userData?.profilePic || "/avatar.jpg" } alt="" className="size-20 object-cover rounded-full cursor-pointer"/>

                <input type="file" hidden id="uploadImg" onChange={ChangeImg}/>
            </label>
        </div>

             <div className="grid grid-cols-3">

             <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ชื่อผู้ใช้งาน</span>
                </label>
                   
                <input 
                name="username"
                onChange={ChangeData}
                value={userData?.username || ""}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>

            <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">รหัสผ่าน</span>
                </label>
                   
                <input 
                name="password"
                onChange={ChangeData}
                value={userData?.password || ""}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
            </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">สิทธิ์ผู้ใช้งาน</span>
              </label>
            <select value={userData?.role} onChange={ChangeData} name="role" className="select w-[250px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={"student"}>นักเรียน</option>
            <option value={"admin"}>ผู้ดูแลระบบ</option>
          </select>
          </div>
        
        <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">แผนกวิชา</span>
                </label>
                   
                <input 
                name="department"
                onChange={ChangeData}
                value={userData?.department || ""}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
        </div>

         <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ระดับชั้น</span>
              </label>
            <select onChange={ChangeData} value={userData?.level || ""} name="level" className="select w-[250px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={"ปวช"}>ปวช</option>
            <option value={"ปวส"}>ปวส</option>
          </select>
          </div>

          <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชั้นปี</span>
              </label>
            <select onChange={ChangeData} value={userData?.year || ""} name="year" className="select w-[250px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>ปี 1</option>
            <option value={2}>ปี 2</option>
            <option value={3}>ปี 3</option>
          </select>
          </div>

        <div className="mt-7">
                <label className="fieldset-label mt-1 mb-2">
                    <span className="label font-medium text-xs">ชื่อ-นามสกุล</span>
                </label>
                   
                <input 
                name="fullname"
                onChange={ChangeData}
                value={userData?.fullname || ""}
                className="input input-bordered w-[250px] focus:outline-none focus:ring-0 focus:border-primary pl-2"
                />
        </div>

        </div>

         <button className="btn btn-primary w-[400px] mt-12 hover:drop-shadow-base-content
             duration-200 transition-all ease-in ml-[320px]" onClick={handleUpdateUser}>
               {isUpdatingUser ? <LoaderCircle className="size-5 animate-spin"/> : "แก้ไขข้อสอบ"}
         </button>

        </div>
    </div>
  )
}

export default EditUser