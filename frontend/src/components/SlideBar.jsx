import { Link,useLocation } from "react-router-dom"
import { House,NotebookText  } from "lucide-react"
import useAuthStore from "../store/useAuthStore"

function SlideBar() {
  const location = useLocation()
  const path = location.pathname
  const {authUser} = useAuthStore()
  
  return (
    <div className="w-96 h-[845px] shadow-xl">
      <div className="pt-10 flex flex-col justify-center items-center">
        {authUser?.role == "admin" && (
          <div>
            <Link className={`${path == "/admin/home" ? "bg-primary/30" : ""}
            flex justify-center gap-2 hover:bg-primary/10 transition-all ease-in w-[250px] p-3 rounded-2xl font-semibold`}
            to={"/"}><House size={22}/> หน้าแรก</Link>
            
             <Link className={`${path == "/manageexam" ? "bg-primary/30" : ""}
            flex justify-center gap-2 hover:bg-primary/10 transition-all ease-in w-[250px] mt-8 p-3 rounded-2xl font-semibold`}
            to={"/manageexam"}><NotebookText size={22}/> จัดการข้อสอบ</Link>

             <Link className={`${path == "/manageusers" ? "bg-primary/30" : ""}
            flex justify-center gap-2 hover:bg-primary/10 transition-all ease-in w-[250px] mt-8 p-3 rounded-2xl font-semibold`}
            to={"/manageusers"}><NotebookText size={22}/> จัดการผู้ใช้งาน</Link>
            
          </div>
        )}

        {authUser?.role == "student" && (
          <div>
             <Link className={`${path == "/user/home" ? "bg-primary/30" : ""}
            flex justify-center gap-2 hover:bg-primary/10 transition-all ease-in w-[250px] p-3 rounded-2xl font-semibold`}
            to={"/"}><NotebookText size={22}/> ข้อสอบ</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SlideBar