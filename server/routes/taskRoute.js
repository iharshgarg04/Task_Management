const express = require('express');
const { addTask, editTask, deleteTask, changeStatus } = require('../controller/taskController');
const router = express.Router();

router.post('/addTask',addTask);
router.put('/editTask/:id',editTask);
router.delete('/deleteTask/:id',deleteTask);
router.put('/updateStatus',changeStatus);

module.exports = router;