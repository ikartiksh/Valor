const express = require('express');
const { uploadContent, getHistory } = require('../controllers/contentController');

const router = express.Router();

router.post('/upload', uploadContent);
router.get('/history', getHistory);

module.exports = router;