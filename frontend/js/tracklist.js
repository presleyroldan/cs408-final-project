const urlParams = new URLSearchParams(window.location.search);
const viewingUserId = urlParams.get('userId') || localStorage.getItem('userId');
const userId = localStorage.getItem('userId');

if (!viewingUserId) {
    alert('No user ID found. Redirecting to login.');
    window.location.href = 'index.html';
}

// Show the "Clear All" button only if viewing your own list
if (viewingUserId === userId) {
    document.getElementById('clearAll').style.display = 'inline-block';
}

async function loadTracklist() {
    try {
        const response = await fetch(`/tracklist/${viewingUserId}`);
        const songs = await response.json();

        const container = document.getElementById('songList');
        container.innerHTML = '';

        let totalSeconds = 0;

        songs.forEach(song => {
            const songEntry = document.createElement('div');
            songEntry.className = 'song-entry';

            const img = document.createElement('img');
            img.src = song.imageUrl || 'img/logo.png';
            img.style.width = '150px';
            img.style.objectFit = 'cover';

            const detailsDiv = document.createElement('div');

            const card = document.createElement('a');
            card.href = `song.html?songId=${song.id}`;
            card.className = 'card';
            card.innerHTML = `
            <p><strong>${song.title}</strong></p>
            <p>${song.artist}</p>
            <p>${song.length}</p>
          `;

            detailsDiv.appendChild(card);
            songEntry.appendChild(img);
            songEntry.appendChild(detailsDiv);
            container.appendChild(songEntry);

            totalSeconds += getSeconds(song.length);
        });

        document.querySelector('.summary').innerHTML = `
          <h3>summary</h3>
          <p>SONG COUNT: ${songs.length}</p>
          <p>TOTAL TIME: ${formatTime(totalSeconds)}</p>
        `;
    } catch (err) {
        console.error('Error loading tracklist:', err);
    }
}

function getSeconds(length) {
    const [min, sec] = length.split(':').map(Number);
    return min * 60 + sec;
}

function formatTime(secTotal) {
    const min = Math.floor(secTotal / 60);
    const sec = secTotal % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

document.getElementById('clearAll').onclick = async () => {
    const confirmed = confirm("Are you sure you want to clear your list?");
    if (!confirmed) return;

    try {
        const response = await fetch(`/tracklist/${viewingUserId}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        alert(result.message || 'Tracklist cleared!');
        loadTracklist(); // refresh the list
    } catch (err) {
        console.error('Error clearing tracklist:', err);
        alert('Failed to clear tracklist.');
    }
};

loadTracklist();