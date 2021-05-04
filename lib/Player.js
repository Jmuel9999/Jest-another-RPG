
// Importing the Potion() constructor 
const Potion = require('../lib/Potion');

// Notice how 'name' when undefined will return with a default empty string, little E6 trick
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];

    // Returns an object with various player properties
    Player.prototype.getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    // Returns the inventory array or false if empty
    Player.prototype.getInventory = function() {
        // If this inventory has a length, it exists
        if (this.inventory.length) {
            return this.inventory;
        } // Else could be here, but no need -- shorthand
        return false
    };

    // Method to show how much health player has left
    Player.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    // Method to check if player is alive
    Player.prototype.isAlive = function() {
        if (this.health === 0) {
            return false;
        }
        return true;
    };

    // Method for checking on players subtracted health
    Player.prototype.reduceHealth = function(health) {
        this.health -= health;

        if (this.health < 0) {
            this.health = 0;
        }
    };

    // Method for checking player's attack value
    Player.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    // Method for adding a potion to the player's inventory
    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion);
    };

    // Method for player using a potion from inventory
    Player.prototype.usePotion = function(index) {
        // .splice() removes items from an array and returns the removed items as a new array
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    };
}

module.exports = Player;