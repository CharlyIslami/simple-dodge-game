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

startButton.addEventListener("click", function () {
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
    speed: 3,
    color: "#3498db"
};

let obstacles = [];

for (let i = 0; i < 5; i++) {
    obstacles.push({
        x: Math.random() * canvas.width,
        y: 0,
        width: 30,
        height: 30,
        speed: 7,
        color: "red"
    });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
}

const keys = {
    left: false,
    right: false
};

document.addEventListener("keydown", function (e) {
    if (e.key === "a" || e.key === "ArrowLeft") {
        keys.left = true;
    }
    if (e.key === "d" || e.key === "ArrowRight") {
        keys.right = true;
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "a" || e.key === "ArrowLeft") {
        keys.left = false;
    }
    if (e.key === "d" || e.key === "ArrowRight") {
        keys.right = false;
    }
});

function updatePlayer() {
    if (keys.left && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.right && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
};

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.y += obs.speed;

        if (obs.y > canvas.height) {
            obs.y = 0;
            obs.x = Math.random() * canvas.width;
        }
    }
}

function update() {
    updatePlayer();
    updateObstacles();

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
}

function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}




