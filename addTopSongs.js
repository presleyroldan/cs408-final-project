const { sequelize, Song } = require('./backend/models'); // adjust path if needed

const topSongs = [
  { title: 'Luther', artist: 'Artist A', album: 'Album A', genre: 'Indie', length: '3:45' },
  { title: 'Die With A Smile', artist: 'Artist B', album: 'Album B', genre: 'Pop', length: '3:12' },
  { title: 'NOKIA', artist: 'Artist C', album: 'Album C', genre: 'Rap', length: '2:50' },
  { title: 'Pink Pony Club', artist: 'Artist D', album: 'Album D', genre: 'Pop', length: '4:01' },
  { title: 'Just In Case', artist: 'Artist E', album: 'Album E', genre: 'R&B', length: '3:27' },
  { title: '30 For 30', artist: 'Artist F', album: 'Album F', genre: 'Hip-Hop', length: '3:59' },
  { title: 'All The Way', artist: 'Artist G', album: 'Album G', genre: 'Pop', length: '3:20' },
  { title: 'Ordinary', artist: 'Artist H', album: 'Album H', genre: 'Alt', length: '2:58' },
  { title: 'Gimme A Hug', artist: 'Artist I', album: 'Album I', genre: 'Indie', length: '3:33' },
  { title: 'Smile', artist: 'Artist J', album: 'Album J', genre: 'Pop', length: '3:05' }
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
