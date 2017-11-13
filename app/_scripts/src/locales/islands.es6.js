/*
 *
 *  XL RPG/Locales/City
 *  XL Gaming/Declan Tyson
 *  v0.0.11
 *  13/11/2017
 *
 */

import { Locale, Inhabitance } from "./baselocale"

class Islands extends Locale {
    constructor(player, people) {
        super(player, people);

        this.entryPoints.beginningOfGame = { x: 55, y: 17 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, "Water");
        this.terrainPaint(52, 17, 10, 20, "Grass");
        this.terrainPaint(42, 35, 2, 8, "Grass");
        this.terrainPaint(55, 17, 2, 20, "Road");

        this.inhabitances.push(
            new Inhabitance(53, 19, "1 Grove Street", { x: 54, y: 20 }),
            new Inhabitance(57, 19, "2 Grove Street", { x: 57, y: 20 }),
            new Inhabitance(53, 22, "3 Grove Street", { x: 54, y: 23 }),
            new Inhabitance(57, 22, "4 Grove Street", { x: 57, y: 23 })
        );

        this.drawInhabitances();
        this.assignPeopleToInhabitances();
    }
}

export { Islands };
