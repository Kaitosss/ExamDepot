import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    department:{
        type:String,
        required:function(){
            return this.role !== "admin"
        }
    },
     fullname:{
        type:String,
        required:function(){
            return this.role !== "admin"
        }
    },
    year:{
        type:Number,
        required:function(){
            return this.role !== "admin"
        }
    },
    level:{
        type:String,
        required:function(){
            return this.role !== "admin"
        }
    }
},{timestamps:true})

const User = mongoose.model("User",userModel)

export default User