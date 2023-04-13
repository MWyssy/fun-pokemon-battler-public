const {
    Pokemon,
    FirePokemon, 
    WaterPokemon, 
    GrassPokemon,
    NormalPokemon 
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
            test('should have a takeDamage method that takes a number and reduces health by the number given', () => {
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
                expect(consoleSpy).toHaveBeenCalledWith("Pikachu used thunderbolt")
            });
            test('should have a hasFainted method that returns a boolen based on whether the pokeman has fainted or not', () => {
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
    describe('Fire constructor', () => {
        describe('Fire constructor Properties', () => {
            test('', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const move = 'ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move); 
                //Assert
                
                //Act
                
                //Assert
                expect().toBe();
            });
        });
        describe('Fire constructor Methods', () => {
            test('should have a isEffectiveAgainst method that returns boolean value', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const move = 'ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof charmander.isEffectiveAgainst()).toBe('boolean');
            });
            test('the isEffective method should return true if a grass pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const move = 'ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move);
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'vine whip');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'water gun');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'scratch');
                //Assert
                expect(charmander.isEffectiveAgainst(grassPokemon)).toBe(true);
                expect(charmander.isEffectiveAgainst(waterPokemon)).toBe(false);
                expect(charmander.isEffectiveAgainst(normalPokemon)).toBe(false);
            });
            test('should have a isWeakTo method that returns boolean value', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const move = 'ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof charmander.isWeakTo()).toBe('boolean');
            });
            test('the isWeakTo method should return true if a water pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const move = 'ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move);
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'vine whip');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'water gun');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'scratch');
                //Assert
                expect(charmander.isWeakTo(grassPokemon)).toBe(false);
                expect(charmander.isWeakTo(waterPokemon)).toBe(true);
                expect(charmander.isWeakTo(normalPokemon)).toBe(false);
            });
        });   
    });
    describe('Water constructor', () => {
        describe('Water constructor Properties', () => {
            test('', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 110;
                const attackDamage = 35;
                const move = 'water gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                
                //Act
                
                //Assert
                expect().toBe();
            });
        });
        describe('Water constructor Methods', () => {
            test('should have a isEffectiveAgainst method that returns boolean value', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 110;
                const attackDamage = 35;
                const move = 'water gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof squirtle.isEffectiveAgainst()).toBe('boolean');
            });
            test('the isEffective method should return true if a fire pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 110;
                const attackDamage = 35;
                const move = 'water gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'vine whip');
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'ember');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'scratch');
                //Assert
                expect(squirtle.isEffectiveAgainst(grassPokemon)).toBe(false);
                expect(squirtle.isEffectiveAgainst(firePokemon)).toBe(true);
                expect(squirtle.isEffectiveAgainst(normalPokemon)).toBe(false);
            });
            test('should have an isWeakTo method that returns boolean value', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 110;
                const attackDamage = 35;
                const move = 'water gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof squirtle.isWeakTo()).toBe('boolean');
            });
            test('the isWeakTo method should return true if a grass pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 110;
                const attackDamage = 35;
                const move = 'water gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'vine whip');
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'ember');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'scratch');
                //Assert
                expect(squirtle.isWeakTo(grassPokemon)).toBe(true);
                expect(squirtle.isWeakTo(firePokemon)).toBe(false);
                expect(squirtle.isWeakTo(normalPokemon)).toBe(false);
            });
        });
    });
    describe('Grass constructor', () => {
        describe('Grass constructor Properties', () => {
            test('', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 90;
                const attackDamage = 45;
                const move = 'vine whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                
                //Act
                
                //Assert
                expect().toBe();
            });
        });
        describe('Grass constructor Methods', () => {
            test('should have a isEffectiveAgainst method that returns boolean value', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 90;
                const attackDamage = 45;
                const move = 'vine whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof bulbasaur.isEffectiveAgainst()).toBe('boolean');
            });
            test('the isEffective method should return true if a water pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 90;
                const attackDamage = 45;
                const move = 'vine whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'ember');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'water gun');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'scratch');
                //Assert
                expect(bulbasaur.isEffectiveAgainst(firePokemon)).toBe(false);
                expect(bulbasaur.isEffectiveAgainst(waterPokemon)).toBe(true);
                expect(bulbasaur.isEffectiveAgainst(normalPokemon)).toBe(false);
            });
            test('should have a isWeakTo method that returns boolean value', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 90;
                const attackDamage = 45;
                const move = 'vine whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof bulbasaur.isWeakTo()).toBe('boolean');
            });
            test('the isWeakTo method should return true if a fire pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 90;
                const attackDamage = 45;
                const move = 'vine whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'ember');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'water gun');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'scratch');
                //Assert
                expect(bulbasaur.isWeakTo(firePokemon)).toBe(true);
                expect(bulbasaur.isWeakTo(waterPokemon)).toBe(false);
                expect(bulbasaur.isWeakTo(normalPokemon)).toBe(false);
            });
        });
    });
    describe('Normal constructor', () => {
        describe('Normal constructor Properties', () => {
            test('', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 30;
                const attackDamage = 10;
                const move = 'scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                
                //Act
                
                //Assert
                expect().toBe();
            });
        });
        describe('Normal constructor Methods', () => {
            test('should have a isEffectiveAgainst method that returns boolean value', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 30;
                const attackDamage = 10;
                const move = 'scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof rattatta.isEffectiveAgainst()).toBe('boolean');
            });
            test('the isEffective method should return false', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 30;
                const attackDamage = 10;
                const move = 'scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'vine whip');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'water gun');
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'ember');
                //Assert
                expect(rattatta.isEffectiveAgainst(grassPokemon)).toBe(false);
                expect(rattatta.isEffectiveAgainst(waterPokemon)).toBe(false);
                expect(rattatta.isEffectiveAgainst(firePokemon)).toBe(false);
            });
            test('should have a isWeakTo method that returns boolean value', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 30;
                const attackDamage = 10;
                const move = 'scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof rattatta.isWeakTo()).toBe('boolean');
            });
            test('the isWeakTo method should return false', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 30;
                const attackDamage = 10;
                const move = 'scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'vine whip');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'water gun');
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'ember');
                //Assert
                expect(rattatta.isWeakTo(grassPokemon)).toBe(false);
                expect(rattatta.isWeakTo(waterPokemon)).toBe(false);
                expect(rattatta.isWeakTo(firePokemon)).toBe(false);
            });
        });
    });
});
