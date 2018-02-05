/*
 *
 *  XL RPG/Locales/Islands
 *  XL Gaming/Declan Tyson
 *  v0.0.15
 *  15/11/2017
 *
 */

import { Locale, Inhabitance } from "./baselocale";

class Islands extends Locale {
    constructor(player, people) {
        super(player, people);

        this.id = "Islands";
        this.entryPoints.beginningOfGame = { x: 56, y: 17 };
        this.entryPoints.groveStreet1 = { x: 55, y: 20 };
        this.entryPoints.groveStreet2 = { x: 58, y: 20 };
        this.entryPoints.groveStreet3 = { x: 55, y: 23 };
        this.entryPoints.groveStreet4 = { x: 58, y: 23 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, "Water");
        this.terrainPaint(52, 17, 10, 20, "Grass");
        this.terrainPaint(42, 35, 2, 8, "Grass");
        this.terrainPaint(56, 17, 2, 20, "Road");
        this.terrainPaint(55, 20, 1, 1, "Road");
        this.terrainPaint(58, 20, 1, 1, "Road");
        this.terrainPaint(55, 23, 1, 1, "Road");
        this.terrainPaint(58, 23, 1, 1, "Road");

        this.inhabitances.push(
            new Inhabitance("GroveStreet1", "1 Grove Street", 53, 19, { x: 54, y: 20 }),
            new Inhabitance("GroveStreet2", "2 Grove Street", 59, 19, { x: 59, y: 20 }),
            new Inhabitance("GroveStreet3", "3 Grove Street", 53, 22, { x: 54, y: 23 }),
            new Inhabitance("GroveStreet4", "4 Grove Street", 59, 22, { x: 59, y: 23 })
        );

        this.drawInhabitances();
        this.assignPeopleToInhabitances();
    }
}

export { Islands };
