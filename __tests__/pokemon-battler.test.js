const Pokemon = require('../pokemon-battler.js');

describe('pokemonBattler Tests', () => {
    describe('Pokemon constructor', () => {
        describe('Pokemon properties', () => {
            test('should have a name property', () => {
                //Arrange
                const input = 'Pikachu'
                const expectedOutput = input  
                //Act
                const pikachu = new Pokemon(input)
                //Assert
                expect(pikachu.name).toBe(expectedOutput);
            });
            test('should have a hitpoints property, which is a number', () => {
                //Arrange
                const input = 'Pikachu'
                const expectedOutput = 50;  
                const pikachu = new Pokemon(input);
                //Act

                //Assert
                expect(pikachu.hitPoints).toBe(expectedOutput);
            });
            test('should have an attackDamage property, which is a number', () => {
                //Arrange
                const input = 'Pikachu'
                const expectedOutput = 20;  
                const pikachu = new Pokemon(input);
                //Act

                //Assert
                expect(pikachu.attackDamage).toBe(expectedOutput);
            });
            test('should have a move property, which should default to "tackle"', () => {
                //Arrange
                const input = 'Pikachu'
                const expectedOutput = 'tackle';  
                const pikachu = new Pokemon(input);
                //Act

                //Assert
                expect(pikachu.move).toBe(expectedOutput);
            });
        });
    });
  });