const {
    Move,
    Pokemon,
    FirePokemon, 
    WaterPokemon, 
    GrassPokemon,
    NormalPokemon,
    Charmander,
    Squirtle,
    Bulbasaur,
    Rattatta,
    Pokeball,
    Trainer,
    Battle
} = require('../pokemon-battler.js');

describe('pokemonBattler Tests', () => {
    describe('Pokemon constructor', () => {
        describe('Pokemon properties', () => {
            test('should have a name property', () => {
                //Arrange
                const input = 'Pikachu'
                const expectedOutput = input  
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
            test('should have a moves property', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof pikachu.moves).toBe('object');
            });
            test('should have a moves property, which should default to "Tackle"', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const expectedOutput = 'Tackle';  
                const pikachu = new Pokemon(name, hitPoints, attackDamage); 
                //Assert
                expect(pikachu.moves[0]).toBe(expectedOutput);
            });
            test('should be able to have up to 4 moves', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const pikachu = new Pokemon(name, hitPoints, attackDamage, 'Thundershock', 'Thunderbolt', 'Thunder', 'Quick Attack'); 
                const charmander = new Charmander('Charmander', 100, 30, 'Flame Thrower', 'Fire Blast')
                //Assert
                expect(pikachu.moves).toEqual(['Thundershock', 'Thunderbolt', 'Thunder', 'Quick Attack']);  
                expect(charmander.moves).toEqual(['Ember', 'Flame Thrower', 'Fire Blast', '']);    
            }); 
            test('the moves should be objects that have moveName, damage, and power point properties, once the pokemon is caught', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;

                const pikachu = new Pokemon(name, hitPoints, attackDamage, 'Thundershock', 'Thunderbolt', 'Thunder', 'Quick Attack'); 
                const charmander = new Charmander('Charmander', 100, 30, 'Flamethrower', 'Fireblast')

                const testTrainer = new Trainer('Test');

                const thundershock = new Move('Thundershock', 25, 10);
                const thunderbolt = new Move('Thunderbolt', 40, 5);
                const thunder = new Move('Thunder', 60, 2);
                const quickattack = new Move('Quick Attack', 10, 15);

                const ember = new Move('Ember', 15, 10);
                const flamethrower = new Move('Flamethrower', 35, 5);
                const fireblast = new Move('Fireblast', 55, 2);
                //Act
                testTrainer.catch(pikachu);
                testTrainer.catch(charmander);
                //Assert
                expect(pikachu.moves).toEqual([
                    thundershock,
                    thunderbolt,
                    thunder,
                    quickattack
                ]);  
                expect(charmander.moves).toEqual([
                    ember,
                    flamethrower,
                    fireblast,
                    ''
                ]); 
            });
        });
        describe('pokemon methods', () => {
            test('should have a takeDamage method that takes a number and reduces health by the number given', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const expectedOutput = 80;  
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                //Act
                pikachu.takeDamage(20)
                //Assert
                expect(pikachu.hitPoints).toBe(expectedOutput);
            });
            test('should have a useMove method that returns the Pokemon\'s attackDamage', () => {
                //Arrange
                const consoleSpy = jest.spyOn(console, 'log')
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const expectedOutput = 40;  
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const testTrainer = new Trainer('test');
                //Act
                testTrainer.catch(pikachu);
                //Assert
                expect(pikachu.useMove('Thunderbolt')).toBe(expectedOutput);
                expect(consoleSpy).toHaveBeenCalledWith("Pikachu used Thunderbolt");
                consoleSpy.mockRestore();
            });
            test('should have a hasFainted method that returns a boolen based on whether the pokeman has fainted or not', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
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
        describe('Fire constructor Methods', () => {
            test('should have a isEffectiveAgainst method that returns boolean value', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const move = 'Ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof charmander.isEffectiveAgainst()).toBe('boolean');
            });
            test('the isEffective method should return true if a grass pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const move = 'Ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move);
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'Vine Whip');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'Water Gun');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'Scratch');
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
                const move = 'Ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof charmander.isWeakTo()).toBe('boolean');
            });
            test('the isWeakTo method should return true if a water pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const move = 'Ember'
                const charmander = new FirePokemon(name, hitPoints, attackDamage, move);
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'Vine Whip');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'Water Gun');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'Scratch');
                //Assert
                expect(charmander.isWeakTo(grassPokemon)).toBe(false);
                expect(charmander.isWeakTo(waterPokemon)).toBe(true);
                expect(charmander.isWeakTo(normalPokemon)).toBe(false);
            });
        });   
    });
    describe('Water constructor', () => {
        describe('Water constructor Methods', () => {
            test('should have a isEffectiveAgainst method that returns boolean value', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 110;
                const attackDamage = 35;
                const move = 'Water Gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof squirtle.isEffectiveAgainst()).toBe('boolean');
            });
            test('the isEffective method should return true if a fire pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 110;
                const attackDamage = 35;
                const move = 'Water Gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'Vine Whip');
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'Ember');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'Scratch');
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
                const move = 'Water Gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof squirtle.isWeakTo()).toBe('boolean');
            });
            test('the isWeakTo method should return true if a grass pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 110;
                const attackDamage = 35;
                const move = 'Water Gun'
                const squirtle = new WaterPokemon(name, hitPoints, attackDamage, move); 
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'Vine Whip');
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'Ember');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'Scratch');
                //Assert
                expect(squirtle.isWeakTo(grassPokemon)).toBe(true);
                expect(squirtle.isWeakTo(firePokemon)).toBe(false);
                expect(squirtle.isWeakTo(normalPokemon)).toBe(false);
            });
        });
    });
    describe('Grass constructor', () => {
        describe('Grass constructor Methods', () => {
            test('should have a isEffectiveAgainst method that returns boolean value', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 90;
                const attackDamage = 45;
                const move = 'Vine Whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof bulbasaur.isEffectiveAgainst()).toBe('boolean');
            });
            test('the isEffective method should return true if a water pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 90;
                const attackDamage = 45;
                const move = 'Vine Whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'Ember');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'Water Gun');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'Scratch');
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
                const move = 'Vine Whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof bulbasaur.isWeakTo()).toBe('boolean');
            });
            test('the isWeakTo method should return true if a fire pokemon is passed in, and false otherwise', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 90;
                const attackDamage = 45;
                const move = 'Vine Whip'
                const bulbasaur = new GrassPokemon(name, hitPoints, attackDamage, move); 
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'Ember');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'Water Gun');
                const normalPokemon = new NormalPokemon("Rattatta", 30, 5, 'Scratch');
                //Assert
                expect(bulbasaur.isWeakTo(firePokemon)).toBe(true);
                expect(bulbasaur.isWeakTo(waterPokemon)).toBe(false);
                expect(bulbasaur.isWeakTo(normalPokemon)).toBe(false);
            });
        });
    });
    describe('Normal constructor', () => {
        describe('Normal constructor Methods', () => {
            test('should have a isEffectiveAgainst method that returns boolean value', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 30;
                const attackDamage = 10;
                const move = 'Scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof rattatta.isEffectiveAgainst()).toBe('boolean');
            });
            test('the isEffective method should return false', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 30;
                const attackDamage = 10;
                const move = 'Scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'Vine Whip');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'Water Gun');
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'Ember');
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
                const move = 'Scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(typeof rattatta.isWeakTo()).toBe('boolean');
            });
            test('the isWeakTo method should return false', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 30;
                const attackDamage = 10;
                const move = 'Scratch'
                const rattatta = new NormalPokemon(name, hitPoints, attackDamage, move); 
                const grassPokemon = new GrassPokemon("Bulbasaur", 90, 45, 'Vine Whip');
                const waterPokemon = new WaterPokemon("Squirtle", 110, 35, 'Water Gun');
                const firePokemon = new FirePokemon("Charmander", 100, 50, 'Ember');
                //Assert
                expect(rattatta.isWeakTo(grassPokemon)).toBe(false);
                expect(rattatta.isWeakTo(waterPokemon)).toBe(false);
                expect(rattatta.isWeakTo(firePokemon)).toBe(false);
            });
        });
    });
    describe('Pokemon species constructors', () => {
        describe('Charmander constructor Properties', () => {
            test('should be an instance of fire pokemon', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const charmander = new Charmander(name, hitPoints, attackDamage); 
                //Assert
                expect(charmander instanceof FirePokemon).toBe(true);
            });
            test('should have it move to be Ember', () => {
                //Arrange
                const name = 'Charmander'
                const hitPoints = 100;
                const attackDamage = 40;
                const charmander = new Charmander(name, hitPoints, attackDamage); 
                //Assert
                expect(charmander.moves[0]).toBe("Ember");
            });
        });
        describe('Squirtle constructor Properties', () => {
            test('should be an instance of water pokemon', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 100;
                const attackDamage = 40;
                const squirtle = new Squirtle(name, hitPoints, attackDamage); 
                //Assert
                expect(squirtle instanceof WaterPokemon).toBe(true);
                });
            test('should have it move set to Bubble', () => {
                //Arrange
                const name = 'Squirtle'
                const hitPoints = 100;
                const attackDamage = 40;
                const squirtle = new Squirtle(name, hitPoints, attackDamage); 
                //Assert
                expect(squirtle.moves[0]).toBe("Bubble");
            });
        });
        describe('Bulbasaur constructor Properties', () => {
            test('should be an instance of grass pokemon', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 100;
                const attackDamage = 40;
                const bulbasaur = new Bulbasaur(name, hitPoints, attackDamage); 
                //Assert
                expect(bulbasaur instanceof GrassPokemon).toBe(true);
            });
            test('should have it move set to Vine Whip ', () => {
                //Arrange
                const name = 'Bulbasaur'
                const hitPoints = 100;
                const attackDamage = 40;
                const bulbasaur = new Bulbasaur(name, hitPoints, attackDamage); 
                //Assert
                expect(bulbasaur.moves[0]).toBe("Vine Whip");
            });
        });
        describe('Rattatta constructor Properties', () => {
            test('should be an instance of normal pokemon', () => {
                //Arrange
                const name = 'Rattatta'
                const hitPoints = 100;
                const attackDamage = 40;
                const rattatta = new Rattatta(name, hitPoints, attackDamage); 
                //Assert
                expect(rattatta instanceof NormalPokemon).toBe(true);
            });
        });
    });
    describe('Pokeball constructor', () => {
        describe('Pokeball properties', () => {
            test('should have a storedPokemon property', () => {
                //Arrange
                const myPokeball = new Pokeball;
                //Act
                //Assert
                expect(myPokeball.storedPokemon).not.toBe(undefined);
            });
            test('the storedPokemon property should be able to hold a pokemon and return that pokemon, or if it is empty, return an empty object', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const myPokeball = new Pokeball;
                //Assert
                expect(myPokeball.storedPokemon).toEqual({});
                //Act
                myPokeball.throw(pikachu)
                //Assert
                expect(myPokeball.storedPokemon).toBe(pikachu);
            });
        });
        describe('Pokeball methods', () => {
            test('should have a contains method that returns the name of the pokemon stored in the Pokeball, or the string "empty..." otherwise', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const myPokeball = new Pokeball;
                //Assert
                expect(myPokeball.contains()).toBe("empty...");
                //Act
                myPokeball.throw(pikachu);
                //Assert
                expect(myPokeball.contains()).toBe('Pikachu');
            });
            test('should have an isEmpty method that returns true if there is no Pokemon stored in the pokeball, or false otherwise', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const myPokeball = new Pokeball;
                //Assert
                expect(myPokeball.isEmpty()).toBe(true);
                //Act
                myPokeball.throw(pikachu);
                //Assert
                expect(myPokeball.isEmpty()).toBe(false);
            });
            test('should have throw method, that takes a pokemon as an argument, and will \'capture\' the passed pokemon by adding it to storedPokemon', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const myPokeball = new Pokeball;
                //Act
                myPokeball.throw(pikachu);
                //Assert
                expect(myPokeball.storedPokemon).toBe(pikachu);
            });
            test('should have a throw method, that will not allow a pokemon to be captured if there is already a stored pokemon, and logs a message to the console', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const charmander = new Charmander('Charmander', 100, 40);  
                const myPokeball = new Pokeball;
                const consoleSpy = jest.spyOn(console, 'log');
                //Act
                myPokeball.throw(pikachu);
                myPokeball.throw(charmander);
                //Assert
                expect(myPokeball.storedPokemon).toBe(pikachu);
                expect(consoleSpy).toHaveBeenCalledWith('You can\'t catch this Charmander, you already have a Pikachu in your pokeball!');
                consoleSpy.mockRestore();
            });
            test('the throw method should console log \'you caught xpokemon\' when a pokemon is caught', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const myPokeball = new Pokeball;
                const mySecondPokeball = new Pokeball;
                const charmander = new Charmander('Charmander', 100, 40)
                const consoleSpy = jest.spyOn(console, 'log');
                //Act
                myPokeball.throw(pikachu);
                //Assert
                expect(consoleSpy).toHaveBeenCalledWith('you caught Pikachu!');
                //Act
                mySecondPokeball.throw(charmander);
                //Assert
                expect(consoleSpy).toHaveBeenCalledWith('you caught Charmander!');
                consoleSpy.mockRestore();
            });
            test('Use of the throw method with no argument returns the stored pokemon', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const myPokeball = new Pokeball;
                myPokeball.throw(pikachu);

                //Assert
                expect(myPokeball.throw()).toBe(pikachu);
            });
            test('If the throw method is called without an argument then it should console log something like ("GO pokemonX\'s name!!") in this scenario.', () => {
                //Arrange
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                const myPokeball = new Pokeball;
                myPokeball.throw(pikachu);
                const consoleSpy = jest.spyOn(console, 'log');
                //Act
                myPokeball.throw()
                //Assert
                expect(consoleSpy).toHaveBeenCalledWith('GO Pikachu!!');
                consoleSpy.mockRestore();
            });
            test('If the throw method is called without an argument, and there is no stored pokemon, then it should log a message to inform the user.', () => {
                //Arrange
                const myPokeball = new Pokeball;
                const consoleSpy = jest.spyOn(console, 'log');
                //Act
                myPokeball.throw();
                //Assert
                expect(consoleSpy).toHaveBeenCalledWith('Oh No! Your pokeball is empty!!');
                consoleSpy.mockRestore();
            });
        });
    });
    describe('Trainer constructor', () => {
        describe('Trainer properties', () => {
            test('should have a belt property that is an object', () => {  
                //Arrange
                const megan = new Trainer("megan")
                //Assert
                expect(typeof megan.belt).toBe("object")
            })
            test('should have a belt property that has 6 pokeballs', () => {  
                //Arrange
                const megan = new Trainer("megan")
                const pokeball1 = new Pokeball
                const pokeball2 = new Pokeball
                const pokeball3 = new Pokeball
                const pokeball4 = new Pokeball
                const pokeball5 = new Pokeball
                const pokeball6 = new Pokeball
                const testBelt = {
                    1: pokeball1,
                    2: pokeball2,
                    3: pokeball3,
                    4: pokeball4,
                    5: pokeball5,
                    6: pokeball6
                }
                //Assert
                expect(megan.belt).toEqual(testBelt)
            })
        })
        describe('Trainer methods', () => {
            test('should have a catch method that takes a pokemon as an argument', () => {  
                //Arrange
                const megan = new Trainer("megan")
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon(name, hitPoints, attackDamage, move); 
                //Assert
                expect(megan.catch).toThrow(new Error("catch needs a pokemon as an argument"))
            })
            test('should have a catch method that takes a pokemon as an argument and uses an empty pokeball to catch the pokemon', () => {  
                //Arrange
                const megan = new Trainer("megan")
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu1 = new Pokemon(name, hitPoints, attackDamage, move); 
                const pikachu2 = new Pokemon(name, 90, attackDamage, move);
                //Act
                megan.catch(pikachu1)
                //Assert
                expect(megan.belt[1].storedPokemon).toEqual(pikachu1)
                 //Act
                 megan.catch(pikachu2)
                 //Assert
                 expect(megan.belt[2].storedPokemon).toEqual(pikachu2)
            })
            test('should have a catch method that informs the user, when they try to catch another pokemon, that all the pokeballs are full', () => {  
                //Arrange
                const megan = new Trainer("megan")
                const name = 'Pikachu'
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu1 = new Pokemon(name, hitPoints, attackDamage, move); 
                const pikachu2 = new Pokemon(name, 90, attackDamage, move);
                const pikachu3 = new Pokemon(name, 80, attackDamage, move);
                const pikachu4 = new Pokemon(name, 70, attackDamage, move);
                const pikachu5 = new Pokemon(name, 60, attackDamage, move);
                const pikachu6 = new Pokemon(name, 50, attackDamage, move);
                const pikachu7 = new Pokemon(name, 40, attackDamage, move);
                const consoleSpy = jest.spyOn(console, 'log');
                //Act
                megan.catch(pikachu1)
                megan.catch(pikachu2)
                megan.catch(pikachu3)
                megan.catch(pikachu4)
                megan.catch(pikachu5)
                megan.catch(pikachu6)
                megan.catch(pikachu7)
                //Assert
                expect(consoleSpy).toHaveBeenCalledWith("Oops! All your pokeballs are full!")
                consoleSpy.mockRestore();
            })
            test('should have a get pokemon method that takes a name of a pokemon currently stored in one of the pokeballs and returns that pokemon', () => {  
                //Arrange
                const megan = new Trainer("megan")
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon("Pikachu", hitPoints, attackDamage, move); 
                const charmander = new Charmander("Charmander", 90, attackDamage);
                const squirtle = new Squirtle("Squirtle", 80, attackDamage);
                const bulbasaur = new Bulbasaur("Bulbasaur", 70, attackDamage);
                const rattatta = new Rattatta("Rattatta", 60, attackDamage, "Scratch");
                const pidgey = new Pokemon("Pidgey", 50, attackDamage);
                megan.catch(pikachu)
                megan.catch(charmander)
                megan.catch(squirtle)
                megan.catch(bulbasaur)
                megan.catch(rattatta)
                megan.catch(pidgey)
                //Act
                //Assert
                expect(megan.getPokemon('Bulbasaur')).toEqual(bulbasaur)
            });
            test('should have a get pokemon method that takes a name of a pokemon currently stored in one of the pokeballs. If the pokemon is not present, then a message is logged to the user letting them know', () => {  
                //Arrange
                const megan = new Trainer("megan")
                const hitPoints = 100;
                const attackDamage = 50;
                const move = 'Thunderbolt'
                const pikachu = new Pokemon("Pikachu", hitPoints, attackDamage, move); 
                const charmander = new Charmander("Charmander", 90, attackDamage);
                const squirtle = new Squirtle("Squirtle", 80, attackDamage);
                const bulbasaur = new Bulbasaur("Bulbasaur", 70, attackDamage);
                const rattatta = new Rattatta("Rattatta", 60, attackDamage, "Scratch");
                const pidgey = new Pokemon("Pidgey", 50, attackDamage);
                const consoleSpy = jest.spyOn(console, 'log');
                megan.catch(pikachu)
                megan.catch(charmander)
                megan.catch(squirtle)
                megan.catch(bulbasaur)
                megan.catch(rattatta)
                megan.catch(pidgey)
                //Act
                megan.getPokemon('Gengar')
                //Assert
                expect(consoleSpy).toHaveBeenCalledWith('Oops! You don\'t have that pokemon!');
                consoleSpy.mockRestore();
            });
        });
    });
    describe('Battle constructor', () => {
        test('should take two trainers, and store them as properties', () => {  
            //Arrange
            const megan = new Trainer("Megan");
            const ash = new Trainer("Ash");
            const charmander = new Charmander('Charmander', 90, 35); 
            const squirtle = new Squirtle('Squirtle', 100, 25);
            const pikachu = new Pokemon("Pikachu", 75, 40, 'Thunderbolt'); 
            const bulbasaur = new Bulbasaur("Bulbasaur", 110, 30);
            const rattatta = new Rattatta("Rattatta", 60, 15, "Scratch");
            const pidgey = new Pokemon("Pidgey", 80, 25);

            megan.catch(charmander);
            megan.catch(bulbasaur);
            megan.catch(rattatta);

            ash.catch(squirtle);
            ash.catch(pikachu);
            ash.catch(pidgey);

            const testBattle = new Battle(megan, megan.belt[1].storedPokemon.name, ash, ash.belt[1].storedPokemon.name)
            //Assert
            expect(testBattle.trainerOne).toEqual(megan);
            expect(testBattle.trainerTwo).toEqual(ash);
            expect(testBattle.trainerOneFirstPokemon).toBe('Charmander');
            expect(testBattle.trainerTwoFirstPokemon).toBe('Squirtle');
        });
        test('should be able to change pokemon mid battle, with any pokemon currently in the trainer\'s belt. This will end that trainers turn', () => {  
            //Arrange
            const megan = new Trainer("Megan");
            const ash = new Trainer("Ash");
            const charmander = new Charmander('Charmander', 90, 35); 
            const squirtle = new Squirtle('Squirtle', 100, 25);
            const pikachu = new Pokemon("Pikachu", 75, 40, 'Thunderbolt'); 
            const bulbasaur = new Bulbasaur("Bulbasaur", 110, 30);
            const rattatta = new Rattatta("Rattatta", 60, 15, "Scratch");
            const pidgey = new Pokemon("Pidgey", 80, 25);

            megan.catch(charmander);
            megan.catch(bulbasaur);
            megan.catch(rattatta);

            ash.catch(squirtle);
            ash.catch(pikachu);
            ash.catch(pidgey);

            const testBattle = new Battle(megan, megan.belt[1].storedPokemon.name, ash, ash.belt[1].storedPokemon.name)
            //Assert
            expect(testBattle.trainerOnePokemon).toBe('Charmander');
            //Act
            if(testBattle.turnOfPokemon === 'Charmander') {
                testBattle.changePokemon('Bulbasaur')
                expect(testBattle.trainerOnePokemon).toBe('Bulbasaur');
                expect(testBattle.turnOfPokemon).not.toBe('Bulbasaur');
            } else {
                testBattle.changePokemon('Pikachu');
                expect(testBattle.trainerTwoPokemon).toBe('Pikachu');
                expect(testBattle.turnOfPokemon).not.toBe('Pikachu');
            }
            //Assert
        });
        describe('Fight Method', () => {
            test('should have a Fight method that uses a random pokemon for the first turn, then switches pokemon each time it is called', () => {  
                //Arrange
                const megan = new Trainer("Megan");
                const ash = new Trainer("Ash");
                const charmander = new Charmander('Charmander', 110, 30); 
                const squirtle = new Squirtle('Squirtle', 90, 25);
                megan.catch(charmander);
                ash.catch(squirtle);
                const testBattle = new Battle(megan, megan.belt[1].storedPokemon.name, ash, ash.belt[1].storedPokemon.name);
                //Act
                const firstTurnPokemon = testBattle.turnOfPokemon;
                testBattle.fight();
                //Assert
                expect(testBattle.turnOfPokemon).not.toBe(firstTurnPokemon)
                //Act
                testBattle.fight();
                //Assert
                expect(testBattle.turnOfPokemon).toBe(firstTurnPokemon)
            });
            test('when called, the pokemon who\'s turn it is should attack the defending pokemon, logging an attack message, which will vary depending on the defender\'s weakness/strength', () => {  
                //Arrange
                const megan = new Trainer("Megan");
                const ash = new Trainer("Ash");
                const charmander = new Charmander('Charmander', 100, 30); 
                const squirtle = new Squirtle('Squirtle', 90, 25);

                megan.catch(charmander);

                ash.catch(squirtle);

                const testBattle = new Battle(megan, megan.belt[1].storedPokemon.name, ash, ash.belt[1].storedPokemon.name);
                const consoleSpy = jest.spyOn(console, 'log');
                //Act
                testBattle.fight();
                testBattle.fight();
                //Assert
                expect(consoleSpy).toHaveBeenCalledWith('Megan\'s Charmander used Ember on Ash\'s Squirtle! It was not very effective!');
                expect(consoleSpy).toHaveBeenCalledWith('Ash\'s Squirtle used Bubble on Megan\'s Charmander! It was super effective!');
                consoleSpy.mockRestore();
            });
            test('when called, the pokemon who\'s turn it is should attack the defending pokemon, reducing their hitPoints by the amount of their attack damage, taking into account their strengths and weaknessess', () => {  
                //Arrange
                const megan = new Trainer("Megan");
                const ash = new Trainer("Ash");
                const charmander = new Charmander('Charmander', 100, 30); 
                const squirtle = new Squirtle('Squirtle', 90, 25);

                megan.catch(charmander);

                ash.catch(squirtle);

                const testBattle = new Battle(megan, megan.belt[1].storedPokemon.name, ash, ash.belt[1].storedPokemon.name);
                //Act
                testBattle.fight();
                testBattle.fight();
                //Assert
                try {
                    expect(charmander.hitPoints).toBe(81);
                }
                catch {
                    expect(charmander.hitPoints).toBe(44);
                }
            });
            test('If a pokemons hitPoints are reduced to zero, they faint', () => {  
                //Arrange
                const megan = new Trainer("Megan");
                const ash = new Trainer("Ash");
                const charmander = new Charmander('Charmander', 60, 30); 
                const squirtle = new Squirtle('Squirtle', 90, 25);
                const consoleSpy = jest.spyOn(console, 'log');

                megan.catch(charmander);

                ash.catch(squirtle);

                const testBattle = new Battle(megan, megan.belt[1].storedPokemon.name, ash, ash.belt[1].storedPokemon.name);
                //Act
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                //Assert
                expect(charmander.hasFainted()).toBe(true);
            });
            test('Should have a "critical hit" that randomly awards triple damage to the attacking pokemon', () => {  
                //Arrange
                const megan = new Trainer("Megan");
                const ash = new Trainer("Ash");
                const charmander = new Charmander('Charmander', 80, 30); 
                const squirtle = new Squirtle('Squirtle', 90, 25);
                const consoleSpy = jest.spyOn(console, 'log');

                megan.catch(charmander);

                ash.catch(squirtle);

                const testBattle = new Battle(megan, megan.belt[1].storedPokemon.name, ash, ash.belt[1].storedPokemon.name);
                //Act
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                //Assert
                expect(consoleSpy).toHaveBeenCalledWith('Critical hit!');
            });
            test('When a pokemon faints, the next available pokemon should be automatically selected', () => {  
                //Arrange
                const megan = new Trainer("Megan");
                const ash = new Trainer("Ash");
                const charmander = new Charmander('Charmander', 10, 35); 
                const squirtle = new Squirtle('Squirtle', 110, 25);
                const pikachu = new Pokemon("Pikachu", 75, 40, 'Thunderbolt'); 
                const bulbasaur = new Bulbasaur("Bulbasaur", 100, 30);
                const rattatta = new Rattatta("Rattatta", 60, 15, "Scratch");
                const pidgey = new Pokemon("Pidgey", 80, 25);

                megan.catch(charmander);
                megan.catch(bulbasaur);
                megan.catch(rattatta);

                ash.catch(squirtle);
                ash.catch(pikachu);
                ash.catch(pidgey);

                const testBattle = new Battle(megan, megan.belt[1].storedPokemon.name, ash, ash.belt[1].storedPokemon.name);
                //Act
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                testBattle.fight();
                //Assert
                expect(testBattle.trainerOnePokemon).not.toBe('Charmander');
            });
        });    
    });
});
