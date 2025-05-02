const songs = [
  { title: 'Luther', artist: 'Kendrick Lamar & SZA', length: '3:45', genre: 'Hip-Hop', album: 'CTRL+Section', description: 'Hit single from Kendrick Lamar and SZA.', imageUrl: '/img/luther.jpg' },
  { title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', length: '4:05', genre: 'Pop', album: 'Neon Lovers', description: 'Collaboration between Lady Gaga and Bruno Mars.', imageUrl: '/img/die_with_a_smile.jpg' },
  { title: 'NOKIA', artist: 'Drake', length: '3:30', genre: 'Rap', album: 'Silicon Dreams', description: 'Latest track by Drake.', imageUrl: '/img/nokia.jpg' },
  { title: 'Pink Pony Club', artist: 'Chappell Roan', length: '3:50', genre: 'Alt-Pop', album: 'Midwest Princess', description: 'Popular song by Chappell Roan.', imageUrl: '/img/pink_pony_club.jpg' },
  { title: 'Just In Case', artist: 'Morgan Wallen', length: '3:40', genre: 'Country', album: 'Whiskey Hours', description: 'New release from Morgan Wallen.', imageUrl: '/img/just_in_case.jpg' },
  { title: '30 For 30', artist: 'SZA with Kendrick Lamar', length: '4:00', genre: 'R&B', album: 'Duality', description: 'Duet by SZA and Kendrick Lamar.', imageUrl: '/img/30_for_30.jpg' },
  { title: 'All The Way', artist: 'BigXthaPlug featuring Bailey Zimmerman', length: '3:55', genre: 'Trap/Country', album: 'Southbound Heat', description: 'Collaboration between BigXthaPlug and Bailey Zimmerman.', imageUrl: '/img/all_the_way.jpg' },
  { title: 'Ordinary', artist: 'Alex Warren', length: '3:35', genre: 'Pop Rock', album: 'Bittersweet', description: 'Track by Alex Warren.', imageUrl: '/img/ordinary.jpg' },
  { title: 'Gimme A Hug', artist: 'Drake', length: '3:25', genre: 'Hip-Hop', album: 'Certified Loner Boy', description: 'Another hit from Drake.', imageUrl: '/img/gimme_a_hug.jpg' },
  { title: 'Smile', artist: 'Morgan Wallen', length: '3:45', genre: 'Country', album: 'Rust Belt Heart', description: 'Morgan Wallen\'s latest single.', imageUrl: '/img/smile.jpg' },
];


(async () => {
    for (const song of songs) {
        try {
            const res = await fetch('http://localhost:3000/api/songs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(song),
            });
          
            if (res.ok) {
              const data = await res.json();
              console.log(`✅ Added: ${data.title}`);
            } else {
              const errorText = await res.text();
              console.error(`❌ Failed: ${song.title}\nServer responded with:\n${errorText}`);
            }
          } catch (err) {
            console.error(`❌ Failed: ${song.title}\n${err}`);
          }
          
    }
  })();