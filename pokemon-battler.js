class Pokemon {
    constructor(name) {
        this.name = name;
        this.hitPoints = 50;
        this.attackDamage = 20;
        this.move = 'tackle';
    };
    takeDamage(damage) {
        return this.hitPoints -= damage
    }
    useMove() {
        console.log(`${this.name} used ${this.name}'s move`)
        return this.attackDamage
    }

    hasFainted() {
        if(this.hitPoints === 0) return true;
        return false;
        
    }
};


module.exports = Pokemon;