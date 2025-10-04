const canvas = document.getElementById("canvasDodge");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("scoreDisplay");
const livesDisplay = document.getElementById("livesDisplay");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

let score = 0;
let lives = 3;
let gameRunning = false;

startButton.addEventListener("click", function() {
    startScreen.classList.add("hidden");
    document.querySelector(".game-info").classList.remove("hidden");
    gameRunning = true;
    
    gameLoop();
});

