import toast from "react-hot-toast";
import { create } from "zustand";
import { apiReq } from "../lib/axios";

const useAuthStore = create((set,get) => ({
    authUser:null,
    isCheckingAuth:false,
    isLogging:false,
    isCheckingAuth:true,
    login:async (data) => {
        set({isLogging:true})
        try {
            const response = await apiReq.post("/auth/login",data)
            toast.success("เข้าสู่ระบบสำเร็จ")
            set({authUser:response.data})
            get().checkAuth()
        } catch (error) {
            toast.error(error.response.data.error)
        }
        finally{
            set({isLogging:false})
        }
    },
    logout:async() => {
        try {
            const response = await apiReq.post("/auth/logout")
            set({authUser:null})
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    checkAuth:async () => {
        try {
            const response = await apiReq.get("/auth/check")
            set({authUser:response.data})
        } catch (error) {
            set({ authUser:null })
        }
        finally{
            set({isCheckingAuth:false})
        }
    }
}))


export default useAuthStore

 