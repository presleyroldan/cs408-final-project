function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const songId = getQueryParam('songId');
renderSimilarSongs(songId);

if (songId) {
    fetch(`/api/songs/${songId}`)
        .then(res => {
            if (!res.ok) throw new Error("Song not found");
            return res.json();
        })
        .then(data => {
            // Populate main song info
            document.querySelector('.song-info h1').textContent = data.title;
            document.querySelector('.song-info .length').textContent = data.length || 'N/A';
            document.querySelector('.song-description').textContent = data.description || 'No description available.';
            document.querySelector('.song-image img').src = data.imageUrl || 'img/logo.png';

            // Populate similar songs
            renderSimilarSongs(songId);
        })
        .catch(err => {
            document.querySelector('.song-info h1').textContent = 'Song not found';
            console.error(err);
        });
} else {
    document.querySelector('.song-info h1').textContent = 'No song selected';
}

console.log("songId param:", songId);

function renderSimilarSongs(currentSongId) {
    console.log("Rendering similar songs for:", currentSongId);
    fetch('/api/songs')
        .then(res => {
            console.log("Fetched /api/songs, status:", res.status);
            return res.json();
        })
        .then(songs => {
            console.log("Fetched songs:", songs);
            const container = document.getElementById('similar-songs');
            container.innerHTML = '';

            songs
                .filter(song => !currentSongId || song.id !== currentSongId)
                .slice(0, 5) // only keep the first 5
                .forEach(song => {
                    const a = document.createElement('a');
                    a.className = 'card';
                    a.href = `song.html?songId=${song.id}`;
                    a.innerHTML = `
          <p>${song.title}</p>
          <p>${song.artist || 'Unknown Artist'}</p>
          <p>${song.album || 'Unknown Album'}</p>

        `;
                    container.appendChild(a);
                });
        })
        .catch(err => {
            console.error('Failed to load similar songs:', err);
        });
}

async function addToList() {
    try {
        const userId = localStorage.getItem('userId');
        const response = await fetch('/tracklist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ songId, userId })
        });

        const result = await response.json();
        alert(result.message || 'Added to list!');
    } catch (error) {
        console.error('Error adding to tracklist:', error);
        alert('Something went wrong!');
    }
}

async function loadComments() {
    const res = await fetch(`/api/comments?songId=${songId}`);
    const comments = await res.json();
    const container = document.getElementById('commentList');
    container.innerHTML = '';

    comments.forEach(c => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${c.User.username}</strong>: ${c.text}`;
        container.appendChild(div);
    });
}

document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('commentText').value;
    await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, userId, songId })
    });
    document.getElementById('commentText').value = '';
    loadComments();
});

loadComments();

const userId = localStorage.getItem('userId');
async function loadComments() {
    const res = await fetch(`/api/comments?songId=${songId}`);
    const comments = await res.json();
    const list = document.getElementById('commentList');
    list.innerHTML = '';

    comments.forEach(comment => {
        const div = document.createElement('div');
        div.innerHTML = `
    <strong>${comment.User.username}</strong><br>
    <p>${comment.text}</p>
    <hr />
  `;
        list.appendChild(div);
    });
}

document.getElementById('commentForm').addEventListener('submit', async e => {
    e.preventDefault();
    const text = document.getElementById('commentText').value;

    await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, userId, songId })
    });

    document.getElementById('commentText').value = '';
    loadComments();
});

loadComments();
