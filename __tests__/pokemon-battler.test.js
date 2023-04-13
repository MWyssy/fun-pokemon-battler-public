const {
    Pokemon 
} = require('../pokemon-battler.js');

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
                const expectedOutput = 100;  
                const pikachu = new Pokemon('Pikachu', 100);            
                //Assert
                expect(pikachu.hitPoints).toBe(expectedOutput);
            });
            test('should have an attackDamage property, which is a number', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const expectedOutput = 50;  
                const pikachu = new Pokemon(name, hitPoints, attackDamage);
                //Assert
                expect(pikachu.attackDamage).toBe(expectedOutput);
            });
            test('should have a move property', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'thunderbolt'
                const expectedOutput = 'thunderbolt';  
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(pikachu.move).toBe(expectedOutput);
            });
            test('should have a move property, which should default to "tackle"', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const expectedOutput = 'tackle';  
                const pikachu = new Pokemon(name, hitPoints, attackDamage); 
                //Assert
                expect(pikachu.move).toBe(expectedOutput);
            });
        });
        describe('pokemon methods', () => {
            test('should have a take damage method that takes a number and reduces health by the number given', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'thunderbolt'
                const expectedOutput = 80;  
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                //Act
                pikachu.takeDamage(20)
                //Assert
                expect(pikachu.hitPoints).toBe(expectedOutput);
            });
            test('should have a useMove method that returns the Pokemon\'s attachDamage', () => {
                //Arrange
                const consoleSpy = jest.spyOn(console, 'log')
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'thunderbolt'
                const expectedOutput = 50;  
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(pikachu.useMove()).toBe(expectedOutput);
                expect(consoleSpy).toHaveBeenCalledWith("Pikachu used Pikachu's thunderbolt")
            });
            test('should have a has fainted method that returns a boolen based on whether the pokeman has fainted or not', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(pikachu.hasFainted()).toBe(false);
                //Act
                pikachu.takeDamage(50);
                pikachu.takeDamage(50);
                //Assert
                expect(pikachu.hasFainted()).toBe(true);         
            }); 
        });
    });
});
