document.addEventListener("DOMContentLoaded", () => {
    loadSongs();
  });
  
  async function loadSongs() {
    try {
      const response = await fetch("/api/songs"); 
      const songs = await response.json();
      const songList = document.getElementById("songList");
  
      songs.forEach(song => {
        const card = document.createElement("div");
        card.className = "song-card";
        card.innerHTML = `
          <h2>${song.title}</h2>
          <p>${song.artist}</p>
          <button onclick="addToList('${song.id}')">Add to List</button>
        `;
        songList.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading songs:", error);
    }
  }
  
  async function addToList(songId) {
    try {
      const userId = 1; 
      const response = await fetch("/tracklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId, userId })
      });
  
      const result = await response.json();
      alert(result.message || "Added to list!");
    } catch (error) {
      console.error("Error adding song:", error);
    }
  }