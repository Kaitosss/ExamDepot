import { useState } from "react"
import useUserStore from "../store/useUserStore"
import { Link } from "react-router-dom"

function TableUser() {

    const {userData,deleteUser} = useUserStore()
    const [selectId,setSelectId] = useState("")

  return (
    <div className="ml-7">

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">แจ้งเตือน</h3>
            <p className="py-4">คุณต้องการลบผู้ใช้หรือไม่</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">ยกเลิก</button>
                <button onClick={() => deleteUser(selectId)} className="btn btn-error text-white font-semibold">ลบ</button>
              </form>
            </div>
          </div>
        </dialog>

       <div className="mt-5 grid grid-cols-4 overflow-y-auto h-[700px]">
        {userData?.map((data,index) => (
            <div key={index}>
               <div className="flex flex-col justify-center items-center group transition-all ease-in
                 hover:scale-90 shadow-2xl rounded-2xl">
                 <img src={data?.profilePic ? data?.profilePic : "/avatar.jpg"} alt="" className="size-24 object-cover rounded-full"/>
                <p className="mt-3 text-sm">{data?.fullname}</p>
                <div className="flex gap-3">
                    <p className="font-semibold text-xs mt-3">ระดับชั้น {data?.level}</p>
                    <p className="font-semibold text-xs mt-3">ระดับชั้นปีที่ {data?.year}</p>
                </div>

                <div className="flex gap-3">
                     <p className="font-semibold text-xs mt-3">แผนกวิชา {data?.department}</p>
                </div>

                 <div className="flex mt-6 mb-6 gap-2 opacity-0 group-hover:opacity-100 
                transition-opacity duration-200">
                        <Link to={`/edituser/${data?._id}`} className="btn btn-primary font-semibold text-white cursor-pointer">แก้ไข</Link>
                        <button className="btn btn-error text-white font-semibold" onClick={()=>{
                          document.getElementById('my_modal_1').showModal(),
                          setSelectId(data?._id)
                          }}>ลบ</button>
                    </div>
               </div>
            </div>
        ))}
       </div>
    </div>
  )
}

export default TableUser