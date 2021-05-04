
// This imports the Potion() constructor into the test, making Potion a usable variable
const Potion = require('../lib/Potion');

// Replaces the constructor's implementation with our faked data
jest.mock('../lib/Potion');

// Note that we do NOT need to put Player.js because Node assumes it is a JS file
const Player = require('../lib/Player');

//console.log(new Potion());

// Creating 'Dave'
test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    // Note the player's inventory should be an array containing an object
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

// Here we are checking the player.getStats() returns an object with four specific properties
test('gets players stats as an object', () => {
    // We create a new Player instance for every test to be able to test properties in isolation
    const player = new Player('Dave');
    
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

// We simulate an empty array by setting player.inventory = [] before the next expect() runs
test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test('gets players health value', () => {
    const player = new Player('Dave');

    // expect.stringContaining method can be used to make our string include our player's health
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('checks if player is alive or not.', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

// Test to see if the correct amount of health is being subtracted from the Player health property
test('subtracts from players health', () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    // Second call of reduceHealth is for making sure that it never goes negative
    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

test("gets player's attack value", () => {
    const player = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

// We keep track of the old count of potions so that we can ensure that adding a potion actually increases the length of player.inventoryk array
// NOTE: We are still using the Potion mock for this
test("adds a potion to the inventory.", () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test("uses a potion from inventory", () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    // Keeping track of the old inventory length so that we can make sure length decreases and does not go below 0
    expect(player.inventory.length).toBeLessThan(oldCount);
});