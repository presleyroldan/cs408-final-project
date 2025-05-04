const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET /api/users - return all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// GET /api/users/:id - return a specific user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

router.post('/:userId/friends', async (req, res) => {
  const { friendId } = req.body;
  try {
    const user = await User.findByPk(req.params.userId);
    const friend = await User.findByPk(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    await user.addFriend(friend); 

    res.json({ message: 'Friend added!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add friend' });
  }
});


module.exports = router;
