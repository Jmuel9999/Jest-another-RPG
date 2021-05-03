const Potion = require('../lib/Potion.js');

// Second test for Potion object
test('creates a random potion object', () => {
    const potion = new Potion();

    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});


// // Starting test for Potion object
// test('creates a health potion object', () => {
//     const potion = new Potion('health');

//     // Name of potion should be HEALTH
//     expect(potion.name).toBe('health');
//     // Value of potion should be SOME KIND OF NUMBER
//     // expect.any() method takes constructor as argument (in this case, Number is the argument)
//     expect(potion.value).toEqual(expect.any(Number));
// });