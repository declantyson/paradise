/*
 *
 *  XL RPG/Terrain
 *  XL Gaming/Declan Tyson
 *  v0.0.27
 *  07/02/2018
 *
 */

import { colours } from '../constants';

class Terrain {
    constructor() {
        this.encounters = [];
        this.image = false;
        this.neighbours = {};
    }

    isPassable() {
        return this.passable;
    }

    hasEncounters() {
        return this.encounters;
    }
}

class Blank extends Terrain {
    constructor() {
        super();
        this.passable = false;
        this.colour = colours.black;
    }
}

class Grass extends Terrain {
    constructor() {
        super();
        this.id = 'Grass';
        this.passable = true;
        this.colour = colours.green;
        this.image = '/img/grass.png';
    }
}

class Water extends Terrain {
    constructor() {
        super();
        this.id = 'Water';
        this.passable = false;
        this.colour = colours.blue;
        this.image = '/img/water.png';
    }
}

class Road extends Terrain {
    constructor() {
        super();
        this.passable = true;
        this.colour = colours.grey;
    }
}

class Wall extends Terrain {
    constructor() {
        super();
        this.passable = false;
        this.colour = colours.brown;
    }
}

class Doorway extends Terrain {
    constructor() {
        super();
        this.passable = true;
        this.colour = colours.darkbrown;
    }
}

class WoodenFloor extends Terrain {
    constructor() {
        super();
        this.passable = true;
        this.colour = colours.darkbrown;
    }
}

export { Blank, Grass, Water, Road, Wall, Doorway, WoodenFloor };
