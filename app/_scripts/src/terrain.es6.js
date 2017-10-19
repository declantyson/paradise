/*
 *
 *  XL RPG/Terrain
 *  XL Gaming/Declan Tyson
 *  v0.0.1
 *  21/12/2016
 *
 */

import { colours } from './constants';

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

window.terrains = { Blank, Grass, Water };