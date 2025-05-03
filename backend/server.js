const express = require('express');
const sequelize = require('./config');
const Song = require('./models/Song');
const songRoutes = require('./routes/song');
const User = require('./models/User');
const userRoutes = require('./routes/users'); // add this

const app = express();
app.use(express.json());
app.use('/api/songs', songRoutes);
app.use(express.static('frontend'));
app.use('/api/users', userRoutes);


// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});
