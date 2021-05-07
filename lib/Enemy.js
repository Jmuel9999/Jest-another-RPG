const Potion = require('./Potion');
const Character = require('./Character');

function Enemy(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random() * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);

    // inherit prototype metods from Character here:
    Enemy.prototype = Object.create(Character.prototype);

    // Method to provide a description of the enemy
      Enemy.prototype.getDescription = function() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
      };
};

module.exports = Enemy;