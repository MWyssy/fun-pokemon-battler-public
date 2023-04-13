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
        super(name, hitPoints, attackDamage, move = 'tackle');
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
        super(name, hitPoints, attackDamage, move = 'tackle');
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
        super(name, hitPoints, attackDamage, move = 'tackle');
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
        super(name, hitPoints, attackDamage, move = 'tackle');
    };
    isEffectiveAgainst(pokemon) {
        return false;
    };

    isWeakTo(pokemon) {
        return false;
    };
};


module.exports = {
    Pokemon,
    FirePokemon,
    WaterPokemon,
    GrassPokemon,
    NormalPokemon
};