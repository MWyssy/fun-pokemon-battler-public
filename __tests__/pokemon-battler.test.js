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
        describe.only('pokemon methods', () => {
            test('should have a take damage method that takes a number and reduces health by the number given', () => {
                //Arrange
                const input = 'Pikachu'
                const expectedOutput = 30;  
                const pikachu = new Pokemon(input);
                //Act
                pikachu.takeDamage(20)

                //Assert
                expect(pikachu.hitPoints).toBe(expectedOutput);
            });

            test('should have a take damage method that takes a number and reduces health by the number given', () => {
                //Arrange
                const consoleSpy = jest.spyOn(console,'log')
                const input = 'Pikachu'
                const expectedOutput = 20;  
                const pikachu = new Pokemon(input);
                //Act

                //Assert
                expect(pikachu.useMove()).toBe(expectedOutput);
                expect(consoleSpy).toHaveBeenCalledWith("Pikachu used Pikachu's move")
            });

            test('should have a has fainted method that returns a boolen based on whether the pokeman has fainted or not', () => {
                //Arrange
                const input = 'Pikachu' 
                const pikachu = new Pokemon(input);
                //Act

                //Assert
                expect(pikachu.hasFainted()).toBe(false);
                //Act
                pikachu.takeDamage(50)

                //Assert
                expect(pikachu.hasFainted()).toBe(true);
                


                
            });
            
    });

  });
});
