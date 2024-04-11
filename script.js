document.addEventListener("DOMContentLoaded", () => {
  const player = document.querySelector(".player");
  const obstacle = document.querySelector(".obstacle");
  const gameBoard = document.querySelector(".game-board");
  let playerLeft = 0;
  let obstacleTop = 50; // Set initial top position for the obstacle
  let obstacleSpeed = 5; // Speed at which the obstacle moves
  let score = 0;

  // Function to move the player left or right
  function movePlayer(direction) {
    if (direction === "left" && playerLeft > 0) {
      playerLeft -= 50;
    } else if (
      direction === "right" &&
      playerLeft < gameBoard.offsetWidth - player.offsetWidth
    ) {
      playerLeft += 50;
    }
    player.style.left = playerLeft + "px";
  }

  // Function to move the obstacle across the screen
  function moveObstacle() {
    obstacleTop += obstacleSpeed;
    obstacle.style.top = obstacleTop + "px";

    if (obstacleTop > gameBoard.offsetHeight) {
      obstacleTop = -30; // Reset the obstacle to the top of the screen
      obstacle.style.left =
        Math.random() * (gameBoard.offsetWidth - obstacle.offsetWidth) + "px"; // Randomize horizontal position
      score++; // Increment score
      updateScore(); // Update score on UI
    }

    requestAnimationFrame(moveObstacle);
  }

  // Game loop to handle player movement and obstacle animation
  function gameLoop() {
    moveObstacle();

    if (checkCollision()) {
      endGame();
      return;
    }

    requestAnimationFrame(gameLoop);
  }

  // Function to check for collision between player and obstacle
  function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return (
      playerRect.bottom >= obstacleRect.top &&
      playerRect.top <= obstacleRect.bottom &&
      playerRect.right >= obstacleRect.left &&
      playerRect.left <= obstacleRect.right
    );
  }

  // Function to update the score on the UI
  function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
  }

  // Function to end the game
  function endGame() {
    alert("Game Over! Your final score is: " + score);
    window.location.reload(); // Reload the page to restart the game
  }

  // Event listeners for player movement
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      movePlayer("left");
    } else if (e.key === "ArrowRight") {
      movePlayer("right");
    }
  });

  // Start the game loop
  gameLoop();

  // Initialize the score
  updateScore();
});
