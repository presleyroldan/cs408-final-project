const genre = new URLSearchParams(window.location.search).get('genre');
document.getElementById('genre-heading').textContent = `Genre: ${genre}`;

async function loadGenreSongs() {
    try {
        const res = await fetch('/api/songs');
        const songs = await res.json();

        const filtered = songs.filter(song => song.genre && song.genre.toLowerCase() === genre.toLowerCase());

        const container = document.getElementById('genre-songs');
        container.innerHTML = '';

        filtered.forEach(song => {
            const card = document.createElement('a');
            card.className = 'card';
            card.href = `song.html?songId=${song.id}`;
            card.innerHTML = `
            <p>${song.title}</p>
            <p>${song.artist}</p>
            <p>${song.length}</p>
          `;
            container.appendChild(card);
        });

        if (filtered.length === 0) {
            container.innerHTML = `<p>No songs found for genre: ${genre}</p>`;
        }
    } catch (err) {
        console.error('Error loading songs:', err);
    }
}

loadGenreSongs();