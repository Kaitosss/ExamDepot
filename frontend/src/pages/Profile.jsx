import { useState } from "react"
import useAuthStore from "../store/useAuthStore"
import useUserStore from "../store/useUserStore"
import { Camera,LoaderCircle,User } from "lucide-react"
import toast from "react-hot-toast"

function Profile() {

  const {authUser} = useAuthStore()
  const {updateUser,isUpdatingProfile} = useUserStore()
  const [selectImg,setSelectImg] = useState(null)

  const [data,setData] = useState({
   username:authUser?.username || "",
   profilePic:authUser?.profilePic || ""
  })


  const handleImgupload = async (e) => {
      const file = e.target.files?.[0]

      if(!file.type.startsWith("image/")){
        return toast.error("รูปแบบไฟล์ไม่ถูกต้อง")
      }

      if(!file) return

      setSelectImg(URL.createObjectURL(file))
      setData((prev) => ({...prev,profilePic:file}))
  }

  const handleUpdateProfile = () => {
    const formdata = new FormData()
    formdata.append("username",data.username)
    if(data.profilePic){
      formdata.append("profilePic",data.profilePic)
    }
    updateUser(formdata)
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10">
       <div className="w-[800px] h-[750px] flex flex-col items-center bg-primary/5 p-5 
       rounded-2xl shadow-2xl">
           <h1 className="text-3xl font-semibold">แก้ไขโปรไฟล์</h1>   
          
          <div className="mt-10 relative">
          
         <label htmlFor="uploadImg" className="cursor-pointer">
            <img src={selectImg ||authUser?.profilePic ||"/avatar.jpg"} alt="" className="w-28 h-28 rounded-full object-center object-cover
          border-2 border-base-content"/>   

          <div className="absolute bottom-0 right-0 w-8 h-8 bg-base-content flex justify-center items-center
          rounded-full">
           <div className="text-base-100">
             <Camera size={18} />
           </div>
          </div>
          </label>
         <input 
         onChange={(e) => handleImgupload(e)}
         type="file" 
         name="profilePic"
         className="hidden"
         id="uploadImg"
         />
          </div>
          <p className="mt-2 text-gray-500">คลิกอัปโหลดรูปของคุณ</p>
          

          <div className="mt-5 w-[385px]">
              <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-medium text-xs">ชื่อผู้ใช้งาน</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 pointer-events-none flex items-center z-50">
                    <User className="size-6" />
                </div>

                <input 
                type="text"
                name="username"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-12" 
                value={data.username}
                onChange={(e) => setData((prev) => ({...prev,username:e.target.value}))}
                />
                </div>
              </div>
            </div>
            
            <div className="w-[600px] border border-base-content mt-7"></div>

            <div className="w-full justify-between items-start mt-3 flex pl-20 pr-20">
              <p>เป็นสมาชิกตั้งแต่</p>

              <p>{authUser?.createdAt?.split("T")[0]}</p>
            </div>


            <button onClick={handleUpdateProfile} className="mt-32 btn btn-primary w-52">
              <p>{isUpdatingProfile ? <LoaderCircle className="animate-spin"/> : "แก้ไข"}</p>
            </button>
       </div>
    </div>
  )
}

export default Profile