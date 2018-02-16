/*
 *
 *  Paradise/Terrain
 *  Declan Tyson
 *  v0.0.54
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

class VerticalRoad extends Terrain {
    constructor(neighbours) {
        super(neighbours, '/oob/VerticalRoad');
        this.id = 'VerticalRoad';
        this.passable = true;
        this.colour = colours.grey;
    }
}

class HorizontalRoad extends Terrain {
    constructor(neighbours) {
        super(neighbours, '/oob/HorizontalRoad');
        this.id = 'HorizontalRoad';
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

class CoastalSands extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'CoastalSands';
        this.passable = true;
        this.colour = colours.gold;
    }
}

export { Blank, Grass, Water, VerticalRoad, HorizontalRoad, Wall, Doorway, WoodenFloor, CoastalSands };
