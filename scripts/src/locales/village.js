/*
 *
 *  Paradise/Locales/Village
 *  Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */
import { Inhabitance } from '../engine/locale';
import { Locale } from '../engine/locale';
import { TownHall } from './interiors/townhall';

class Village extends Locale {
  constructor(player, people) {
    super(player, people);

    this.entryPoints.beginningOfGame = { x: 30, y: 30 };
    this.entryPoints.townHall = { x: 31, y: 62 };

    this.initialise(300, 300);

    this.terrainPaint(0, 0, 300, 300, 'Water');
    this.terrainPaint(20, 27, 15, 90, 'Grass');
    this.terrainPaint(35, 35, 2, 40, 'Grass');
    this.terrainPaint(37, 37, 2, 36, 'Grass');
    this.terrainPaint(39, 39, 2, 32, 'Grass');

    this.inhabitances.push(new Inhabitance('TownHall', 'Town Hall', 30, 59, { x: 31, y: 62 }, 2, 4));

    this.drawInhabitances();
    this.assignPeopleToInhabitancesRandomly(4);
  }
}

export { Village };
