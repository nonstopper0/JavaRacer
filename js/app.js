
let car = $('#car')
let gameWindow = $('#game');
let enemies = $('.enemy');
let enemy1 = $('#enemy1');
let enemy2 = $('#enemy2');
let enemy3 = $('#enemy3');
let enemySpeed = 5;
let gameWidth = parseInt(gameWindow.width());
let gameHeight = parseInt(gameWindow.height());
let speed = 7;
let score = 0;
let running = true;
let right = false;
let left = false;
let time = 0;

setInterval(() => {
    score += 0;
}, 1000)

const enemyLogic = () => {
    if (parseInt(enemy1.css('top')) == -100) {
        enemy1.css("left", Math.floor(Math.random()*gameWidth)-100);
        enemy1.css("top", parseInt(enemy1.css("top"))+1);
    } else if (parseInt(enemy1.css('top')) >= -99 && parseInt(enemy1.css('top')) <gameHeight) {
        enemy1.css("top", parseInt(enemy1.css("top"))+enemySpeed);
    } else if (parseInt(enemy1.css('top')) > gameHeight) {
        enemy1.css('top', -100)
    }
    if (score >= 30) {
        if (parseInt(enemy2.css('top')) == -100) {
            enemy2.css("left", Math.floor(Math.random()*gameWidth)-200);
            enemy2.css("top", parseInt(enemy2.css('top'))+1);
        } else if (parseInt(enemy2.css('top')) >= -99 && parseInt(enemy2.css('top')) <gameHeight) {
            enemy2.css("top", parseInt(enemy1.css("top"))+enemySpeed);
        } else if (parseInt(enemy2.css('top')) > gameHeight) {
            enemy2.css('top', -100);
        }
    }
    enemy3.css("left", Math.floor(Math.random()*gameWidth)-100);
}

const messenger = (message) => {
    if (parseInt(enemy1.css('top')) == -100) {
        let $h2 = $(`<h2>${message}</h2>`)
        gameWindow.append($h2)
        $h2.delay(1000).fadeOut();
    }
}

$(() => {

// key input detection using jquey
// dont want to pickup input if the game isnt running
if (running == true) {
    $('body').on("keydown", (event) => {
        let key = event.keyCode;
        if (key == 39) {
            right = true;
        } else if (key == 37) {
            left = true;
        }
    })
    $('body').on('keyup', (event) => {
        let key = event.keyCode;
        if (key == 39) {
            right = false;
        } else if (key == 37) {
            left = false;

        }
    })
}



const gameLoop = setInterval(() => {
    // check if game is running before accepting any paramters
    // basic controls
    if (running == true) {
        if (left == true && car.position().left > 70) {
            car.css("left", parseInt(car.css('left'))-speed);
        } else if (right == true && car.position().left < gameWidth+20) {
            car.css('left', parseInt(car.css('left'))+speed);
        }
    }
    // change the cars speed based upon score 
    if (score ==0 ) {
        messenger("You have reedwdadawdawdawdawdaached level 60, we have upgrade your movement")
        speed = +10;
    }
    enemyLogic();
    console.log(score);
}, 50)
});
