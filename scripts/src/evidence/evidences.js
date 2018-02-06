/*
 *
 *  CODENAME: Paradise/Evidences
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import * as util from '../engine/util';

import { murderWeapons } from './murderweapons';
import { dieRoll } from '../engine/util';

export const chooseEvidence = (game) => {
    let evidences = [],
        weapon = whatHappensToTheWeapon(game);

    if(weapon) evidences.push(weapon);

    return evidences;
};

const whatHappensToTheWeapon = (game) => {
    let weapon = null,
        inhabitances = game.scene.locale.inhabitances,
        implicates = game.murderer,
        inhabitanceIndex = dieRoll(inhabitances.length - 1);

    if(util.dieRoll(10) === 0) implicates = false; // Muddied evidence - also TODO hard mode

    switch(util.dieRoll(3)) {
        case 0:
            // On the victim
            weapon = new murderWeapons[game.weapon](implicates, game.victim);
            break;
        case 1:
            // In the murderer's inhabitance
            inhabitances.forEach((inhabitance, index) => {
                if(inhabitance.inhabitants.indexOf(game.murderer) !== -1) inhabitanceIndex = index;
            });
            weapon = new murderWeapons[game.weapon](implicates, game.scene.locale.inhabitances[inhabitanceIndex].id);
            break;
        case 2:
            // Randomly hidden
            weapon = new murderWeapons[game.weapon](implicates, game.scene.locale.inhabitances[inhabitanceIndex].id);
            break;
    }

    return weapon;
};