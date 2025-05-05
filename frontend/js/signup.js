document.getElementById('signupForm').addEventListener('submit', async e => {
    e.preventDefault();
    const body = {
        firstName: document.getElementById('firstName').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        alert('Account created!');
        window.location.href = 'index.html';
    } else {
        const err = await res.json();
        alert('Error: ' + err.error);
    }
});