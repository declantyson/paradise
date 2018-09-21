/*
 *
 *  Paradise/Scene-Menu/Test Menu
 *  Declan Tyson
 *  v0.0.72
 *  21/09/2018
 *
 */

import { Util } from '../engine/util';
import { choosePeople } from '../engine/people';
import { Player } from '../engine/player';
import { WorldMap } from '../engine/worldmap';
import { Menu } from '../engine/menu';

import { startingMaps, chooseStartingMap } from '../locales/locales';

class TestMenu extends Menu {
  constructor() {
    super('/img/loading.png');

    this.addMenuItem('random', 'Start with random', () => {
      this.startGame();
    });

    this.addMenuItem('random', 'Start with test data', () => {
      this.startGame('Islands', ['Zenith', 'Quazar', 'Jill', 'John']);
    });

    this.addMenuItem('random', 'Start in full debug mode', () => {
      window.debug = true;
      this.startGame('Islands', ['Zenith', 'Quazar', 'Jill', 'John']);
    });
  }

  startGame(locale, people) {
    Util.clearLog();

    locale = startingMaps[locale] || startingMaps[chooseStartingMap()];

    people = people || choosePeople();

    let player = new Player(),
        worldMap = new WorldMap(player),
        start = new locale(player, people);

    window.game.setScene(worldMap);
    window.game.scene.setCurrentLocale(start, 'beginningOfGame');
    window.game.loading = true;
    window.game.initTerrainSprites();
  }
}

export { TestMenu };