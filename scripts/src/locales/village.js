/*
 *
 *  XL RPG/Locales/Village
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import {ParadiseLocale} from '../paradise_locale';

class Village extends ParadiseLocale {
    constructor(player, people) {
        super(player, people);

        this.entryPoints.beginningOfGame = { x: 30, y: 30 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, 'Water');
        this.terrainPaint(20, 27, 15, 90, 'Grass');
        this.terrainPaint(35, 35, 2, 40, 'Grass');
        this.terrainPaint(37, 37, 2, 36, 'Grass');
        this.terrainPaint(39, 39, 2, 32, 'Grass');
    }
}

export { Village };
