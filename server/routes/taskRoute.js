const express = require('express');
const { addTask, editTask } = require('../controller/taskController');
const router = express.Router();

router.post('/addTask',addTask);
router.post('/editTask/:id',editTask);

module.exports = router;