/*
 *
 *  XL RPG/Terrain
 *  XL Gaming/Declan Tyson
 *  v0.0.11
 *  13/11/2017
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

class Road extends Terrain {
    constructor() {
        super();
        this.passable = true;
        this.colour = colours.grey;
    }
}

class Inhabitance extends Terrain {
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

window.terrains = { Blank, Grass, Water, Road, Inhabitance, Doorway };
