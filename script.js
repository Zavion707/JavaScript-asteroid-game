document.addEventListener("DOMContentLoaded", function() {
  const player = document.querySelector('.player');
  const asteroidsContainer = document.querySelector('.asteroids');

  let score = 0;
  let isGameOver = false;

  function movePlayer(event) {
    if (!isGameOver) {
      if (event.key === 'ArrowLeft' && player.offsetLeft > 0) {
        player.style.left = player.offsetLeft - 10 + 'px';
      } else if (event.key === 'ArrowRight' && player.offsetLeft < window.innerWidth - player.offsetWidth) {
        player.style.left = player.offsetLeft + 10 + 'px';
      }
    }
  }

  document.addEventListener('keydown', movePlayer);

  function createAsteroid() {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');
    asteroid.style.left = Math.random() * (window.innerWidth - 30) + 'px';
    asteroidsContainer.appendChild(asteroid);

    const fallInterval = setInterval(() => {
      if (!isGameOver) {
        const asteroidBottom = parseInt(window.getComputedStyle(asteroid).getPropertyValue('bottom'));
        const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
        const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));

        if (asteroidBottom >= playerBottom &&
            asteroidBottom <= playerBottom + 50 &&
            playerLeft + 50 >= parseInt(asteroid.style.left) &&
            playerLeft <= parseInt(asteroid.style.left) + 30) {
          endGame();
          clearInterval(fallInterval);
        }

        asteroid.style.bottom = asteroidBottom - 5 + 'px';

        if (asteroidBottom <= 0) {
          score++;
          asteroid.remove();
          clearInterval(fallInterval);
        }
      }
    }, 20);
  }

  function endGame() {
    isGameOver = true;
    alert(`Game Over! Your score: ${score}`);
    player.style.display = 'none';
    document.removeEventListener('keydown', movePlayer);
  }

  function gameLoop() {
    if (!isGameOver) {
      createAsteroid();
      setTimeout(gameLoop, 1000);
    }
  }

  gameLoop();
});
