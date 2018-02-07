/*
 *
 *  CODENAME: Paradise/Setup
 *  XL Gaming/Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

import * as util from "./engine/util";
import { people } from "./people/people";
import { startingMaps } from "./locales/locales";
import { posessivePronouns } from "./constants";
import { murderWeapons } from "./evidence/murderweapons";
import { motives } from "./motives/motives";
import { dieRoll } from "./engine/util";

export const chooseVictim = (chosenPeople) => {
    let victim = chosenPeople[util.dieRoll(chosenPeople.length - 1)];
    util.log(`${victim} is the unlucky one.`);
    return victim;
};

export const chooseMurderer = (victimName, chosenPeople, trueRandom = false) => {
    let victim = new people[victimName]();
    chosenPeople.forEach((person) => {
        if(victim.name === person.name) return;
        if(!(person in victim.relationships)) victim.addAcquaintanceRelationship(person);
    });

    if(trueRandom) v.randomizeRelationships();

    /*
     * Each relationship has a score of 0-99 (x)
     * We loop through each relationship, taking (x) away from 100
     * We then assign a random number between 1 and 100
     * If the random number is in the range of 100-(x), that's our murderer
     */

    /* jshint ignore:start */
    let murderer = null,
        relationship = null;
    while(murderer === null) {
        Object.keys(victim.relationships).forEach((name) => {
            if(murderer !== null) return;
            if(name === victim.name) return;

            relationship = victim.relationships[name];
            let limit = 100 - relationship.value,
                test = Math.floor(Math.random() * 100);

            if(test < limit) murderer = name;
        });
    }
    /* jshint ignore:end */

    util.log(`${victim.name}'s murderer is ${posessivePronouns[victim.gender]} ${relationship.description}, ${murderer}!!!`);

    return murderer;
};

export const chooseMotive = (victimKey, murderer) => {
    let potentialMotives = [],
        victim = new people[victimKey]();

    if(!(murderer in victim.relationships)) victim.addAcquaintanceRelationship(murderer);

    let relationship = victim.relationships[murderer];

    Object.keys(motives).forEach((motiveKey) => {
        let motive = new motives[motiveKey]();

        if(relationship.description in motive.relationshipBiases) {
            for(let i = 0; i < motive.relationshipBiases[relationship.description]; i++) {
                potentialMotives.push(motive);
            }
        }
    });

    let motive = potentialMotives[util.dieRoll(potentialMotives.length)].name;
    util.log(`The motive was ${motive}.`);
    return motive;
};

export const chooseStartingMap = () => {
    let locale = util.pickRandomProperty(startingMaps);
    util.log('Choosing starting map...');
    util.log(`Map is ${locale}.`);
    return locale;
};

export const chooseEvidence = (game) => {
    let evidences = [],
        weapon = whatHappensToTheWeapon(game);

    if(weapon) evidences.push(weapon);

    return evidences;
};

export const chooseMurderWeapon = () => {
    let weapon = util.pickRandomProperty(murderWeapons);
    util.log(`The murder weapon is a ${weapon}.`);
    return weapon;
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