
// Dependencies
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

// Use this method to set up Player and Enemy objects
Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    // Keep track of which Enemy object is currently fighting the player
    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // Destructure name from the prompt object, NOTICE the ES6 arrow
        .then(({name}) => {
            this.player = new Player(name);

            this.startNewBattle;
        });
};

module.exports = Game;