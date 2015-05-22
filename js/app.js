// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 250) + 150);
};

//set collision proximity for enemies
var COLLISION_PROX = 55;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //if the enemy crosses off screen, reset its position. Otherwise, it keeps running.
    if (this.x <= 550){
        this.x += this.speed * dt;
    } else {
        this.x = -5;
    }

    //If the player comes within 25px of an enemy's x and y coordinates, reset the game
    if (player.y >= this.y - COLLISION_PROX && player.y <= this.y + COLLISION_PROX) {
        if (player.x >= this.x - COLLISION_PROX && player.x <= this.x + COLLISION_PROX) {
            alert("INFECTED! GAME OVER")
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

//Move player with keypad
Player.prototype.update = function() {
    if (this.ctlKey === 'left' && this.x > 15){
        this.x = this.x - 101;
    } else if (this.ctlKey === 'right' && this.x < 390){
        this.x = this.x + 101;
    } else if (this.ctlKey === 'up'){
        this.y = this.y - 83;
    } else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 83;
    }
    this.ctlKey = null;
    if (this.y < 25) {
        alert("You made it -- these bugs hate water! Congratulations!");
        this.reset();
    }
};

//Input handler for player object
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
};

//Reset player to beginning position
Player.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
};

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 55));
    allEnemies.push(new Enemy(-20, 225));
    allEnemies.push(new Enemy(-10, 135));
}());

//create new Player object
var player = new Player();

//Add player to canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
