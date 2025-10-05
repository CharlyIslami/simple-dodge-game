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

const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
    height: 40,
    width: 40,
    speed: 7,
    color: "#3498db"
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);  
}

const keys = {
    left: false,
    right: false
};

document.addEventListener("keydown", function(e){
    if (e.key === "a" || e.key === "ArrowLeft"){
        keys.left = true;
    }
    if (e.key === "d" || e.key === "ArrowRight"){
        keys.left = true;
    }
});

document.addEventListener("keyup", function(e){
    if (e.key === "a" || e.key === "ArrowLeft"){
        keys.left = false;
    }
    if (e.key === "d" || e.key === "ArrowRight"){
        keys.right = false;
    }
});






