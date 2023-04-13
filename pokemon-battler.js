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
        console.log(`${this.name} used ${this.name}'s ${this.move}`)
        return this.attackDamage
    }

    hasFainted() {
        if(this.hitPoints === 0) return true;
        return false;
        
    }
};


module.exports = {
    Pokemon
};