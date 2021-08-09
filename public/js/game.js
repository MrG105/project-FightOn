const addGame = document.getElementByClass('.addGameBtn');


addGame.addEventListener('click', () => {
    const response = await fetch('/api/users/game', {
        method: 'POST',
        body: {'game_id': 1},
        headers: { 'Content-Type': 'application/json' },
    });


});
    