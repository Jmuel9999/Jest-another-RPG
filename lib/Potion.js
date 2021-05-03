
// Constructor function 'Potion'
function Potion(name) {
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if (this.name === 'health') {
        // Random number between 30 and 40
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        // Random number between 7 and 12
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

module.exports = Potion;