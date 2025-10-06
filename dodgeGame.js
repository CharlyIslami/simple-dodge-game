const canvas = document.getElementById("canvasDodge");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("scoreDisplay");
const livesDisplay = document.getElementById("livesDisplay");
const gameOverScreen = document.getElementById("gameOver");
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
    speed: 4,
    color: "#3498db"
};

let obstacles = [];

for (let i = 0; i < 10; i++) {
    obstacles.push({
        x: Math.random() * canvas.width,
        y: -i * 100,
        width: 30,
        height: 30,
        speed: 5 + Math.random() * 2,
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
        obstacles[i].y += obstacles[i].speed;
        if (obstacles[i].y > canvas.height) {
            obstacles[i].y = -30;
            obstacles[i].x = Math.random() * (canvas.width - 30);
            obstacles[i].speed = 3 + Math.random() * 2;
            score += 10;  
            scoreDisplay.textContent = score;
        }
    }
}

function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        
        if (player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y) {
            
            // Tabrakan terjadi!
            lives -= 1;
            livesDisplay.textContent = lives;
            
            // Reset posisi obstacle
            obs.y = -30;
            obs.x = Math.random() * (canvas.width - 30);
            
            // Cek game over
            if (lives <= 0) {
                gameOver();
            }
        }
    }
}

function gameOver() {
    gameRunning = false;
    gameOverScreen.classList.remove("hidden");
    finalScore.textContent = score;
    
    if (score < 500) {
        document.getElementById("hasil").innerHTML = "Gapande maen lo";

    }

     if (score > 500) {
        document.getElementById("hasil").innerHTML = "Lumayan juga lu";

    }  
}

restartButton.addEventListener("click", function() {
    score = 0;
    lives = 3;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;

    player.x = canvas.width / 2 - 20;
    player.y = canvas.height - 60;

    obstacles = [];
    for (let i = 0; i < 5; i++) {
        obstacles.push({
            x: Math.random() * (canvas.width - 30),
            y: -i * 100,
            width: 30,
            height: 30,
            speed: 3 + Math.random() * 2,
            color: "red"
        });
    }

    gameOverScreen.classList.add("hidden");
    gameRunning = true;
    gameLoop();
});

function update() {
    updatePlayer();
    updateObstacles();
    checkCollision();
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






