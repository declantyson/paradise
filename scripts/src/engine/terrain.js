/*
 *
 *  Paradise/Terrain
 *  Declan Tyson
 *  v0.0.38
 *  12/02/2018
 *
 */

import { colours } from '../constants';

class Terrain {
    constructor(neighbours, spriteFolder = '/oob') {
        this.encounters = [];
        this.image = false;
        this.spriteFolder = spriteFolder;
        this.fallbackImage = `${this.spriteFolder}/fallback.png`;
        this.neighbours = neighbours;

        this.pickImage(neighbours);
    }

    isPassable() {
        return this.passable;
    }

    hasEncounters() {
        return this.encounters;
    }

    pickImage(neighbours) {
        if(!neighbours || this.spriteFolder === '/oob') return;

        let filename = '';
        Object.keys(neighbours).forEach((neighbourKey) => {
            if(filename !== '') filename += '_';
            filename += `${neighbourKey}_${neighbours[neighbourKey]}`;
        });
        filename = filename.toLowerCase();
        this.image = `${this.spriteFolder}/${filename}.png`;
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
        super(neighbours, '/oob/Grass');
        this.id = 'Grass';
        this.passable = true;
        this.colour = colours.green;
    }
}

class Water extends Terrain {
    constructor(neighbours) {
        super(neighbours, '/oob/Water');
        this.id = 'Water';
        this.passable = false;
        this.colour = colours.blue;
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
