import axios from "axios"

export const apiReq = axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials:true
})