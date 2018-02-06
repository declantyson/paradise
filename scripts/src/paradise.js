/*
 *
 *  Paradise
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

import { StartGame } from './engine/game';
import { chooseMurderer, chooseVictim } from "./people/availablepeople";
import { choosePeople } from "./engine/people";
import { chooseStartingMap, startingMaps } from "./locales/locales";

window.startGame = (locale, people, victim, murderer) => {
    locale = startingMaps[locale] || startingMaps[chooseStartingMap()];
    people = people || choosePeople();
    victim = victim || chooseVictim(people);
    murderer = murderer || chooseMurderer(victim, people);

    window.game = StartGame(locale, people);
};