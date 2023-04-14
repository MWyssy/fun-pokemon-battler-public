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
        if(this.hitPoints === 0) return true;
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
    Pokeball
};