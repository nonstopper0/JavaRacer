
let car = $('#car')
let gameWindow = $('#game');
let enemies = $('.enemy');
let enemy1 = $('#enemy1');
let enemy2 = $('#enemy2');
let enemy3 = $('#enemy3');
let enemySpeed = 0;
let gameWidth = parseInt(gameWindow.width());
let gameHeight = parseInt(gameWindow.height());
let speed = 4;
// start the road animation speed at a thousand
let gameSpeedCount = 600;
let score = 0;
let scoreCounter = $('#score-counter');
let startButton = $('button');
let running = false;
let right = false;
let left = false;

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
    if (enemy1Position.top > 360 && enemy1Position.top < 440) {
        if (enemy1Position.left > (carPosition.left-50) && enemy1Position.left < (carPosition.left + 60)) {
            running = false;
        } 
    else if (enemy2Position.top > 360 && enemy2Position.top < 440) {
        if (enemy2Position.left > (carPosition.left-50) && enemy2Position.left < (carPosition.left + 60)) {
            running = false;
        }
    }
}
}

const gameSpeed = (modifier) => {
    if (gameSpeedCount > 101) {
        currentGmSpeed = gameSpeedCount + modifier;
        gameSpeedCount = currentGmSpeed;
    }
    if (currentGmSpeed < gameSpeedCount) {
        enemySpeed += .5;
    } else {
        console.log('else')
        if (enemySpeed >= 0) {
            console.log("elif");
            enemySpeed += .5;
        }
    }
    gameWindow.css("animation", `animatedBackground ${currentGmSpeed}s linear infinite`);
}
$(() => {

    startButton.on('click', ()=> {
        running = true
        startButton.css('visibility', 'hidden');
        gameWindow.css("animation", "animatedBackground 600s linear infinite");
    });

// key input detection using jquey
// dont want to pickup input if the game isnt running

    $('body').on("keydown", (event) => {
        let key = event.keyCode;
        if (key == 39) {
            car.css('transform', 'rotate(13deg)');
            right = true;
            left = false;
        } else if (key == 37) {
            car.css('transform', 'rotate(-13deg)');
            left = true;
            right = false;
        } else if (key == 38) {
            console.log(gameSpeedCount);
            gameSpeed(-20);
        } else if (key ==40) {
            console.log(gameSpeedCount)
            gameSpeed(20);
        }
    })

    // count the score every second and only count while game is running
    setInterval(() => {
        if (running == true) {
        score += 5;
        let scoreP = $('#score');
        scoreP.text(score)
        }
    }, 1000)

    const gameLoop = setInterval(() => {
        // check if game is running before accepting any paramters
        // basic controls
        if (running == true) {
            if (left == true && car.position().left > -50) {
                car.css("left", parseInt(car.css('left'))-speed);
            } else if (right == true && car.position().left < gameWidth-50) {
                car.css('left', parseInt(car.css('left'))+speed);
            } 

            // if (score == 30) {
            //     speed = 5;
            //     enemySpeed = 8;
            //     gameWindow.css('animation', "animatedBackground 40s linear infinite")
            // } else if (score == 60) {
            //     enemySpeed = 9; 
            //     speed = 7;
            //     gameWindow.css('animation', "animatedBackground 37s linear infinite");
            // }

            enemyLogic();
            collisionDetection();

            if (running == false) {
                $('#game').append('<h2>You have LOST</h2>')
                gameWindow.css('animation', 'none');
                startButton.css('display', 'visible');
            }
        }
        // change the cars speed based upon score 
    }, 1000/30)
});


