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

router.get('/:userId/friends', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: User,
        as: 'Friends',
        attributes: ['id', 'username']
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.Friends);
  } catch (err) {
    console.error('Error fetching friends:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// post users
router.post('/', async (req, res) => {
  const { firstName, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const newUser = await User.create({ firstName, username, password }); // maybe add hash later?
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
