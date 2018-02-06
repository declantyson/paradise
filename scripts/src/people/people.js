/*
 *
 *  CODENAME: Paradise/People
 *  XL Gaming/Declan Tyson
 *  v0.0.24
 *  06/02/2018
 *
 */

// People

import * as util from '../engine/util';
import { posessivePronouns } from '../constants';

import { Evelyn } from './evelyn';
import { Jill } from './jill';
import { John } from './john';
import { Neil } from './neil';
import { Pauline } from './pauline';
import { Petey } from './petey';
import { Quazar } from './quazar';
import { Zenith } from './zenith';

import { InheritanceScam } from '../motives/inheritancescam';
import { Passion } from '../motives/passion';
import { Psychosis } from '../motives/psychosis';

export let people = {
    'Evelyn'  : Evelyn,
    'Jill'    : Jill,
    'John'    : John,
    'Neil'    : Neil,
    'Pauline' : Pauline,
    'Petey'   : Petey,
    'Quazar'  : Quazar,
    'Zenith'  : Zenith
};

export let motives = {
    'InheritanceScam' : InheritanceScam,
    'Passion' : Passion,
    'Psychosis' : Psychosis
};

export const chooseVictim = (chosenPeople) => {
    let victim = util.dieRoll(chosenPeople.length - 1);
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