document.addEventListener('DOMContentLoaded', async () => {
    const userId = new URLSearchParams(window.location.search).get("userId");
    const loggedInUserId = localStorage.getItem('userId');

    if (!userId) {
        document.getElementById("username").textContent = "No user selected.";
        return;
    }

    // Load user details
    async function loadUserDetails() {
        try {
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) throw new Error("User not found");
            const user = await res.json();
            document.getElementById("username").textContent = `@${user.username}`;
            document.getElementById("firstName").textContent = `First name: ${user.firstName}`;
        } catch (err) {
            console.error(err);
            document.getElementById("username").textContent = "User not found";
        }
    }

    // Load tracklist
    async function loadTracklist() {
        try {
            const res = await fetch(`/tracklist/${userId}`);
            const songs = await res.json();
            const container = document.getElementById('tracklist');
            container.innerHTML = '';
            songs.forEach(song => {
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
        } catch (err) {
            console.error('Failed to load tracklist:', err);
        }
    }

    // Load friends
    async function loadFriends() {
        try {
            const res = await fetch(`/api/users/${userId}/friends`);
            if (!res.ok) throw new Error("Friends not found");
            const friends = await res.json();
            const container = document.getElementById('friendList');
            container.innerHTML = '';
            friends.forEach(friend => {
                const div = document.createElement('div');
                div.textContent = friend.username;
                container.appendChild(div);
            });
        } catch (err) {
            console.error('Failed to load friends:', err);
        }
    }

    // Add friend
    document.getElementById('addFriendBtn').addEventListener('click', async () => {
        try {
            const res = await fetch(`/api/users/${loggedInUserId}/friends`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ friendId: userId })
            });

            const result = await res.json();
            alert(result.message || 'Friend added!');
            loadFriends(); // Refresh friend list
        } catch (err) {
            console.error('Add friend failed:', err);
            alert('Failed to add friend');
        }
    });

    // Initial data load
    await loadUserDetails();
    await loadTracklist();
    await loadFriends();
});