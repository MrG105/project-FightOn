const gameName = document.querySelector('#newGame').value.trim();

if (gameName) {
    const response = await fetch('/api/games/', {
      method: 'POST',
      body: JSON.stringify({ gameName }),
      headers: { 'Content-Type': 'application/json' },
    })
  }