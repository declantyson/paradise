/*
 *
 *  Paradise/Party Member
 *  Declan Tyson
 *  v0.0.97
 *  06/05/2020
 *
 */

class PartyMember {
  constructor(name, health, baseAttack, baseDefence, baseSpeed, sprite) {
    this.id = name;
    this.name = name;
    this.health = health;
    this.attack = baseAttack;
    this.defence = baseDefence;
    this.speed = baseSpeed;

    this.experience = 0;
    this.level = 1;

    let image = new Image();
    image.src = sprite;
    this.sprite = image;
  }

  attack(target) {
    let attackValue = this.attack - target.defence;
    if (attackValue < 0) attackValue = 1;

    target.health -= attackValue;
  }
}

export { PartyMember };
