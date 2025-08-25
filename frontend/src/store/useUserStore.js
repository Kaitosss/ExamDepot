import { create } from "zustand";
import toast from "react-hot-toast";
import { apiReq } from "../lib/axios";
import useAuthStore from "./useAuthStore";
import useExamStore from "./useExamStore";

const useUserStore = create((set,get) => ({
    isUpdatingProfile:false,
    isUpdatingPassword:false,
    isAddingUsers:false,
    userData:null,
    isUpdatingUser:null,
    user:null,
    userCount:0,
    LatestUser:null,
     updateUser:async(formdata) => {
        set({isUpdatingProfile:true})
        try {
            const response = await toast.promise(
                apiReq.post("/user/update",formdata),
                {
                    loading:"กำลังอัปเดต...",
                    success:"อัปเดตโปรไฟล์สำเร็จ",
                    error:"เกิดข้อผิดพลาด"
                }
            )

            const userData = response.data

            set({authUser:userData})
            useAuthStore.getState().checkAuth()

            const examStore = useExamStore.getState()
            const newChange = {}

            for(const [page,exmas] of Object.entries(examStore.cachedPages)){
                newChange[page] = exmas.map((exam) => {
                    if(exam.uploadedBy._id == userData._id){
                        return {...exam,uploadedBy:userData}
                    }
                    return exam
                })
            }

            useExamStore.setState({
                cachedPages:newChange
            })

        } catch (error) {
            toast.error(error.response.data.error)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },
    updatePassword:async(data) => {
        set({isUpdatingPassword:true})
        try {
            const response = await apiReq.post("/user/change-password",data)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.error)
        }finally{
            set({isUpdatingPassword:false})
        }
    },
    AddUser:async (formdata) => {
        set({isAddingUsers:true})
        try {
            const response = await apiReq.post("/user/adduser",formdata)
            toast.success(response.data.message)
            get().getUsers()
        } catch (error) {
            toast.error(error.response.data.error)
        }
        finally{
            set({isAddingUsers:false})
        }
    },
    getUsers:async () => {
        try {
            const response = await apiReq.get("/user/users")
            set({userData:response.data})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    getUser: async (id) => {
        try {
            const response = await apiReq.get(`/user/${id}`)
            set({user:response.data})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    updateUserById:async (formdata,id) => {
        set({isUpdatingUser:true})
        try {
            const response = await apiReq.post(`/user/update/${id}`,formdata)
            toast.success(response.data.message)
            get().getUsers()
        } catch (error) {
            toast.error(error.response.data.error)
        }
        finally{
            set({isUpdatingUser:false})
        }
    },
    deleteUser: async (id) => {
        try {
            const response = await apiReq.post(`/user/${id}`)
            toast.success(response.data.message)
            get().getUsers()
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    getCountUser:async () =>{
        try {
            const response = await apiReq.get("/user/count")
            set({userCount:response.data.count})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    getLatestUser:async () => {
        try {
            const response = await apiReq.get("/user/lastestuser")

            set({LatestUser:response.data})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    }
}))


export default useUserStore