/*
 *
 *  XL RPG/Locales/Islands
 *  XL Gaming/Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

import { Locale, Inhabitance } from '../engine/locale';

class Islands extends Locale {
    constructor(player, people) {
        super(player, people);

        this.id = 'Islands';
        this.entryPoints.beginningOfGame = { x: 56, y: 57 };
        this.entryPoints.groveStreet1 = { x: 55, y: 60 };
        this.entryPoints.groveStreet2 = { x: 58, y: 60 };
        this.entryPoints.groveStreet3 = { x: 55, y: 63 };
        this.entryPoints.groveStreet4 = { x: 58, y: 63 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, 'Water');
        this.terrainPaint(52, 57, 10, 20, 'Grass');
        this.terrainPaint(42, 35, 2, 8, 'Grass');
        this.terrainPaint(56, 57, 2, 20, 'Road');
        this.terrainPaint(55, 60, 1, 1, 'Road');
        this.terrainPaint(58, 60, 1, 1, 'Road');
        this.terrainPaint(55, 63, 1, 1, 'Road');
        this.terrainPaint(58, 63, 1, 1, 'Road');

        this.inhabitances.push(
            new Inhabitance('GroveStreet1', '1 Grove Street', 53, 59, { x: 54, y: 60 }),
            new Inhabitance('GroveStreet2', '2 Grove Street', 59, 59, { x: 59, y: 60 }),
            new Inhabitance('GroveStreet3', '3 Grove Street', 53, 62, { x: 54, y: 63 }),
            new Inhabitance('GroveStreet4', '4 Grove Street', 59, 62, { x: 59, y: 63 })
        );

        this.drawInhabitances();
        this.assignPeopleToInhabitances();
    }
}

export { Islands };
