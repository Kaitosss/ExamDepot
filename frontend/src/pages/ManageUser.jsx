import { LoaderCircle, UserRoundPlus } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import useUserStore from "../store/useUserStore"
import TableUser from "../components/TableUser"

function ManageUser() {

  const defaultUserState = {
    profilePic:null,
    username:"",
    password:"",
    department:"",
    fullname:"",
    year:"" || 1,
    level:"" || "ปวช",
    role:"" || "student"
  }

  const [dataUser,setDataUser] = useState(defaultUserState)
  const [selectImage,setSelectImage] = useState(null)
  const {AddUser,isAddingUsers,getUsers} = useUserStore()

  useEffect(() => {
    getUsers()
  },[getUsers])

  const ChangeUserData = (e) => {
    const {name,value} = e.target
    setDataUser((prev) => ({...prev,[name]:name == "year" ? Number(value) : value}))
  }

  const handleuploadImg = (e) => {
    const file = e.target.files[0]

    if(!file) return

    if(!file.type.startsWith("image/")){
      return toast.error("รูปแบบไฟล์ไม่ถูกต้อง")
    }

    setSelectImage(URL.createObjectURL(file))
    setDataUser((prev) => ({...prev,profilePic:file}))
  }

  const setDefaultData = () => {
    setDataUser(defaultUserState)
    setSelectImage(null)
  }

  const UserSchema = z.object({
    username:z.string().min(1,"กรุณากรอกชื่อผู้ใช้"),
    password:z.string().min(1,"กรุณากรอกรหัสผ่าน"),
    department:z.string().min(1,"กรุณากรอกแผนกวิชา"),
  })


  const validate = () => {
    const result = UserSchema.safeParse(dataUser)

      if(!result.success){
        toast.error(result.error.issues[0].message)
        return false
      }

      return true
    
  }

  const handleAddUser = async () => {
    const checkValidate = validate()

    const formdata = new FormData()
    Object.keys(dataUser).forEach((keys) => {
      if(keys == "profilePic"){
        if(dataUser.profilePic) formdata.append(keys,dataUser.profilePic)
      }
    else{
      formdata.append(keys,dataUser[keys])
    }
    })

    if(checkValidate){
      await AddUser(formdata)
      document.getElementById("my_modal_3").close()
      setDefaultData()
    }
  }

  return (
    <div className="m-5">
      <p className="text-4xl font-semibold">จัดการผู้ใช้งาน</p>

      <div>   
        <button className="btn mt-3" onClick={()=>document.getElementById('my_modal_3').showModal()}><UserRoundPlus size={15}/>เพิ่มผู้ใช้</button>
            <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={setDefaultData}>✕</button>
              </form>

              <div className="mt-4">
                  <label htmlFor="profile" className="cursor-pointer flex flex-col justify-center items-center">
                    <img src={selectImage || "/avatar.jpg"}  className="w-[100px] h-[100px] object-cover rounded-full"/>
                    <p className="mt-3 text-gray-500 text-sm">{selectImage ? dataUser?.profilePic?.name : "คลิกอัปโหลดรูปของคุณ"}</p>
                  </label>
                <input id="profile" type="file" name="profilePic" hidden onChange={handleuploadImg}/>
              </div>

              <div className="grid grid-cols-2 gap-x-5">
                
                 <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชื่อผู้ใช้</span>
              </label>
              <div className="w-[200px]">
                <input 
                value={dataUser.username || ""}
                onChange={ChangeUserData}
                name="username"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                />
              </div>
            </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">รหัสผ่าน</span>
              </label>
              <div className="w-[200px]">
                <input 
                value={dataUser.password || ""}
                onChange={ChangeUserData}
                name="password"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                />

              </div>
            </div>
            
             <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">แผนกวิชา</span>
              </label>
              <div className="w-[200px]">
                <input 
                value={dataUser.department || ""}
                onChange={ChangeUserData}
                name="department"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                />
              </div>
            </div>

             <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชื่อ-นามสกุล</span>
              </label>
              <div className="w-[200px]">
                <input 
                value={dataUser.fullname || ""}
                onChange={ChangeUserData}
                name="fullname"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                />
              </div>
            </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ชั้นปี</span>
              </label>
            <select value={dataUser.year} onChange={ChangeUserData} name="year" className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={1}>ปี 1</option>
            <option value={2}>ปี 2</option>
            <option value={3}>ปี 3</option>
          </select>
          </div>

            <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">ระดับชั้น</span>
              </label>
            <select value={dataUser.level} onChange={ChangeUserData} name="level" className="select w-[200px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={"ปวช"}>ปวช</option>
            <option value={"ปวส"}>ปวส</option>
          </select>
          </div>

             <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-semibold text-xs">สิทธิ์ผู้ใช้งาน</span>
              </label>
            <select value={dataUser.role} onChange={ChangeUserData} name="role" className="select w-[443px] focus:outline-none focus:ring-0 focus:border-primary">
            <option value={"student"}>นักเรียน</option>
            <option value={"admin"}>ผู้ดูแลระบบ</option>
          </select>
          </div>
      </div>

        <button className="mt-7 btn btn-primary w-full hover:drop-shadow-base-content
        duration-200 transition-all ease-in" onClick={handleAddUser}>
        <p>{isAddingUsers ? <LoaderCircle className="size-5 animate-spin"/> : "เพิ่มผู้ใช้งาน"}</p>
       </button>

            </div>
          </dialog>
      </div>

    <TableUser />

    </div>
  )
}

export default ManageUser