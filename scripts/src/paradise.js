/*
 *
 *  CODENAME: Paradise
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import * as util from './engine/util';

import { StartGame } from './engine/game';
import { Player } from './engine/player';
import { ParadiseWorldMap } from './paradise_worldmap';
import { chooseMotive, chooseMurderer, chooseVictim, chooseStartingMap, chooseMurderWeapon, chooseEvidence } from './paradise_setup';
import { choosePeople } from './engine/people';
import { startingMaps } from "./locales/locales";

window.startGame = (locale, people, victim, murderer, weapon, motive) => {
    util.clearLog();

    locale = startingMaps[locale] || startingMaps[chooseStartingMap()];
    people = people || choosePeople();

    let player = new Player(),
        worldMap = new ParadiseWorldMap(player);

    window.game = StartGame(locale, people, player, worldMap);
    window.game.people = people;
    window.game.victim = victim || chooseVictim(window.game.people);
    window.game.murderer = murderer || chooseMurderer(window.game.victim, window.game.people);
    window.game.weapon = weapon || chooseMurderWeapon();
    window.game.motive = motive || chooseMotive(window.game.victim, window.game.murderer);
    window.game.evidence = chooseEvidence(game);

    util.log('Evidence includes:');
    window.game.evidence.forEach((e) => {
        util.log(`-  ${e.name} (${e.location})`);
    });

    document.querySelectorAll('button').forEach((button) => {
        button.blur();
    });
};