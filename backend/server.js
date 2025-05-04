const express = require('express');
const songRoutes = require('./routes/song');
const userRoutes = require('./routes/users'); 
const tracklistRoutes = require('./routes/tracklist');
const { sequelize, User, Song, Comment } = require('./models');

const app = express();
app.use(express.json());
app.use('/api/songs', songRoutes);
app.use(express.static('frontend'));
app.use('/api/users', userRoutes);
app.use('/tracklist', tracklistRoutes);
app.use('/api/comments', require('./routes/comments'));



// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});
