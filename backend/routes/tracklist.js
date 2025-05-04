const express = require('express');
const router = express.Router();
const { User, Song } = require('../models');

// POST /tracklist { userId, songId }
router.post('/', async (req, res) => {
  const { userId, songId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const song = await Song.findByPk(songId);

    if (!user || !song) {
      return res.status(404).json({ error: 'User or song not found' });
    }

    await user.addSong(song); 
    res.status(200).json({ message: `Added '${song.title}' to user ${user.username}'s tracklist.` });
  } catch (err) {
    console.error('Error adding to tracklist:', err);
    res.status(500).json({ error: 'Could not add to tracklist' });
  }
});

// list all songs for a user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId, {
      include: Song
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.Songs); 
  } catch (err) {
    console.error('Error fetching tracklist:', err);
    res.status(500).json({ error: 'Could not fetch tracklist' });
  }
});

// remove all songs from user's tracklist
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.setSongs([]); 
    res.status(200).json({ message: `Tracklist cleared for user ${userId}` });
  } catch (err) {
    console.error('Error clearing tracklist:', err);
    res.status(500).json({ error: 'Could not clear tracklist' });
  }
});

module.exports = router;