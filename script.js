

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const box = 20; 
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;
let game;

// //Control the Snake
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// // Draw the Snake

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.strokeStyle = 'darkgreen';
        roundRect(snake[i].x, snake[i].y, box, box, 10);
    }
}

// // Draw the Food

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    roundRect(food.x, food.y, box, box, 10);
}

function roundRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// // Update the Game
//     // Get the Current Head Position
function updateGame() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //     // move the Snake
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    //     // Check if the Snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box,
        };
    } else {
        snake.pop();
    }

    //     // Add new head to the snake
    let newHead = { x: snakeX, y: snakeY };
    
//     // Check for collision with walls or itself

    if (snakeX < 0 || snakeX >= 20 * box || snakeY < 0 || snakeY >= 20 * box || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over');
    }
    snake.unshift(newHead);
}

// // collision direction
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// // Main game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateGame();
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, box, box);
}

// Restart Game

function restartGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box,
    };
    score = 0;
    clearInterval(game);
    game = setInterval(draw, 300);
}

game = setInterval(draw, 300);
