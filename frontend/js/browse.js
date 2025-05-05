document.querySelectorAll('.genre').forEach(genreDiv => {
    genreDiv.addEventListener('click', () => {
        const genre = genreDiv.getAttribute('data-genre');
        window.location.href = `genre.html?genre=${encodeURIComponent(genre)}`;

    });
});

// Load all users as "friends"
async function loadUsers() {
    try {
        const res = await fetch('/api/users');
        const users = await res.json();
        const container = document.getElementById('friendList');
        container.innerHTML = '';

        users.forEach(user => {
            const wrapper = document.createElement('div');
            wrapper.style.textAlign = 'center';
            wrapper.style.marginRight = '10px';

            const img = document.createElement('img');
            img.src = user.imageUrl || 'img/logo.png';
            img.alt = user.username;
            img.style.width = '60px';
            img.style.height = '60px';
            img.style.borderRadius = '50%';
            img.style.cursor = 'pointer';
            img.onclick = () => {
                window.location.href = `account.html?userId=${user.id}`;
            };

            const name = document.createElement('p');
            name.textContent = user.username;
            name.style.fontSize = '12px';
            name.style.color = '#f0f0f0';
            name.style.marginTop = '5px';

            wrapper.appendChild(img);
            wrapper.appendChild(name);
            container.appendChild(wrapper);

        });
    } catch (err) {
        console.error('❌ Failed to load users:', err);
    }
}

// Load recommended songs
async function loadRecommendedSongs() {
    try {
        const res = await fetch('/api/songs');
        const songs = await res.json();
        const container = document.getElementById('recommendedSongs');
        container.innerHTML = '';

        songs.slice(0, 4).forEach(song => {
            const card = document.createElement('a');
            card.href = `song.html?songId=${song.id}`;
            card.className = 'card';
            card.innerHTML = `
          <p>${song.title}</p>
          <p>${song.length || 'N/A'}</p>
          <p>★ ★ ★ ☆ ☆</p>
        `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error('❌ Failed to load songs:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadRecommendedSongs();
});