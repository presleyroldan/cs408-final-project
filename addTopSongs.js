const { sequelize, Song } = require('./backend/models'); 

const songs = [
  { title: 'Luther', artist: 'Kendrick Lamar & SZA', length: '3:45', genre: 'Rap', album: 'CTRL+Section' },
  { title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', length: '4:05', genre: 'Pop', album: 'Neon Lovers' },
  { title: 'NOKIA', artist: 'Drake', length: '3:30', genre: 'Rap', album: 'Silicon Dreams', length: '2:45' },
  { title: 'Pink Pony Club', artist: 'Chappell Roan', length: '3:50', genre: 'Pop', album: 'Midwest Princess' },
  { title: 'Just In Case', artist: 'Morgan Wallen', length: '3:40', genre: 'Country', album: 'Whiskey Hours' },
  { title: '30 For 30', artist: 'SZA with Kendrick Lamar', length: '4:00', genre: 'R&B', album: 'Duality' },
  { title: 'All The Way', artist: 'BigXthaPlug featuring Bailey Zimmerman', length: '3:55', genre: 'Trap/Country', album: 'Southbound Heat' },
  { title: 'Ordinary', artist: 'Alex Warren', length: '3:35', genre: 'Pop', album: 'Bittersweet' },
  { title: 'Gimme A Hug', artist: 'Drake', length: '3:25', genre: 'Rap', album: 'Certified Loner Boy' },
  { title: 'Smile', artist: 'Morgan Wallen', length: '3:45', genre: 'Country', album: 'Rust Belt Heart' },
  { title: 'Soft Disaster', artist: 'Phoebe Bridgers', length: '3:42', genre: 'Indie', album: 'Stranger Tides' },
  { title: 'Digital Rain', artist: 'James Blake', length: '3:59', genre: 'EDM', album: 'Ethernet Dreams' },
  { title: 'Honeywire', artist: 'Doja Cat', length: '3:25', genre: 'Pop', album: 'Glitch Goddess' },
  { title: 'Wild Rose', artist: 'Kacey Musgraves', length: '4:10', genre: 'Country', album: 'Texas Velvet' },
  { title: 'Midnight Stereo', artist: 'The Weeknd', length: '4:01', genre: 'R&B', album: 'After Twilight' },
  { title: 'Cardigan Remix', artist: 'Taylor Swift ft. SZA', length: '3:48', genre: 'Pop', album: 'Folklore Reimagined' },
  { title: 'Velvet Sky', artist: 'Frank Ocean', length: '3:40', genre: 'R&B', album: 'Channel Red' },
  { title: 'No Control', artist: 'Post Malone', length: '3:55', genre: 'Rap', album: 'Out of Orbit' },
  { title: 'Haunted Hearts', artist: 'Lana Del Rey', length: '4:20', genre: 'Pop', album: 'Cursed Romance' },
  { title: 'Blue Jeep', artist: 'Lil Yachty', length: '2:58', genre: 'Rap', album: 'Driveway Melodies' },
  { title: 'Sweet Venom', artist: 'Olivia Rodrigo', length: '3:30', genre: 'Pop', album: 'Sour Bloom' },
  { title: 'Desert Lights', artist: 'Khalid', length: '3:47', genre: 'R&B', album: 'American Mirage' },
  { title: 'Phantom Caller', artist: 'Billie Eilish', length: '4:02', genre: 'Pop', album: 'Shadow Dial' },
  { title: 'Echoes', artist: 'Tyler, The Creator', length: '2:55', genre: 'Hip-Hop', album: 'Flower Circuit' },
  { title: 'Cherry Glow', artist: 'Charli XCX', length: '3:41', genre: 'EDM', album: 'Velcro Hearts' },
  { title: 'Falling West', artist: 'Bon Iver', length: '4:12', genre: 'Indie', album: 'Rust and Rivers' },
  { title: 'No Halo', artist: 'BROCKHAMPTON', length: '3:38', genre: 'Rap', album: 'GINGER' },
  { title: 'Crimson Tides', artist: 'Lorde', length: '3:45', genre: 'Pop', album: 'Solar Surf' },
  { title: 'Plastic Flowers', artist: 'Halsey', length: '3:33', genre: 'Indie', album: 'Ashes & Lace' },
  { title: 'New Americana II', artist: 'Halsey', length: '3:55', genre: 'Pop', album: 'Rebel Hearts' }
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
