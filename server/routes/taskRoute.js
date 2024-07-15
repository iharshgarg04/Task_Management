const express = require('express');
const { addTask } = require('../controller/taskController');
const router = express.Router();

router.post('/addTask',addTask);

module.exports = router;