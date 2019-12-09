// thank you for looking at my code :')

// delcare all variables
let car = $('#car')
let gameWindow = $('#game');
let enemy1 = $('#enemy1');
let enemy2 = $('#enemy2');
let enemy3 = $('#enemy3');
let enemySpeed = 4;
let gameWidth = parseInt(gameWindow.width());
let gameHeight = parseInt(gameWindow.height());
let speed = 4;
// car speed variable was instroduced so i could revert back to the dynmaically changed speed number from modifying it with the handbrake
let carSpeed = 4;
// start the road animation speed at gameSpeedCount
let gameSpeedCount = 700;
let score = 0;
let scoreCounter = $('#score-counter');
let startButton = $('#start');
let scoreModifier = 2;
let running = false;
let handbrake = false;
let right = false;
let left = false;

// make enemy divs go from top to bottom and have random y axis values
const enemyLogic = () => {
    if (parseInt(enemy1.css('top')) == -100) {
        enemy1.css("left", Math.floor(Math.random()*gameWidth)-250);
        enemy1.css("top", parseInt(enemy1.css("top"))+1);
    } if (parseInt(enemy1.css('top')) >= -99 && parseInt(enemy1.css('top')) < gameHeight) {
        enemy1.css("top", parseInt(enemy1.css("top"))+enemySpeed);
    } else {
        enemy1.css('top', -100)
    }
}
const enemy2Logic = () => {
    if (parseInt(enemy2.css('top')) == -100) {
        enemy2.css("left", Math.floor(Math.random()*gameWidth)-350);
        enemy2.css("top", parseInt(enemy2.css('top'))+1);;
    } else if (parseInt(enemy2.css('top')) >= -99 && parseInt(enemy2.css('top')) < gameHeight) {
        enemy2.css("top", parseInt(enemy2.css("top"))+enemySpeed);
    } else  {
        enemy2.css('top', -100);
    } 
}

const enemy3Logic = () => {
    if (parseInt(enemy3.css('top')) == -100) {
        enemy3.css("left", Math.floor(Math.random()*gameWidth)-350);
        enemy3.css("top", parseInt(enemy3.css('top'))+1);;
    } else if (parseInt(enemy3.css('top')) >= -99 && parseInt(enemy3.css('top')) < gameHeight) {
        enemy3.css("top", parseInt(enemy3.css("top"))+enemySpeed);
    } else  {
        enemy3.css('top', -100);
    } 
}


// detect collision by getting enemys offset(location) and comparing them to the cars current position
const collisionDetection = () => {
    carPosition = car.offset()
    enemy1Position = enemy1.offset()
    enemy2Position = enemy2.offset();
    // these if statements only run if the enemy is level with the player, preventing collision being detected when the cone is not near the play on the y axis
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
        // run code below if key is the up arrow
        if (currentGmSpeed < gameSpeedCount) {
            scoreModifier += 2;
            enemySpeed += .95;
            carSpeed += .5;
        // if key is not up which would result in the code above, run code below which will decreate values
        } else if (currentGmSpeed > gameSpeedCount) {
            if (enemySpeed >= 0 && speed >= 0) {
                carSpeed -= .5;
                enemySpeed -= .95;
                if (scoreModifier > 2) {
                    scoreModifier = scoreModifier -= 2;
                }
            }
        }
    }
    // change the corresponding varaibles after running through the tests above
    speed = carSpeed;
    gameSpeedCount = currentGmSpeed;
    gameWindow.css("animation", `animatedBackground ${currentGmSpeed}s linear infinite`);
}
$(() => {
    // BEGGINNING GAME LOGIC, starts it off
    startButton.on('click', ()=> {
        running = true;
        startButton.css('visibility', 'hidden');
        gameWindow.css("animation", `animatedBackground ${gameSpeedCount}s linear infinite`);
    });

// key input detection using jquey

    // keydown moves player and sets left, right, up and down events
    $('body').on("keydown", (event) => {
        event.preventDefault();
        if (running) {
            let key = event.keyCode;
            // right arrow
            if (key == 39) {
                car.css('transform', 'rotate(13deg)');
                right = true;
                left = false;
            }
            // left arrow
            else if (key == 37) {
                car.css('transform', 'rotate(-13deg)');
                left = true;
                right = false;
            } 
            // up arrow
            else if (key == 38) {
                gameSpeed(-50);
            } 
            // down arrow
            else if (key == 40) {
                gameSpeed(50);
            } 
            // space bar 
            else if (key == 32) {
                handbrake = true;
                speed = 15;
                if (right == true) {
                    car.css('transform', 'rotate(32deg)');
                } if (left == true) {
                    car.css('transform', 'rotate(-32deg)');
                }
            }
        }})
        //stop moving on keyup 
        $('body').on('keyup', (event) => {
            let key = event.keyCode;
            // right arrow
            if (key == 39) {
                right = false;
                if (left == false && right == false) {
                    car.css('transform', 'rotate(0deg)');
                }
            // left arrow
            } else if (key == 37) {
                left = false;
                if (left == false && right == false) {
                    car.css('transform', 'rotate(0deg)');
                }
            // spacebar / handbrake
            } else if (key == 32) {
                handbrake = false;
                speed = carSpeed;
                if (right == true) {
                    car.css('transform', 'rotate(13deg)');
                } if (left == true) {
                    car.css('transform', 'rotate(-13deg)');
                }
            }
        })

    // count the score every second and only count while game is running
    // also display score to screen using JQuery
    setInterval(() => {
        if (running == true) {
            if (handbrake == false) {
                score += scoreModifier;
            }
            let scoreP = $('#score');
            let scoreM = $('#multiplier')
            scoreP.text(Math.floor(score))
            scoreM.text("x" + scoreModifier);
        }
    }, 1000)

    // where all my functions are run and the framerate is set
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
            if (score >= 500) {
                enemy2Logic();
            } 
            if (score >= 1000) {
                enemy3Logic();
            }
            collisionDetection();

            if (running == false) {
                $('#game').append('<h2>You have LOST</h2>')
                gameWindow.css('animation', 'none');
            }
        }
        // 30 frames a second
    }, 1000/30)
});
