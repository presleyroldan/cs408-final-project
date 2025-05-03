const express = require('express');
const router = express.Router();
const { Song } = require('../models');

// GET all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.findAll();
    console.log('🎵 Fetched songs:', songs.length);
    res.json(songs);
  } catch (err) {
    console.error('❌ Song fetch error:', err);
    res.status(500).json({ error: 'Could not fetch songs' });
  }
});

// POST a new song
router.post('/', async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (song) res.json(song);
  else res.status(404).send('Not found');
});


module.exports = router;
