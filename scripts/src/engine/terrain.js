/*
 *
 *  XL RPG/Terrain
 *  XL Gaming/Declan Tyson
 *  v0.0.29
 *  08/02/2018
 *
 */

import { colours } from '../constants';

class Terrain {
    constructor(neighbours) {
        this.encounters = [];
        this.image = false;
        this.neighbours = neighbours;
    }

    isPassable() {
        return this.passable;
    }

    hasEncounters() {
        return this.encounters;
    }
}

class Blank extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Blank';
        this.passable = false;
        this.colour = colours.black;
    }
}

class Grass extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Grass';
        this.passable = true;
        this.colour = colours.green;
        this.image = '/img/grass.png';

        this.pickImage(this.neighbours);
    }

    pickImage(neighbours) {
        let image = this.image;

        if(!neighbours) return;

        /*
         * THIS FUNCTION CAN BE IMPROVED DRAMATICALLY
         * Long term solution - loop through neighbours and do something like grass_north_water_west_water_east_grass_south_water.png
         * Will have lots of images but that's OK
         */

        if(neighbours.east === 'Water') {
            image = '/img/coast_e.png';
            if(neighbours.north === 'Water') {
                image = '/img/coast_ne.png';
            } else if(neighbours.south === 'Water') {
                image = '/img/coast_se.png';
            }
        } else if(neighbours.west === 'Water') {
            image = '/img/coast_w.png';
            if(neighbours.north === 'Water') {
                image = '/img/coast_nw.png';
            } else if(neighbours.south === 'Water') {
                image = '/img/coast_sw.png';
            }
        } else if(neighbours.north === 'Water') {
            image = '/img/coast_n.png';
        } else if(neighbours.south === 'Water') {
            image = '/img/coast_s.png';
        }

        this.image = image;
    }
}

class Water extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Water';
        this.passable = false;
        this.colour = colours.blue;
        this.image = '/img/water.png';
    }
}

class Road extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Road';
        this.passable = true;
        this.colour = colours.grey;
    }
}

class Wall extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Wall';
        this.passable = false;
        this.colour = colours.brown;
    }
}

class Doorway extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Doorway';
        this.passable = true;
        this.colour = colours.darkbrown;
    }
}

class WoodenFloor extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'WoodenFloor';
        this.passable = true;
        this.colour = colours.darkbrown;
    }
}

export { Blank, Grass, Water, Road, Wall, Doorway, WoodenFloor };
