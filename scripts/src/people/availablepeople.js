/*
 *
 *  XL RPG/People
 *  XL Gaming/Declan Tyson
 *  v0.0.10
 *  13/11/2016
 *
 */

// People

import * as util from '../util';
import { personCount } from '../constants';

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
