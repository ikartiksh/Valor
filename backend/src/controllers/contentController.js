const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { summarizeAndEvaluate } = require('../services/aiService');
const Content = require('../models/Content');

const upload = multer({ dest: 'uploads/' });

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.uploadContent = [
  authenticate,
  upload.single('file'),
  async (req, res) => {
    const { type } = req.body;
    const filePath = path.join(__dirname, '..', '..', req.file.path);
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
      return res.status(400).json({ error: 'Invalid file' });
    }
    try {
      const { summary, rating, price } = await summarizeAndEvaluate(content, type);
      const newContent = new Content({
        userId: req.user.id,
        type,
        originalContent: content,
        summary,
        rating,
        price,
      });
      await newContent.save();
      fs.unlinkSync(filePath);
      res.json({ summary, rating, price });
    } catch (err) {
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'AI processing failed' });
    }
  },
];

exports.getHistory = [
  authenticate,
  async (req, res) => {
    try {
      const history = await Content.find({ userId: req.user.id }).select('-originalContent -userId');
      res.json(history);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch history' });
    }
  },
];