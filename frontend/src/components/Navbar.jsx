import { LogOut,ChevronDown,ChevronUp,User,Cloudy,KeyRound  } from "lucide-react"
import useAuthStore from "../store/useAuthStore"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
function Navbar() {
  const {authUser,logout} = useAuthStore()
  const [show,setShow] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(menuRef.current && !menuRef.current.contains(event.target)){
        setShow(false)
      }
    }

    if(show){
      document.addEventListener("mousedown",handleClickOutside)
    }
    else{
      document.removeEventListener("mousedown",handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[show])

  return (
   <div className="navbar bg-base-100 shadow">
  <div className="size-10 bg-primary/15 flex justify-center items-center
   rounded-xl ml-32">
      <Cloudy size={25} />
   </div>
  <div className="flex-1 font-bold cursor-default ml-3">
    <Link to={"/"} onClick={() => setShow(false)} className="text-xl">คลังข้อสอบ</Link>
  </div>

  <div className="mr-32 cursor-pointer flex items-center" onClick={() => setShow(!show)} ref={menuRef}>
    <div className="flex items-center gap-2">
      <img src={authUser?.profilePic || "/avatar.jpg"} alt="" className="size-10 rounded-full"/>
      <p className="font-semibold">{authUser?.username}</p>
     </div>
  <div>
    <div className="relative w-6 h-6">
    <div className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${show ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-45'}`}>
      <ChevronUp />
    </div>
    <div className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${!show ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'}`}>
      <ChevronDown />
    </div>

    <div className={`${show ? "visible" : "hidden"} mt-3 right-[-10px] absolute top-10 z-50 w-[140px] h-fit bg-primary/5 shadow-2xl rounded-[7px]
    flex flex-col`}>
      {authUser && (
        <>
          <Link to={"/profile"} className="flex gap-2 hover:bg-primary/10 transition-all ease-in w-full p-3 items-center">
        <User size={21}/>
        <p className="text-sm">โปรไฟล์</p>
        </Link>
        </>
      )}
      {authUser && (
        <>
         <Link to={"/newpassword"} className="flex gap-2 hover:bg-primary/10 transition-all ease-in w-full p-3 items-center">
          <KeyRound size={21}/>
          <p className="text-sm">เปลี่ยนรหัสผ่าน</p>
        </Link>
        </>
      )}
       {authUser && (
        <>
         <div className="flex gap-2 hover:bg-primary/10 transition-all ease-in w-full p-3 items-center"
          onClick={() => logout()}>
          <LogOut size={21}/>
          <p className="text-sm">ออกจากระบบ</p>
      </div>
        </>
      )}
    </div>
  </div>
  </div>
</div>
</div>
  )
}

export default Navbar