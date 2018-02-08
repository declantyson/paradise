/*
 *
 *  Paradise
 *  Declan Tyson
 *  v0.0.32
 *  07/02/2018
 *
 */

import * as util from './engine/util';

import { StartGame } from './engine/game';
import { Player } from './engine/player';
import { WorldMap } from './engine/worldmap';
import { choosePeople } from './engine/people';
import { startingMaps, chooseStartingMap } from "./locales/locales";

window.startGame = (locale, people) => {
    util.clearLog();

    locale = startingMaps[locale] || startingMaps[chooseStartingMap()];
    people = people || choosePeople();

    let player = new Player(),
        worldMap = new WorldMap(player);

    window.game = StartGame(locale, people, player, worldMap);
    window.game.people = people;

    document.querySelectorAll('button').forEach((button) => {
        button.blur();
    });
};