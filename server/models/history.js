const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
        required:true,
    },
    change:{
        type:String,
        required:true,
    },
    updatedAt:{
        type:Date,
        default : Date.now,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})

const History = mongoose.model("History",historySchema);
module.exports = History;