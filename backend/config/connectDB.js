import mongoose from "mongoose"


export const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("Connect Database Successfully!")
    } catch (error) {   
        console.log(error)
    }
}