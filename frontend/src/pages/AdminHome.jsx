import { useEffect } from "react"
import { NotebookText, Users } from "lucide-react"
import useExamStore from "../store/useExamStore"
import useUserStore from "../store/useUserStore"


function AdminHome() {

  const { getCount,examCount,getLatestexam,Latestexam } = useExamStore()
  const { getCountUser,userCount,getLatestUser,LatestUser } = useUserStore()

  useEffect(() => {
    getCount()
    getCountUser()
    getLatestexam()
    getLatestUser()
  },[])

  return (
    <div className="m-7">
      <div className="w-[700px] h-5">
        <p className="text-4xl font-semibold">หน้าแรก</p>
        <p className="text-gray-400/60 font-bold mt-2 text-sm">ภาพรวมระบบคลังข้อสอบ</p> 

        <div className="grid grid-cols-3 gap-[400px] mt-8">
          <div className="bg-base-200/20 w-[350px] h-28 rounded-xl shadow-xl relative">
            <p className="m-4 text-xl font-semibold ml-5">ข้อสอบทั้งหมด</p>
            
            <p className="font-semibold text-2xl ml-5">{examCount}</p>

            <div className="bg-primary/10 w-12 h-12 absolute right-7 top-12 flex justify-center items-center rounded-2xl">
                <NotebookText size={28} />
            </div>
          </div>

          <div className="bg-base-200/20 w-[350px] h-28 rounded-xl shadow-xl relative">
            <p className="m-4 text-xl font-semibold ml-5">ผู้ใช้ทั้งหมด</p>

            <p className="font-semibold text-2xl ml-5">{userCount}</p>
            
            <div className="bg-primary/10 w-12 h-12 absolute right-7 top-12 flex justify-center items-center rounded-2xl">
              <Users size={28} />
            </div>
          </div>
        </div>

        <div className="flex mt-20 gap-[200px]">
         <div className="rounded-box border border-base-content/5 bg-base-100">
           <p className="flex justify-center text-xl font-semibold mb-3 mt-3">ข้อสอบที่เพิ่มล่าสุด</p>
            <div className="w-1/2">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>ชื่อข้อสอบ</th>
                  <th>แผนกวิชา</th>
                  <th>ระดับชั้น</th>
                  <th>ปีการศึกษา</th>
                  <th>เทอม</th>
                  <th>ชั้นปี</th>
                </tr>
              </thead>
              <tbody>
                {Latestexam?.map((exam,index) => (
                   <tr key={exam?._id}>
                      <th>{index + 1}</th>
                      <th>{exam?.title}</th>
                      <th>{exam?.department}</th>
                      <th>{exam?.level}</th>
                      <th>{exam?.schoolYear}</th>
                      <th>{exam?.term}</th>
                      <th>{exam?.year}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         </div>


          <div className="rounded-box border border-base-content/5 bg-base-100">
            <p className="flex justify-center text-xl font-semibold mb-3 mt-3">ผู้ใช้ที่เพิ่มล่าสุด</p>
            <div className="w-1/2">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>แผนกวิชา</th>
                  <th>ระดับชั้น</th>
                  <th>ชั้นปี</th>
                </tr>
              </thead>
              <tbody>
                {LatestUser?.map((user,index) => (
                   <tr key={user?._id}>
                      <th>{index + 1}</th>
                      <th>{user?.fullname || "-"}</th>
                      <th>{user?.department || "-"}</th>
                      <th>{user?.level || "-"}</th>
                      <th>{user?.year || "-"}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>

        </div>



      </div>
    </div>
  )
}

export default AdminHome