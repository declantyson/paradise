/*
 *
 *  XL RPG/Enemy
 *  XL Gaming/Declan Tyson
 *  v0.0.8
 *  23/12/2016
 *
 */

class Enemy {
    constructor(name, baseHP, baseAttack, baseDefence, baseSpeed, variance) {
        this.name = name;

        this.HP = this.calculateStats(variance, baseHP);
        this.attack = this.calculateStats(variance, baseAttack);
        this.defence = this.calculateStats(variance, baseDefence);
        this.speed = this.calculateStats(variance, baseSpeed);

        console.log(this);
    }

    calculateStats(variance, baseValue) {
        let signum = 1,
            deviation = Math.random() * variance;

        if(Math.random() > 0.5) signum = -1;

        return baseValue + (deviation * signum);
    }
}

export { Enemy };