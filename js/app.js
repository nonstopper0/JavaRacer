$(() => {


let car = $('#car')
let gameWindow = $('#game')
let gameWidth = parseInt(gameWindow.width());
let gameHeight = parseInt(gameWindow.height());
let speed = 5;
let score = 0;
let running = true;
let right = false;
let left = false;

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
    enemyRandomLeft = Math.floor(Math.random()*gameWidth);
    console.log(enemyRandomLeft);
    // check if game is running before accepting any paramters
    // basic controls
    if (running == true) {
        if (left == true && car.position().left > 70) {
            car.css("left", parseInt(car.css('left'))-10);
        } else if (right == true && car.position().left < gameWidth+20) {
            car.css('left', parseInt(car.css('left'))+10);
        }
    }
}, 50)

});