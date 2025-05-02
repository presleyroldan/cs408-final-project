const express = require('express');
const sequelize = require('./config');
const Song = require('./models/Song');
const songRoutes = require('./routes/songs');

const app = express();
app.use(express.json());
app.use('/api/songs', songRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});
