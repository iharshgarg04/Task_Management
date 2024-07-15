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
        enum: ['low', 'medium', 'high'],
        required:true,
    },
    status:{
        type:String,
        enum: ['to-do', 'in-progress', 'completed'],
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

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;