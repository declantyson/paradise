/*
 *
 *  Paradise
 *  XL Gaming/Declan Tyson
 *  v0.0.21
 *  06/02/2018
 *
 */

import * as util from "./engine/util";

import { StartGame } from './engine/game';
import { chooseMurderer, chooseVictim } from "./people/availablepeople";
import { choosePeople } from "./engine/people";
import { chooseStartingMap, startingMaps } from "./locales/locales";

window.startGame = (locale, people, victim, murderer) => {
    util.clearLog();

    locale = startingMaps[locale] || startingMaps[chooseStartingMap()];
    people = people || choosePeople();
    victim = victim || chooseVictim(people);
    murderer = murderer || chooseMurderer(victim, people);

    window.game = StartGame(locale, people);
    document.querySelectorAll('button').forEach((button) => {
        button.blur();
    });
};