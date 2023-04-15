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
                battle.fight();
                console.log(`Your ${playerPokemon.name}'s health is ${playerPokemon.hitPoints}!`);
                console.log(`${opponent.name}'s ${opponentPokemon.name}'s health is ${opponentPokemon.hitPoints}!`);
            };
            return 
        });
        
};

playGame();

class Pokemon {
    constructor(name, hitPoints, attackDamage, move = 'tackle') {
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackDamage = attackDamage;
        this.move = move;
    };

    takeDamage(damage) {
        return this.hitPoints -= damage
    }

    useMove() {
        console.log(`${this.name} used ${this.move}`)
        return this.attackDamage
    }

    hasFainted() {
        if(this.hitPoints <= 0) return true;
        return false; 
    }
};

class FirePokemon extends Pokemon {
    constructor(name, hitPoints, attackDamage, move) {
        super(name, hitPoints, attackDamage, move);
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
    constructor(name, hitPoints, attackDamage, move) {
        super(name, hitPoints, attackDamage, move);
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
    constructor(name, hitPoints, attackDamage, move) {
        super(name, hitPoints, attackDamage, move);
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
    constructor(name, hitPoints, attackDamage, move) {
        super(name, hitPoints, attackDamage, move);
    };
    isEffectiveAgainst(pokemon) {
        return false;
    };

    isWeakTo(pokemon) {
        return false;
    };
};

class Charmander extends FirePokemon {
    constructor(name, hitPoints, attackDamage, move) {
        super(name, hitPoints, attackDamage, "ember")
    }
};

class Squirtle extends WaterPokemon {
    constructor(name, hitPoints, attackDamage, move) {
        super(name, hitPoints, attackDamage, "water gun")
    }
};

class Bulbasaur extends GrassPokemon {
    constructor(name, hitPoints, attackDamage, move) {
        super(name, hitPoints, attackDamage, "vine whip")
    }
};

class Rattatta extends NormalPokemon {
    constructor(name, hitPoints, attackDamage, move) {
        super(name, hitPoints, attackDamage, move)
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
        console.log(`you caught ${pokemon.name}!`)
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
    #trainerOnePokemon;
    #trainerTwoPokemon;
    constructor(trainerOne, trainerOnePokemon, trainerTwo, trainerTwoPokemon) {
        this.#trainerOne = trainerOne;
        this.#trainerTwo = trainerTwo;
        this.#trainerOnePokemon = trainerOnePokemon;
        this.#trainerTwoPokemon = trainerTwoPokemon;
        this.turnOfPokemon = this.firstTurnGenerator();
        this.fightIsOver = false;
    };

    get trainerOne() {
        return this.#trainerOne;
    };
    get trainerTwo() {
        return this.#trainerTwo;
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
        let firstTurnPokemon = this.#trainerOnePokemon;
        if (firstTurnRandomiser === 2) {
            firstTurnPokemon = this.#trainerTwoPokemon;
        };
        return firstTurnPokemon;
    };

    fight() {
        //Declaring Variables
        let attackingTrainer = this.#trainerOne;
        let attackingPokemon = this.#trainerOne.getPokemon(this.#trainerOnePokemon);
        let defendingTrainer = this.#trainerTwo;
        let defendingPokemon = this.#trainerTwo.getPokemon(this.#trainerTwoPokemon);
        if (this.#trainerTwoPokemon === this.turnOfPokemon) {
            attackingTrainer = this.#trainerTwo;
            attackingPokemon = this.#trainerTwo.getPokemon(this.#trainerTwoPokemon);
            defendingTrainer = this.#trainerOne;
            defendingPokemon = this.#trainerOne.getPokemon(this.#trainerOnePokemon);
        };

        //Attack phase
        let damage = attackingPokemon.attackDamage;
        let effectivenessMessage = '';
        if (attackingPokemon.isEffectiveAgainst(defendingPokemon)) {
            effectivenessMessage = 'It was super effective!';
            damage *= 1.25;
        };
        if (attackingPokemon.isWeakTo(defendingPokemon)) {
            effectivenessMessage = 'It was not very effective!';
            damage *= 0.75;
        };
        defendingPokemon.hitPoints = Math.round(defendingPokemon.hitPoints - damage);

        //Check to see if there is a winner
        if (defendingPokemon.hasFainted()) {
            this.fightIsOver = true;
            return console.log(`${attackingTrainer.name}'s ${attackingPokemon.name} wins!`);
        };

        //Switch pokemon's turn
        this.turnOfPokemon = defendingPokemon.name;


        return console.log(`${attackingTrainer.name}'s ${attackingPokemon.name} used ${attackingPokemon.move} on ${defendingTrainer.name}'s ${defendingPokemon.name}! ${effectivenessMessage}`);
    };
};


module.exports = {
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