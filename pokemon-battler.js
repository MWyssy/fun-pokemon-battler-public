/*
const inquirer = require('inquirer');

const firstQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        default: 'Ash',
    },
    {
        type: 'list',
        name: 'pokemon',
        message: 'Which pokemon do you choose?',
        choices: ['Charmander', 'Squirtle', 'Bulbasaur']
    },
    {
        type: 'input',
        name: 'opponentName',
        message: 'What is your opponents name?',
        default: 'Megan',
    },
    {
        type: 'list',
        name: 'opponentPokemon',
        message: 'Which pokemon does your opponent choose?',
        choices: ['Charmander', 'Squirtle', 'Bulbasaur']
    }
];

function playGame() {
    inquirer
        .prompt(firstQuestions)
        .then(function (firstAnswers) {
            console.log(firstAnswers);
            const player = new Trainer(firstAnswers.name);
            let playerPokemon = {};
            if (firstAnswers.pokemon === 'Squirtle') {
                playerPokemon = new Squirtle('Squirtle', 100, 25);
            } else if (firstAnswers.pokemon === 'Charmander') {
                playerPokemon = new Charmander('Charmander', 90, 35);
            } else if (firstAnswers.pokemon === 'Bulbasaur') {
                playerPokemon = new Bulbasaur('Bulbasaur', 110, 30);
            };
            player.catch(playerPokemon);
            const opponent = new Trainer(firstAnswers.opponentName)
            let opponentPokemon = {};
            if (firstAnswers.opponentPokemon === 'Squirtle') {
                opponentPokemon = new Squirtle('Squirtle', 100, 25);
            } else if (firstAnswers.opponentPokemon === 'Charmander') {
                opponentPokemon = new Charmander('Charmander', 90, 35);
            } else if (firstAnswers.opponentPokemon === 'Bulbasaur') {
                opponentPokemon = new Bulbasaur('Bulbasaur', 110, 30);
            };
            opponent.catch(opponentPokemon);
            const battle = new Battle(player, playerPokemon.name, opponent, opponentPokemon.name);
            while (!battle.fightIsOver) {
                console.log(`Your ${playerPokemon.name}'s health is ${playerPokemon.hitPoints}!`);
                console.log(`${opponent.name}'s ${opponentPokemon.name}'s health is ${opponentPokemon.hitPoints}!`);
                battle.fight();
            };
            return 
        });
        
};

playGame();
*/

//Moves
class Move {
    constructor(moveName, damage, pp) {
        this.moveName = moveName,
        this.damage = damage,
        this.pp = pp
    };
};

//Normal Moves
const tackle = new Move('Tackle', 15, 10);
const scratch = new Move('Scratch', 15, 10);
const quickattack = new Move('Quick Attack', 10, 15);
const bite = new Move('Bite', 30, 5);
const headbutt = new Move('Headbutt', 40, 2);
const gust = new Move('Gust', 25, 10);
const wingattack = new Move('Wing Attack', 40, 5);
//Water Moves
const watergun = new Move('Water Gun', 25, 5);
const bubble = new Move('Bubble', 15, 10);
const hydropump = new Move('Hydro Pump', 45, 2);
//Fire Moves
const ember = new Move('Ember', 15, 10);
const flamethrower = new Move('Flamethrower', 35, 5);
const fireblast = new Move('Fireblast', 55, 2);
//Grass Moves
const vinewhip = new Move('Vine Whip', 15, 10);
const razorleaf = new Move('Razor Leaf', 30, 5);
const sunbeam = new Move('Sun Beam', 50, 2);
//Electric Moves
const thunderbolt = new Move('Thunderbolt', 40, 5);
const thundershock = new Move('Thundershock', 25, 10);
const thunder = new Move('Thunder', 60, 2);
//Struggle
const struggle = new Move('Struggle' )

const allMoves = [
    tackle,
    scratch,
    quickattack,
    bite,
    headbutt,
    gust,
    wingattack,
    watergun,
    bubble,
    hydropump,
    ember,
    flamethrower,
    fireblast,
    vinewhip,
    razorleaf,
    sunbeam,
    thunderbolt,
    thundershock,
    thunder,
    struggle
]


class Pokemon {
    constructor(name, hitPoints, attackDamage, move1 = 'Tackle', move2 = '', move3 = '', move4 = '') {
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackDamage = attackDamage;
        this.moves = [
            move1,
            move2,
            move3,
            move4
        ];
    };
    
    takeDamage(damage) {
        return this.hitPoints -= damage
    }
    
    assignMoves() {
        for (let a = 0; a < this.moves.length; a++) {
            for (let b = 0; b < allMoves.length; b++) {
                if (this.moves[a] === allMoves[b].moveName) {
                    this.moves[a] = allMoves[b];
                };
            };
        };
    };

    useMove(move) {
        for (let i = 0; i < this.moves.length; i++) {
            if (move === this.moves[i].moveName) {
                console.log(`${this.name} used ${move}`);
                this.moves[i].pp--;
                return this.moves[i].damage;
            };
        };
    }
    
    hasFainted() {
        if(this.hitPoints <= 0) return true;
        return false; 
    }
};

class FirePokemon extends Pokemon {
    constructor(name, hitPoints, attackDamage, move1, move2, move3, move4) {
        super(name, hitPoints, attackDamage, move1, move2, move3, move4);
    };
    
    isEffectiveAgainst(pokemon) {
        if (pokemon instanceof GrassPokemon) return true;
        return false;
    };
    
    isWeakTo(pokemon) {
        if (pokemon instanceof WaterPokemon) return true;
        return false;
    };

};

class WaterPokemon extends Pokemon {
    constructor(name, hitPoints, attackDamage, move1, move2, move3, move4) {
        super(name, hitPoints, attackDamage, move1, move2, move3, move4);
    };

    isEffectiveAgainst(pokemon) {
        if (pokemon instanceof FirePokemon) return true
        return false;
    };

    isWeakTo(pokemon) {
        if (pokemon instanceof GrassPokemon) return true;
        return false;
    };

};

class GrassPokemon extends Pokemon {
    constructor(name, hitPoints, attackDamage, move1, move2, move3, move4) {
        super(name, hitPoints, attackDamage, move1, move2, move3, move4);
    };

    isEffectiveAgainst(pokemon) {
        if (pokemon instanceof WaterPokemon) return true
        return false;
    };

    isWeakTo(pokemon) {
        if (pokemon instanceof FirePokemon) return true;
        return false;
    };

};

class NormalPokemon extends Pokemon {
    constructor(name, hitPoints, attackDamage, move1, move2, move3, move4) {
        super(name, hitPoints, attackDamage, move1, move2, move3, move4);
    };
    isEffectiveAgainst(pokemon) {
        return false;
    };

    isWeakTo(pokemon) {
        return false;
    };
};

class Charmander extends FirePokemon {
    constructor(name, hitPoints, attackDamage, move2, move3, move4) {
        super(name, hitPoints, attackDamage, "Ember", move2, move3, move4)
    }
};

class Squirtle extends WaterPokemon {
    constructor(name, hitPoints, attackDamage, move2, move3, move4) {
        super(name, hitPoints, attackDamage, "Bubble", move2, move3, move4)
    }
};

class Bulbasaur extends GrassPokemon {
    constructor(name, hitPoints, attackDamage, move2, move3, move4) {
        super(name, hitPoints, attackDamage, "Vine Whip", move2, move3, move4)
    }
};

class Rattatta extends NormalPokemon {
    constructor(name, hitPoints, attackDamage, move2, move3, move4) {
        super(name, hitPoints, attackDamage, 'Scratch', move2, move3, move4)
    }
};

class Pokeball {
    #storage;                                                                                            
    constructor() {
        this.#storage = {};
    };

    get storedPokemon() {
        return this.#storage;
    };

    throw(pokemon) {
        if (!pokemon && !this.isEmpty()) {
            console.log(`GO ${this.#storage.name}!!`)
            return this.#storage;
        } else if (!pokemon && this.isEmpty()) {
            return console.log('Oh No! Your pokeball is empty!!');
        };

        if (!this.isEmpty()) {
            return console.log(`You can't catch this ${pokemon.name}, you already have a ${this.#storage.name} in your pokeball!`);
        };
        console.log(`you caught ${pokemon.name}!`);
        pokemon.assignMoves();
        return this.#storage = pokemon;    
    };

    isEmpty() {
        if (Object.keys(this.#storage).length === 0) return true;
        return false
    };

    contains() {
        if (this.isEmpty()) {
            return 'empty...'
        };
        return `${this.#storage.name}`;
    };

};

class Trainer {
    #name
    #belt
    constructor(name) {
        this.#name = name;
        this.#belt = {};
        this.#belt[1] = new Pokeball;
        this.#belt[2] = new Pokeball;
        this.#belt[3] = new Pokeball;
        this.#belt[4] = new Pokeball;
        this.#belt[5] = new Pokeball;
        this.#belt[6] = new Pokeball;
    };

    get belt() {
        return this.#belt;
    };

    get name() {
        return this.#name;
    };

    catch(pokemon) {
        if(!pokemon) {
            throw new Error("catch needs a pokemon as an argument");
        };

        for(let i = 1; i < 7; i++) {
            if(this.#belt[i].isEmpty()) {
                return this.#belt[i].throw(pokemon);
            };
        };
        return console.log("Oops! All your pokeballs are full!");
    };

    getPokemon(pokemon) {
        for(let i = 1; i < 7; i++) {
            if(this.belt[i].storedPokemon.name === pokemon) {
                return this.#belt[i].throw();
            };
        };
        return console.log('Oops! You don\'t have that pokemon!')
    };

};

class Battle {
    #trainerOne;
    #trainerTwo;
    #trainerOneFirstPokemon;
    #trainerTwoFirstPokemon;
    #trainerOnePokemon;
    #trainerTwoPokemon;

    constructor(trainerOne, trainerOneFirstPokemon, trainerTwo, trainerTwoFirstPokemon) {
        this.#trainerOne = trainerOne;
        this.#trainerTwo = trainerTwo;
        this.#trainerOneFirstPokemon = trainerOneFirstPokemon;
        this.#trainerTwoFirstPokemon = trainerTwoFirstPokemon;
        this.#trainerOnePokemon = trainerOneFirstPokemon;
        this.#trainerTwoPokemon = trainerTwoFirstPokemon;
        this.turnOfPokemon = this.firstTurnGenerator();
        this.fightIsOver = false;
    };

    get trainerOne() {
        return this.#trainerOne;
    };
    get trainerTwo() {
        return this.#trainerTwo;
    };
    get trainerOneFirstPokemon() {
        return this.#trainerOneFirstPokemon;
    };
    get trainerTwoFirstPokemon() {
        return this.#trainerTwoFirstPokemon;
    };
    get trainerOnePokemon() {
        return this.#trainerOnePokemon;
    };
    get trainerTwoPokemon() {
        return this.#trainerTwoPokemon;
    };

    firstTurnGenerator() {
        function randomise(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        const firstTurnRandomiser = randomise(1, 2);
        let firstTurnPokemon = this.#trainerOneFirstPokemon;
        if (firstTurnRandomiser === 2) {
            firstTurnPokemon = this.#trainerTwoFirstPokemon;
        };
        return firstTurnPokemon;
    };

    //Change Pokemon function
    changePokemon(pokemon) {
        if (this.turnOfPokemon === this.#trainerOnePokemon) {
            this.#trainerOnePokemon = (this.#trainerOne.getPokemon(pokemon)).name;
            this.turnOfPokemon = this.#trainerTwoPokemon;
        } else {
            this.#trainerTwoPokemon = (this.#trainerTwo.getPokemon(pokemon)).name;
            this.turnOfPokemon = this.#trainerOnePokemon;
        };
    };


    fight(chosenMove) {
        //Declaring Variables
        let attackingTrainer = this.#trainerOne;
        let attackingPokemon = this.#trainerOne.getPokemon(this.#trainerOnePokemon);
        let defendingTrainer = this.#trainerTwo;
        let defendingPokemon = this.#trainerTwo.getPokemon(this.#trainerTwoPokemon);
        let critcalHit = false;
        if (this.#trainerTwoPokemon === this.turnOfPokemon) {
            attackingTrainer = this.#trainerTwo;
            attackingPokemon = this.#trainerTwo.getPokemon(this.#trainerTwoPokemon);
            defendingTrainer = this.#trainerOne;
            defendingPokemon = this.#trainerOne.getPokemon(this.#trainerOnePokemon);
        };

        //criticalHit Logic
        function criticalHitChance() {
            function randomise(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            const criticalChance = randomise(1, 3);
            if(criticalChance === 3) {
                return critcalHit = true;
            };
        };

        //Attack phase
        if (!chosenMove) {
            chosenMove = attackingPokemon.moves[0].moveName;
        };

        for (let a = 0; a < attackingPokemon.moves.length; a++) {
            console.log('test: ', attackingPokemon.moves[a].pp)
            if (attackingPokemon.moves[a].moveName === chosenMove && attackingPokemon.moves[a].pp < 1) {
                for (let b = 0; b < attackingPokemon.moves.length; b++) {
                    if (attackingPokemon.moves[b].pp > 1) {
                        chosenMove = 'Struggle';
                        return console.log('Oh No! You are out of moves!') 
                    };
                };
                return console.log(`${chosenMove} has no power points left, you can\'t use it! Pick another.`);
            }
        }

        // attackingPokemon.moves.map((move, index, movesArray) => {
        //     if (move.moveName === chosenMove && move.pp < 1) {
        //         movesArray.map((move) => {
        //             if (move.pp > 1) {
        //                 return console.log(`${chosenMove} has no power points left, you can\'t use it! Pick another.`);
        //             };
        //         });
        //         };
        //         chosenMove = 'Struggle';
        //         return console.log('Oh No! You are out of moves!')
        //     });

        let damage = attackingPokemon.useMove(chosenMove);
        let effectivenessMessage = '';
        criticalHitChance();
        if (attackingPokemon.isEffectiveAgainst(defendingPokemon)) {
            effectivenessMessage = 'It was super effective!';
            damage *= 1.25;
        };
        if (attackingPokemon.isWeakTo(defendingPokemon)) {
            effectivenessMessage = 'It was not very effective!';
            damage *= 0.75;
        };
        if (critcalHit) {
            damage *= 3;
            console.log('Critical hit!')
            critcalHit = false;
        };
        defendingPokemon.hitPoints = Math.round(defendingPokemon.hitPoints - damage);

        //Check to see if Pokemon has fainted
        if (defendingPokemon.hasFainted()) {
            for (let i = 1; i < 7; i++) {
                if (!defendingTrainer.belt[i].isEmpty() && defendingTrainer.belt[i].storedPokemon.hitPoints > 0) {
                    this.turnOfPokemon = defendingPokemon.name;
                    console.log(`${attackingTrainer.name}'s ${attackingPokemon.name} used ${attackingPokemon.moves[0].moveName} on ${defendingTrainer.name}'s ${defendingPokemon.name}! ${effectivenessMessage}`);
                    console.log(`${defendingPokemon.name} has fainted! Return ${defendingPokemon.name}.`);
                    return this.changePokemon(defendingTrainer.belt[i].storedPokemon.name);                
                }; 
            };
            //Check to see if there is a winner
                this.fightIsOver = true;
                return console.log(`${attackingTrainer.name} wins!`);
        };

       

        //Switch pokemon's turn
        this.turnOfPokemon = defendingPokemon.name;


        return console.log(`${attackingTrainer.name}'s ${attackingPokemon.name} used ${attackingPokemon.moves[0].moveName} on ${defendingTrainer.name}'s ${defendingPokemon.name}! ${effectivenessMessage}`);
    };
};

module.exports = {
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
};