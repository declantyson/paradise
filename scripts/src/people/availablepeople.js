/*
 *
 *  XL RPG/People
 *  XL Gaming/Declan Tyson
 *  v0.0.18
 *  05/02/2018
 *
 */

// People

import * as util from '../util';
import {personCount, pronouns} from '../constants';

import { Evelyn } from './evelyn';
import { Jill } from './jill';
import { John } from './john';
import { Neil } from './neil';
import { Pauline } from './pauline';
import { Petey } from './petey';
import { Quazar } from './quazar';
import { Zenith } from './zenith';

export let people = {
    "Evelyn"  : Evelyn,
    "Jill"    : Jill,
    "John"    : John,
    "Neil"    : Neil,
    "Pauline" : Pauline,
    "Petey"   : Petey,
    "Quazar"  : Quazar,
    "Zenith"  : Zenith
};

export const choosePeople = () => {
    let chosenPeople = [];
    util.log(`Choosing ${personCount} people...`);
    let person;
    while(chosenPeople.length < personCount) {
        person = util.pickRandomProperty(people);
        if(chosenPeople.indexOf(person) === -1) {
            chosenPeople.push(person);
            util.log(`${person} has been chosen.`);
        }
    }

    return chosenPeople;
};

export const chooseVictim = (chosenPeople) => {
    let victim = util.pickRandomIndex(chosenPeople);
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

    util.log(`${victim.name}'s murderer is ${pronouns[victim.gender]} ${relationship.description}, ${murderer}!!!`);

};