//Game Variables & Constans
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('Music/Food.mp3');
const gameOverSound = new Audio('Music/GameOver.mp3');
const moveSound = new Audio('Music/move.mp3');
const musicSound = new Audio('Music/Music.mp3');
let score = 0;
let speed = 6;
let lastPaintTime = 0;
let SnakeArr = [
    { x: 13, y: 15 }
];

food = { x: 6, y: 7 };
//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollid(snake) {
    //If you bump into yourself
    for (let i = 1; i < SnakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}
function gameEngine() {
    //Part 1: Updating the Snake Array & Food
    if (isCollid(SnakeArr)) {
        musicSound.pause();
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Opps! Game Over! Press any key to play again.");
        SnakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food

    if (SnakeArr[0].y === food.y && SnakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreVal) {
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
            highScoreBox.innerHTML = "HighScore: " + hiscoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        SnakeArr.unshift({
            x: SnakeArr[0].x + inputDir.x,
            y: SnakeArr[0].y + inputDir.y

        });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }
    //Moving the Snake

    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i + 1] = { ...SnakeArr[i] };
    }
    SnakeArr[0].x += inputDir.x;
    SnakeArr[0].y += inputDir.y;
    //Part 2: Display the sanke and Food

    //Display the sanke
    board.innerHTML = "";
    SnakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//Game Logic Starts From here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
}
else {
    hiscoreVal = JSON.parse(hiscore);
    highScoreBox.innerHTML = "HighScore: " + hiscoreVal;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; //Start the Game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            //    console.log("ArrowUp"); 
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            //    console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            //    console.log("ArrowLeft"); 
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            //    console.log("ArrowRight"); 
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});