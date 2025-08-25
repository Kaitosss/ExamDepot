import { useState } from "react"
import useUserStore from "../store/useUserStore"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import toast from "react-hot-toast"
import {z} from "zod"

function NewPassword() {

  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [showNewpassword,setNewPassword] = useState(false)
  const [showOriginalpassword,setOriginalPassword] = useState(false)
  const {updatePassword,isUpdatingPassword} = useUserStore()
  const [data,setData] = useState({
    originalpassword:"",
    newPassword:"",
    Confirmpassword:""
  })

  const passwordSchema = z.object({
    originalpassword:z.string().min(1,"กรุณากรอกรหัสผ่านเดิม"),
    newPassword:z.string().min(1,"กรุณากรอกรหัสผ่านใหม่").min(6,"รหัสผ่านต้องไม่ต่ำกว่า 6 ตัวอักษร"),
    Confirmpassword:z.string().min(1,"กรูรากรอกรหัสยืนยัน")
  }).refine((data) => data.newPassword === data.Confirmpassword,{
    message:"รหัสผ่านไม่ตรงกัน",
    path:["Confirmpassword"]
  })

  const ChangeData = (e) => {
    setData((prev) => ({...prev,[e.target.name]:e.target.value}))
  }

  const validate = () => {
    const result = passwordSchema.safeParse(data)

    if(!result.success){
      toast.error(result.error.issues[0].message)
      return false
    }
    
    return true
  }

  const handleChangePassword = () => {
    const checkvalidate = validate()
    if(checkvalidate){
      updatePassword(data)
    }
  }

  return (
    <div className="flex justify-center mt-20">
        <div className="h-[530px] text-center items-center flex-col flex bg-primary/5 rounded-2xl
        w-[700px]">
            <p className="mt-4 text-2xl font-semibold">เปลี่ยนรหัสผ่าน</p>


           <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-medium text-xs">รหัสผ่านเดิม</span>
              </label>
              <div className="relative w-[385px]">
                <input 
                type={showOriginalpassword ? "text" : "password"}
                name="originalpassword"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                placeholder="รหัสผ่านเดิม"
                onChange={ChangeData}
                />

                 <button 
                type="button"
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer z-50"
                onClick={() => setOriginalPassword(!showOriginalpassword)}
                > 
                {showOriginalpassword ? <EyeOff className="size-5 text-base-content/40"/> 
                : <Eye className="size-5 text-base-content/40"/>
                }
              </button>
              </div>
              </div>

              <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-medium text-xs">รหัสผ่านใหม่</span>
              </label>
              <div className="relative w-[385px]">
                <input 
                type={showNewpassword ? "text" : "password"}
                name="newPassword"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                placeholder="รหัสผ่านใหม่"
                onChange={ChangeData}
                />

                 <button 
                type="button"
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer z-50"
                onClick={() => setNewPassword(!showNewpassword)}
                > 
                {showNewpassword ? <EyeOff className="size-5 text-base-content/40"/> 
                : <Eye className="size-5 text-base-content/40"/>
                }
              </button>
              </div>
              </div>

             <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-medium text-xs">ยืนยันรหัสผ่าน</span>
              </label>
              <div className="relative w-[385px]">
                <input 
                type={showConfirmPassword ? "text" : "password"}
                name="Confirmpassword"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-3"
                placeholder="ยืนยันรหัสผ่าน"
                onChange={ChangeData}
                />

                 <button 
                type="button"
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer z-50"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                > 
                {showConfirmPassword ? <EyeOff className="size-5 text-base-content/40"/> 
                : <Eye className="size-5 text-base-content/40"/>
                }
              </button>
              </div>
              </div>


           <button className="btn btn-primary w-[250px] mt-12 hover:drop-shadow-base-content
             duration-200 transition-all ease-in" onClick={handleChangePassword}>
               {isUpdatingPassword ? 
                <>
                 <LoaderCircle className="size-5 animate-spin"/>
                </>
                : "เปลี่ยนรหัสผ่าน"
                }
            </button>
        </div>
    </div>
  )
}

export default NewPassword