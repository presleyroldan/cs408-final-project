
const fetch = require('node-fetch');
const fs = require('fs');

// Replace with your actual Spotify credentials
const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';

async function getAccessToken() {
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await res.json();
  return data.access_token;
}

async function searchTracks(query) {
  const token = await getAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  const results = data.tracks.items.map(track => ({
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    length: `${Math.floor(track.duration_ms / 60000)}:${Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`,
    genre: 'Unknown' // Spotify API doesn't provide genre for individual tracks directly
  }));

  console.log(results);
  // Optionally save to file
  fs.writeFileSync('spotify_songs.json', JSON.stringify(results, null, 2));
}

// Example usage
searchTracks('kendrick lamar');