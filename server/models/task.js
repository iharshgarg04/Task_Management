const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    dueDate:{
        type:Date,
        required:true,
    },
    priority:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'to-do',
    },
    createdDate:{
        type:Date,
        default:Date.now,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})