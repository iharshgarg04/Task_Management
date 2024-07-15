const { response } = require("express");
const History = require("../models/history");
const Task = require("../models/task");

exports.addTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, userId } = req.body;
    if (!title || !description || !dueDate || !priority || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const checkTask = await Task.findOne({ title: title });
    if (checkTask) {
      return res.status(400).json({
        success: true,
        message: "Task with this title is already present",
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      userId,
    });

    if (!task) {
      return res.status(400).json({
        success: true,
        message: "Some error while creating the task!. Try again.",
      });
    }
    const taskId = await Task.findOne({ title: title });
    // console.log(taskId._id);
    const createLog = await History.create({
      taskId: taskId._id,
      change: `New Task is Created with title ${title}`,
    });
    if (!createLog) {
      return res.status(400).json({
        success: false,
        message: "Task is not added",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task is created successfully",
      response,
    });
  } catch (error) {
    console.error(error);
    console.log("Error while adding task");
  }
};

exports.editTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({
        success: true,
        message: "Task not found",
      });
    }
    const changes = [];

    if (title && title !== task.title) {
      changes.push(`Title changed from ${task.title} to ${title}`);
      task.title = title;
    }
    if (description && description !== task.description) {
      changes.push(
        `Description changed from '${task.description}' to '${description}'`
      );
      task.description = description;
    }
    if (
      dueDate &&
      new Date(dueDate).toISOString() !== task.dueDate.toISOString()
    ) {
      changes.push(
        `Due date changed from '${
          task.dueDate.toISOString().split("T")[0]
        }' to '${new Date(dueDate).toISOString().split("T")[0]}'`
      );
      task.dueDate = new Date(dueDate);
    }
    if (priority && priority !== task.priority) {
      changes.push(`Priority changed from '${task.priority}' to '${priority}'`);
      task.priority = priority;
    }

    if(changes.length>0){
        const changeDescription = changes.join(', ');
        const createLog = await History.create({taskId:req.params.id, change:changeDescription});
        if(!createLog) return res.status(400).json({
            success:false,
            message:"Error while editing the task",
        })
    }

    return res.status(200).json({
      success: true,
      message: "Task is updated successfully",
    });
  } catch (error) {
    console.log(error);
    console.log("error while editing task");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const response = await Task.findById(req.params.id);
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Task can't be deleted",
      });
    }
    const taskdelete = await Task.findByIdAndDelete(req.params.id);
    const createLog = await History.create({
      taskId: req.params.id,
      change: `Task with task title ${response.title} is deleted`,
    });
    if (!createLog || !taskdelete) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete the task try again!.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    console.log("Error while deleting the task");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    if (!status || !taskId) {
      return res.status(400).json({
        success: false,
        message: "Status is not provided",
      });
    }
    const response = await Task.findByIdAndUpdate(
      taskId,
      { status: status },
      { new: true }
    );
    const task = await Task.findById(taskId);
    const createLog = await History.create({
      taskId: taskId,
      change: `Status of Task ${task.title} changed to ${status}`,
    });
    if (!response || !createLog) {
      return res.status(400).send("Error while changing the task");
    }
    return res.status(200).json({
      success: true,
      message: "status Changed successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    console.log("Error while changing ");
  }
};
