/*
 *
 *  Paradise/People
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { personCount } from '../constants';
import { Util } from './util';
import { people } from '../people/people';

export const choosePeople = () => {
    let chosenPeople = [];
    Util.log(`Choosing ${personCount} people...`);
    let person;
    while(chosenPeople.length < personCount) {
        person = Util.pickRandomProperty(people);
        if(chosenPeople.indexOf(person) === -1) {
            chosenPeople.push(person);
            Util.log(`${person} has been chosen.`);
        }
    }

    return chosenPeople;
};