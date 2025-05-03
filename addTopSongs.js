const { sequelize, Song } = require('./backend/models'); 

const songs = [
  { title: 'Luther', artist: 'Kendrick Lamar & SZA', length: '3:45', genre: 'Hip-Hop', album: 'CTRL+Section' },
  { title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', length: '4:05', genre: 'Pop', album: 'Neon Lovers' },
  { title: 'NOKIA', artist: 'Drake', length: '3:30', genre: 'Rap', album: 'Silicon Dreams', length: '2:45' },
  { title: 'Pink Pony Club', artist: 'Chappell Roan', length: '3:50', genre: 'Alt-Pop', album: 'Midwest Princess' },
  { title: 'Just In Case', artist: 'Morgan Wallen', length: '3:40', genre: 'Country', album: 'Whiskey Hours' },
  { title: '30 For 30', artist: 'SZA with Kendrick Lamar', length: '4:00', genre: 'R&B', album: 'Duality' },
  { title: 'All The Way', artist: 'BigXthaPlug featuring Bailey Zimmerman', length: '3:55', genre: 'Trap/Country', album: 'Southbound Heat' },
  { title: 'Ordinary', artist: 'Alex Warren', length: '3:35', genre: 'Pop Rock', album: 'Bittersweet' },
  { title: 'Gimme A Hug', artist: 'Drake', length: '3:25', genre: 'Hip-Hop', album: 'Certified Loner Boy' },
  { title: 'Smile', artist: 'Morgan Wallen', length: '3:45', genre: 'Country', album: 'Rust Belt Heart' }
];

async function addSongs() {
  try {
    await sequelize.sync(); 
    for (const song of songs) {
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
