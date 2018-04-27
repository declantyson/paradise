/*
 *
 *  Paradise
 *  Declan Tyson
 *  v0.0.55
 *  16/02/2018
 *
 */

import { Util, startingMaps, chooseStartingMap, choosePeople, Player, WorldMap, StartGame } from './main';

window.startGame = (locale, people) => {
  Util.clearLog();

  locale = startingMaps[locale] || startingMaps[chooseStartingMap()];
  people = people || choosePeople();

  let player = new Player(),
    worldMap = new WorldMap(player);

  StartGame(locale, people, player, worldMap);

  document.querySelectorAll('button').forEach(button => {
    button.blur();
  });
};
