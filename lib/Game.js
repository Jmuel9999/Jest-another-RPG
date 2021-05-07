
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

    // this is a callback function
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // This is the callback. Destructure name from the prompt object, NOTICE the ES6 arrow
        .then(({name}) => {
            this.player = new Player(name);

            // next, we run this function
            this.startNewBattle();
        });
};

// Initial set up for battle method
Game.prototype.startNewBattle = function() {
    // If the player is quicker than the enemy, Player goes first
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    console.log('Your stats are as follows:')
    // This puts the stats in an easy to read table
    console.table(this.player.getStats());
    // This shows which enemy shows up, and holding what weapon
    console.log(this.currentEnemy.getDescription());

    // This method is responsible for each turn during the round
    this.battle();
};

// Battle method
Game.prototype.battle = function() {
    // For the player turn
    if (this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            // if user chooses 'Use potion'.....
            .then(({action}) => {
                if (action === 'Use potion') {
                    // checks if player's inventory is empty, then so is our inventory array due to how the function was set up
                    // so, if we "don't have any potions in inventory", then THIS...
                    if (!this.player.getInventory()) {
                        console.log('You do not have any potions!');

                        return this.checkEndOfBattle();
                    }
                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({action}) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);

                            this.checkEndOfBattle();
                        });
                } else {
                    // otherwise, player would choose 'Attack' and THIS would occur....
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
            })
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        this.checkEndOfBattle();
    }
};

// this method runs immediatley after player or enemy takes their turn, for flow of the battle
Game.prototype.checkEndOfBattle = function() {
    // method should first verify if both characters are alive
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name}`)

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('You win!');
        }
    } else {
        console.log('You have been defeated!');
    }
};

module.exports = Game;