const express = require('express');
const { FetchHistory } = require('../controller/historyController');
const router = express.Router();

router.get('/fetchHistory/:id',FetchHistory);

module.exports = router;