const { sequelize, Song } = require('./backend/models'); 

const topSongs = [
  { title: 'Luther', artist: 'Jean Dawson', album: 'CHAOS NOW', genre: 'Alternative', length: '2:57' },
  { title: 'Die With A Smile', artist: 'HUNNY', album: 'Homesick', genre: 'Indie Rock', length: '3:02' },
  { title: 'NOKIA', artist: 'Jean Dawson', album: 'CHAOS NOW*', genre: 'Alternative', length: '2:45' },
  { title: 'Pink Pony Club', artist: 'Chappell Roan', album: 'The Rise and Fall of a Midwest Princess', genre: 'Pop', length: '4:01' },
  { title: 'Just In Case', artist: 'Duckwrth', album: 'Chrome Bull', genre: 'Hip-Hop', length: '3:28' },
  { title: '30 For 30', artist: 'Drake', album: 'What A Time To Be Alive', genre: 'Rap', length: '4:13' },
  { title: 'All The Way', artist: 'Timeflies', album: 'Just for Fun', genre: 'Pop', length: '3:28' },
  { title: 'Ordinary', artist: 'Umi', album: 'Forest in the City', genre: 'R&B/Soul', length: '3:18' },
  { title: 'Gimme A Hug', artist: 'Coach Party', album: 'Killjoy', genre: 'Alt Rock', length: '2:50' },
  { title: 'Smile', artist: 'Wolf Alice', album: 'Blue Weekend', genre: 'Rock', length: '3:15' }
];

async function addSongs() {
  try {
    await sequelize.sync(); // just in case
    for (const song of topSongs) {
      await Song.create(song);
      console.log(`✅ Added: ${song.title}`);
    }
  } catch (err) {
    console.error(`❌ Failed to add songs:`, err);
  } finally {
    await sequelize.close();
  }
}

addSongs();
