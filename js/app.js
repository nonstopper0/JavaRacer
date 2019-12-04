// thank you for looking at my code ;)

// delcare all variables
let car = $('#car')
let gameWindow = $('#game');
let enemies = $('.enemy');
let enemy1 = $('#enemy1');
let enemy2 = $('#enemy2');
let enemy3 = $('#enemy3');
let enemySpeed = 4;
let gameWidth = parseInt(gameWindow.width());
let gameHeight = parseInt(gameWindow.height());
let speed = 4;
// start the road animation speed at :
let gameSpeedCount = 700;
let score = 0;
let scoreCounter = $('#score-counter');
let startButton = $('button');
let scoreModifier = 2;
let running = false;
let right = false;
let left = false;

// make enemy divs go from top to bottom and have random y axis values
const enemyLogic = () => {
    if (parseInt(enemy1.css('top')) == -100) {
        enemy1.css("left", Math.floor(Math.random()*gameWidth)-250);
        enemy1.css("top", parseInt(enemy1.css("top"))+1);
    } if (parseInt(enemy1.css('top')) >= -99 && parseInt(enemy1.css('top')) <gameHeight) {
        enemy1.css("top", parseInt(enemy1.css("top"))+enemySpeed);
    } else {
        enemy1.css('top', -100)
    }
    if (score >= 1000) {{
        if (parseInt(enemy2.css('top')) == -100) {
            enemy2.css("left", Math.floor(Math.random()*gameWidth)-350);
            enemy2.css("top", parseInt(enemy2.css('top'))+1);;
        } else if (parseInt(enemy2.css('top')) >= -99 && parseInt(enemy2.css('top')) <gameHeight) {
            enemy2.css("top", parseInt(enemy1.css("top"))+enemySpeed);
        } else  {
            enemy2.css('top', -100);
        } 
    }
    }
}

// detect collision by getting enemys offset and comparing them to the cars current position
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
// game speed modifier called from up and down button key pushes
const gameSpeed = (modifier) => {
    // check variables to not go below 90s second animation and no go over 750s
    if (gameSpeedCount > 90 && ((gameSpeedCount+modifier) > 90) && (gameSpeedCount < 750 && (gameSpeedCount+modifier) < 750)) {
        currentGmSpeed = gameSpeedCount + modifier;
        if (currentGmSpeed < gameSpeedCount) {
            scoreModifier += 2;
            enemySpeed += .95;
            speed += .5;
        // if key is not down which would result in the code above, run code below
        } else if (currentGmSpeed > gameSpeedCount) {
            if (enemySpeed >= 0 && speed >= 0) {
                speed -= .5;
                enemySpeed -= .95;
                if (scoreModifier > 2) {
                    coreModifier = scoreModifier -= 2;
                }
            }
        }
    }
    gameSpeedCount = currentGmSpeed;
    gameWindow.css("animation", `animatedBackground ${currentGmSpeed}s linear infinite`);
}
$(() => {
    // BEGGINNING GAME LOGIC, starts it off
    startButton.on('click', ()=> {
        running = true
        startButton.css('visibility', 'hidden');
        gameWindow.css("animation", `animatedBackground ${gameSpeedCount}s linear infinite`);
    });

// key input detection using jquey
// dont want to pickup input if the game isnt running

    // keydown moves player and sets left and right events
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
            event.preventDefault();
            gameSpeed(-50);
        } else if (key ==40) {
            event.preventDefault();
            gameSpeed(50);
        }
    })
    //stop moving on keyup 
    $('body').on('keyup', (event) => {
        let key = event.keyCode;
        if (key == 39) {
            right = false;
            if (left == false && right == false) {
                car.css('transform', 'rotate(0deg)');
            }
        } else if (key == 37) {
            left = false;
            if (left == false && right == false) {
                car.css('transform', 'rotate(0deg)');
            }
        }})

    // count the score every second and only count while game is running
    // also display score to screen using JQuery
    setInterval(() => {
        if (running == true) {
        score += scoreModifier;
        let scoreP = $('#score');
        let scoreM = $('#multiplier')
        scoreP.text(Math.floor(score))
        scoreM.text("x" + scoreModifier);
        }
    }, 1000)

    // run functions and listen for running
    const gameLoop = setInterval(() => {
        // check if game is running before accepting any paramters
        // basic controls
        if (running == true) {
            if (left == true && car.position().left > -10) {
                car.css("left", parseInt(car.css('left'))-speed);
            } else if (right == true && car.position().left < gameWidth-100) {
                car.css('left', parseInt(car.css('left'))+speed);
            }

            enemyLogic();
            collisionDetection();

            if (running == false) {
                $('#game').append('<h2>You have LOST</h2>')
                gameWindow.css('animation', 'none');
            }
        }
        // 30 frames a second
    }, 1000/30)
});

