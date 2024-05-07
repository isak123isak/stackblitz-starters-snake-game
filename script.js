document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const tileSize = 20;
  const canvasSize = 20;
  const appleColor = 'red';
  const snakeColor = 'green';

  let snake = [{ x: 10, y: 10 }];
  let dx = 0;
  let dy = 0;

  let apple = { x: Math.floor(Math.random() * canvasSize), y: Math.floor(Math.random() * canvasSize) };

  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = appleColor;
      ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);

      ctx.fillStyle = snakeColor;
      snake.forEach(segment => {
          ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
      });
  }

  function moveSnake() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      if (head.x === apple.x && head.y === apple.y) {
          apple = { x: Math.floor(Math.random() * canvasSize), y: Math.floor(Math.random() * canvasSize) };
      } else {
          snake.pop();
      }
  }

  function checkCollision() {
      if (
          snake[0].x < 0 || snake[0].x >= canvasSize ||
          snake[0].y < 0 || snake[0].y >= canvasSize ||
          snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
      ) {
          return true;
      }
      return false;
  }

  function update() {
      if (checkCollision()) {
          clearInterval(gameLoop);
          alert('Game Over!');
      }

      moveSnake();
      draw();
  }

  function keyDownHandler(e) {
      switch (e.key) {
          case 'ArrowUp':
              if (dy === 0) {
                  dx = 0;
                  dy = -1;
              }
              break;
          case 'ArrowDown':
              if (dy === 0) {
                  dx = 0;
                  dy = 1;
              }
              break;
          case 'ArrowLeft':
              if (dx === 0) {
                  dx = -1;
                  dy = 0;
              }
              break;
          case 'ArrowRight':
              if (dx === 0) {
                  dx = 1;
                  dy = 0;
              }
              break;
      }
  }

  document.addEventListener('keydown', keyDownHandler);

  const gameLoop = setInterval(update, 100);
});
