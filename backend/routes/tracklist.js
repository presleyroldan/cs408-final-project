const express = require('express');
const router = express.Router();
const { Tracklist } = require('../models'); // Sequelize model

router.post('/', async (req, res) => {
  const { songId } = req.body;
  try {
    const added = await Tracklist.create({ songId });
    res.status(201).json(added);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add song to list' });
  }
});

module.exports = router;
