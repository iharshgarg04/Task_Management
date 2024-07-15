const Task = require('../models/task');

exports.addTask = async(req,res)=>{
    try{
        const {title,description,dueDate,priority,status,userId} = req.body;
        if(!title || !description || !dueDate || !priority || !userId){
            return res.status(400).json({
                success:false,
                message:"All fields required",
            })
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            userId
        })

        if(task){
            return res.status(200).json({
                success:true,
                message:"Task is created successfully",
            })
        }

    }catch(error){
        console.error(error);
        console.log("Error while adding task");
    }
}

exports.editTask = async(req,res)=>{
    try{    
        const {title,description,dueDate,priority} = req.body;
        if(!title || !description || !dueDate || !priority){
            return res.status(400).json({
                success:false,
                message:"All fields required",
            })
        }
        const task = await Task.findByIdAndUpdate(req.params.id,{
            title,
            description,
            dueDate,
            priority,
        })
        if(!task){
            return res.status(400).json({
                success:true,
                message:"Task not found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Task is updated successfully",
        })
    }catch(error){
        console.log(error);
        console.log("error while editing task");
    }
}