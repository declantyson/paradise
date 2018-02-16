/*
 *
 *  Paradise/Locales/Islands
 *  Declan Tyson
 *  v0.0.54
 *  16/02/2018
 *
 */

import { Inhabitance } from '../engine/locale';
import { Locale } from '../engine/locale';
import { Tree } from './decorative/tree';

class Islands extends Locale {
    constructor(player, people) {
        super(player, people);

        this.id = 'Islands';
        this.entryPoints.beginningOfGame = { x: 57, y: 60 };
        this.entryPoints.groveStreet1 = { x: 55, y: 60 };
        this.entryPoints.groveStreet2 = { x: 58, y: 60 };
        this.entryPoints.groveStreet3 = { x: 55, y: 63 };
        this.entryPoints.groveStreet4 = { x: 58, y: 63 };
        this.entryPoints.ballManor = { x: 56, y: 74 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, 'Water');
        this.terrainPaint(52, 57, 11, 20, 'Grass');
        this.terrainPaint(42, 35, 2, 8, 'Grass');
        this.terrainPaint(57, 60, 1, 16, 'VerticalRoad');
        this.terrainPaint(55, 60, 2, 1, 'HorizontalRoad');
        this.terrainPaint(58, 60, 2, 1, 'HorizontalRoad');
        this.terrainPaint(55, 63, 2, 1, 'HorizontalRoad');
        this.terrainPaint(58, 63, 2, 1, 'HorizontalRoad');

        this.terrainPaint(55, 70, 2, 1, 'HorizontalRoad');
        this.terrainPaint(54, 70, 1, 5, 'VerticalRoad');
        this.terrainPaint(55, 74, 2, 1, 'HorizontalRoad');

        this.terrainPaint(52, 76, 11, 3, 'CoastalSands')

        this.addDecoration(new Tree(60, 77));

        this.inhabitances.push(
            new Inhabitance('GroveStreet1', '1 Grove Street', 53, 59, { x: 54, y: 60 }),
            new Inhabitance('GroveStreet2', '2 Grove Street', 60, 59, { x: 60, y: 60 }),
            new Inhabitance('GroveStreet3', '3 Grove Street', 53, 62, { x: 54, y: 63 }),
            new Inhabitance('GroveStreet4', '4 Grove Street', 60, 62, { x: 60, y: 63 }),
            new Inhabitance('BallManor', 'Ball Manor', 55, 72, { x: 56, y: 73 })
        );

        this.drawInhabitances();
        this.assignPairedPeopleToInhabitancesRandomly(2);
    }
}

export { Islands };