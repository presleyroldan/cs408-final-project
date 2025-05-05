document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  if (!input) return;

  input.addEventListener('input', async () => {
    const query = input.value.trim();
    const container = document.querySelector('.card-list'); // Or your result container
    if (!container) return;

    if (query.length === 0) {
      container.innerHTML = ''; // Optional: clear results if query is empty
      return;
    }

    try {
      const res = await fetch(`/api/songs?q=${encodeURIComponent(query)}`);
      const songs = await res.json();

      container.innerHTML = ''; // Clear old results

      songs.forEach(song => {
        const card = document.createElement('a');
        card.href = `song.html?songId=${song.id}`;
        card.className = 'card';
        card.innerHTML = `
            <p>${song.title}</p>
            <p>${song.artist}</p>
            <p>${song.length}</p>
          `;
        container.appendChild(card);
      });
    } catch (err) {
      console.error('Search failed:', err);
    }
  });
});
