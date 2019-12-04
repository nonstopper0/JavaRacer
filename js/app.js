
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
    score += 1;ƒ
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
    if (score >= 60) {
        if (parseInt(enemy2.css('top')) == -100) {
            enemy2.css("left", Math.floor(Math.random()*gameWidth)-200);
            enemy2.css("top", parseInt(enemy2.css('top'))+1);
        } else if (parseInt(enemy2.css('top')) >= -99 && parseInt(enemy2.css('top')) <gameHeight) {
            enemy2.css("top", parseInt(enemy1.css("top"))+enemySpeed);
        } else if (parseInt(enemy2.css('top')) > gameHeight) {
            enemy2.css('top', -100);
        }
    }
}

const collisionDetection = () => {
    carPosition = car.offset()
    enemy1Position = enemy1.offset()
    enemy2Position = enemy2.offset();
    if (enemy1Position.top > 370 && enemy1Position.top < 440) {
        if (enemy1Position.left > (carPosition.left-50) && enemy1Position.left < (carPosition.left + 60)) {
            running = false;
        } else if (enemy2Position.top > 370 && enemy2Position.top < 440) {
            if (enemy2Position.left > (carPosition.left-50) && enemy2Position.left < (carPosition.left + 60)) {
                running = false;
            }
        }
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

        if (left == true && car.position().left > -50) {
            car.css("left", parseInt(car.css('left'))-speed);
        } else if (right == true && car.position().left < gameWidth-50) {
            car.css('left', parseInt(car.css('left'))+speed);
        }

        if (score == 30) {
            enemySpeed = 7;
            gameWindow.css('animation', "animatedBackground 350s linear infinite")
        } else if (score == 60) {
            enemySpeed = 8; 
            speed = 8;
            gameWindow.css('animation', "animatedBackground 300s linear infinite");
        }
        
        enemyLogic();
        collisionDetection();
        if (running == false) {
            $('#game').append('<h2>You have LOST</h2>')
            gameWindow.css('animation', 'none');
        }
    }
    // change the cars speed based upon score 
}, 1000/60)
});
