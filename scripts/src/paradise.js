/*
 *
 *  CODENAME: Paradise
 *  XL Gaming/Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

import * as util from './engine/util';

import { StartGame } from './engine/game';
import { Player } from './engine/player';

import { ParadiseWorldMap } from "./paradise_worldmap";

import { chooseMurderer, chooseVictim } from './people/availablepeople';
import { choosePeople } from './engine/people';
import { chooseStartingMap, startingMaps } from './locales/locales';
import { chooseMurderWeapon } from './evidence/murderweapons';

window.startGame = (locale, people, victim, murderer, weapon) => {
    util.clearLog();

    locale = startingMaps[locale] || startingMaps[chooseStartingMap()];
    people = people || choosePeople();
    let player = new Player(),
        worldMap = new ParadiseWorldMap(player);

    window.game = StartGame(locale, people, player, worldMap);

    window.game.victim = victim || chooseVictim(people);
    window.game.murderer = murderer || chooseMurderer(victim, people);
    window.game.weapon = weapon || chooseMurderWeapon();

    document.querySelectorAll('button').forEach((button) => {
        button.blur();
    });
};