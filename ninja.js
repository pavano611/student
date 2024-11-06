const ninja = document.getElementById("ninja");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let gameOver = false;
let isPaused = false;
let gameInterval;

// Start the game
function startGame() {
    score = 0;
    gameOver = false;
    isPaused = false;
    ninja.style.bottom = "0";
    obstacle.style.animation = "obstacle-move 2s infinite linear";
    scoreDisplay.textContent = score;

    gameInterval = setInterval(checkCollision, 50);
}

// Stop the game
function stopGame() {
    clearInterval(gameInterval);
    obstacle.style.animation = "none";
    alert("Game Over! Final Score: " + score);
    gameOver = true;
}

// Pause the game
function pauseGame() {
    if (!gameOver) {
        clearInterval(gameInterval);
        obstacle.style.animationPlayState = "paused";
        isPaused = true;
    }
}

// Resume the game
function resumeGame() {
    if (!gameOver && isPaused) {
        obstacle.style.animationPlayState = "running";
        gameInterval = setInterval(checkCollision, 50);
        isPaused = false;
    }
}

// Restart the game
function restartGame() {
    stopGame();
    startGame();
}

// Jump action with finite jump loop
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !gameOver && !isPaused) {
        jump();
    }
});

function jump() {
    if (!ninja.classList.contains("jump")) {
        ninja.classList.add("jump");
        setTimeout(() => {
            ninja.classList.remove("jump");
        }, 300);
    }
}

// Game loop to check for collisions
function checkCollision() {
    const ninjaBottom = parseInt(window.getComputedStyle(ninja).getPropertyValue("bottom"));
    const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    if (obstacleRight > 550 && obstacleRight < 600 && ninjaBottom <= 50) {
        stopGame();
    }

    if (!gameOver && !isPaused) {
        score++;
        scoreDisplay.textContent = score;
    }
}

// Event listeners for control buttons
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", resumeGame);
restartBtn.addEventListener("click", restartGame);
