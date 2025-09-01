import { create } from "zustand";
import toast from "react-hot-toast"
import { apiReq } from "../lib/axios"

const useExamStore = create((set,get) => ({
    examData:null,
    examSearchData:null,
    lastFilter:null,
    isAddingExams:false,
    isUpdating:false,
    isSearching:false,
    cachedPages: {},
    page:1,
    limit:7,
    totalPage:null,
    exams:null,
    isSearchPage:false,
    examCount:0,
    Latestexam:null,
    loading:false,
    isSearchExam:false,
    setBackPage:() => set({isSearchPage:false,lastFilter:null}),
    uploadExam:async(data) => {
        set({isAddingExams:true})
        try {
            await apiReq.post("/exam/upload",data)
            toast.success("เพิ่มข้อสอบเรียบร้อยแล้ว")

            const { page, limit } = get();
            get().getPagination(page, limit,true);
        } catch (error) {
            toast.error(error.response.data.error)
        }
        finally{
            set({isAddingExams:false})
        }
    },
    getPagination:async(page,limit,forceReload = false) => {
        const cached = get().cachedPages[page]
        if(cached && !forceReload){
            set({examData:cached,page})
            return
        }

        try {
            const response = await apiReq.get(`/exam/page?page=${page}&limit=${limit}`)
            const { exams, totalPages } = response.data;

            set((state) => ({
                examData:exams,
                cachedPages:{...state.cachedPages,[page]:exams},
                page,
                totalPage:totalPages
            }))

            if (page < totalPages && !get().cachedPages[page + 1]) {
                apiReq.get(`/exam/page?page=${page + 1}&limit=${limit}`).then((nextRes) => {
                set((state) => ({
                    cachedPages: { ...state.cachedPages, [page + 1]: nextRes.data.exams },
                }));
            });
        }
        } catch (error) {
            toast.error(error.response.data.error)   
        }
    },
    getExam:async(id) => {
        try {
            const response = await apiReq.get(`/exam/${id}`)
            set({exams:response.data})
        } catch (error) {
            toast.error(error.response.data.error)   
        }
    },
    updateExam:async(data,id) => {
        set({isUpdating:true})
        try {
            const response = await apiReq.post(`/exam/update/${id}`,data)
            toast.success(response.data.message)

             set({ cachedPages: {} });
            const { page, limit } = get();
            await get().getPagination(page, limit, true);

            if(get().lastFilter){
                get().searchExam(get().lastFilter)
            }
           
        } catch (error) {
            toast.error(error.response.data.error)   
        }
        finally{
            set({isUpdating:false})
        }
    },
    deleteExam:async (id) => {
        try {   
            const response = await apiReq.post("/exam/delete",{id})
            toast.success(response.data.message)
            set({ cachedPages: {} });
            
            if(get().examData.length === 0 && page > 1) {//
                await get().getPagination(page - 1, limit, true)
                set({ page: page - 1 }) 
            }
            
            const { page, limit } = get();
            get().getPagination(page, limit, true);
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    searchExam:async (filterdata) => {
        set({isSearching:true,isSearchPage:true,lastFilter:filterdata})
        try {
            const response = await apiReq.post("/exam/search",filterdata)

           set({examSearchData:response.data})
           
        } catch (error) {
            toast.error(error.response.data.error)
        }
        finally{
            set({isSearching:false})
        }
    },
    getCount:async () => {
        try {
            const response = await apiReq.get("/exam/count")
            set({examCount:response.data.count})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    getLatestexam:async() => {
        try {
            const response = await apiReq.get("/exam/lastestexam")
            set({Latestexam:response.data})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    getExams:async () => {
        try {
            const response = await apiReq.get("/exam/exams")

            set({examData:response.data})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    getExamUser:async (id) => {
        set({loading:true})
        try {
            const response = await apiReq.get(`/exam/examuser/${id}`)

            set({exams:response.data,loading:false})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    searchExamUser:async (data) => {
        set({isSearchExam:true})
        try {
            const response = await apiReq.post("/exam/search/user",data)

            set({examData:response.data})
        } catch (error) {
            toast.error(error.response.data.error)
        }
        finally{
            set({isSearchExam:false})
        }
    }
}))

export default useExamStore