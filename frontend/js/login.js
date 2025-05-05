document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (res.ok) {
        localStorage.setItem('userId', data.userId);
        window.location.href = 'browse.html';
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  });
});
