const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');

// GET /api/comments?songId=1
router.get('/', async (req, res) => {
  const { songId } = req.query;
  const comments = await Comment.findAll({
    where: { songId },
    include: { model: User, attributes: ['username'] },
    order: [['createdAt', 'DESC']]
  });
  res.json(comments);
});

// POST /api/comments
router.post('/', async (req, res) => {
  const { text, userId, songId } = req.body;
  const comment = await Comment.create({ text, userId, songId });
  res.status(201).json(comment);
});

module.exports = router;
