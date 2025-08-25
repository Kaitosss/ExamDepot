import mongoose from 'mongoose'

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type:String,
    required: true,
  },
  level: {
    type: String,
    enum: ['ปวช', 'ปวส'],
    required: true,
  },
  schoolYear: {
    type: String, 
    required: true,
  },
  year:{
    type:Number,
    enum:[1,2,3],
    required:true
  },
  subject: {
    type:String,
    required: true,
  },
  term: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  fileUrl: {
    type: String,
    default: null,
  },
  originalFileName: {
    type:String,
    default:null
  },
  externalUrl: {
    type: String,
    default: null, 
  },
  publicId:{
    type:String,
    default:null
  },
  description:{
    type:String
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

const Exams = mongoose.model('Exams', examSchema) 
export default Exams