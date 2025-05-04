const express = require('express');
const router = express.Router();
const { User } = require('../models');

// POST /api/login
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ id: user.id, username: user.username, firstName: user.firstName });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
