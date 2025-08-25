import { User, UserRoundCog,Lock,Eye,EyeOff,LoaderCircle,Citrus } from 'lucide-react';
import useAuthStore from "../store/useAuthStore";
import { useState } from "react"
import toast from "react-hot-toast";
import {z} from "zod"

function Login() {
    const [showPassword,setShowPassword] = useState(false)
    const [formdata,setFormdata] = useState({
        username:"",
        password:"",
    })
    const {login,isLogging} = useAuthStore()

    const loginSchema = z.object({
      username:z.string().min(1,"กรูณากรอกชื่อผู้ใช้งาน"),
      password:z.string().min(1,"กรูณากรอกรหัสผ่าน"),
    })

    const validate = () => {
      const result = loginSchema.safeParse(formdata)

      if(!result.success){
        if(!formdata.username || !formdata.password){
          toast.error(result.error.issues[0].message)
          return false
        }
      }

      return true
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const checkValidate = validate()
      if(checkValidate){
        login(formdata)
      }
    }

    const ChangData = (e) => {
        setFormdata((prev) => ({...prev,[e.target.name]:e.target.value}))
    }

  return (
    <div className="flex justify-around items-center mt-32">
       <form onSubmit={handleSubmit}>
         <div className="min-h-20 text-center flex-col flex justify-center items-center bg-primary/5 p-28 rounded-2xl relative">
            <div className="absolute right-0 top-[-8px]">
              <Citrus/>
            </div>
            <div className="size-12 bg-base-100 text-base-content flex justify-center items-center
            rounded-xl hover:bg-primary/25 transition-all ease-in duration-300 hover:drop-shadow-base-content animate-bounce">
                <UserRoundCog size={34} />
            </div>
            <h1 className="text-2xl font-bold mt-2">เข้าสู่ระบบ</h1>
          
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
                value={formdata.username || ""}
                placeholder="ชื่อผู้ใช้งาน"
                onChange={ChangData}
                />
                </div>
              </div>

               <div className="mt-7">
                 <label className="fieldset-label mt-1 mb-2">
                <span className="label font-medium text-xs">รหัสผ่าน</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 inset-y-0 pl-3 pointer-events-none flex items-center z-50">
                    <Lock className="size-6" />
                </div>

                <input 
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full focus:outline-none focus:ring-0 focus:border-primary pl-12"
                value={formdata.password || ""}
                placeholder="รหัสผ่าน"
                onChange={ChangData}
                />

                 <button 
                type="button"
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer z-50"
                onClick={() => setShowPassword(!showPassword)}
                > 
                {showPassword ? <EyeOff className="size-5 text-base-content/40"/> 
                : <Eye className="size-5 text-base-content/40"/>
                }
              </button>
              </div>
              </div>
            </div>


            <button type="submit" className="btn btn-primary w-full mt-12 hover:drop-shadow-base-content
             duration-200 transition-all ease-in" disabled={isLogging}>
                {isLogging ? 
                <>
                 <LoaderCircle className="size-5 animate-spin"/>
                </>
                : "เข้าสู่ระบบ"
                }
            </button>
           
        </div>

       </form>
    </div>
  )
}

export default Login