/*
 *
 *  Paradise/People
 *  Declan Tyson
 *  v0.0.37
 *  12/02/2018
 *
 */

import { settings } from '../settings';
import { Util } from './util';
import { people } from '../people/people';

export const choosePeople = () => {
    let chosenPeople = [];
    Util.log(`Choosing ${settings.personCount} people...`);
    let person;
    while(chosenPeople.length < settings.personCount) {
        person = Util.pickRandomProperty(people);
        if(chosenPeople.indexOf(person) === -1) {
            chosenPeople.push(person);
            Util.log(`${person} has been chosen.`);
        }
    }

    return chosenPeople;
};