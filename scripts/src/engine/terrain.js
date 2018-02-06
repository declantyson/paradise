/*
 *
 *  XL RPG/Terrain
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

import { colours } from '../constants';

class Terrain {
    constructor() {
        this.encounters = [];
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
        this.passable = true;
        this.colour = colours.green;
    }
}

class Water extends Terrain {
    constructor() {
        super();
        this.passable = false;
        this.colour = colours.blue;
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
