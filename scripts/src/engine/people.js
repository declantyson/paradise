/*
 *
 *  Paradise/People
 *  Declan Tyson
 *  v0.0.92
 *  21/10/2019
 *
 */

import { settings } from '../settings';
import { Util } from './util';
import { people } from '../people/people';

export const choosePeople = () => {
  const personCount = settings.get('personCount');
  let chosenPeople = [];
  Util.log(`Choosing ${personCount} people...`);
  let person;
  while (chosenPeople.length < personCount) {
    person = Util.pickRandomProperty(people);
    if (chosenPeople.indexOf(person) === -1) {
      chosenPeople.push(person);
      Util.log(`${person} has been chosen.`);
    }
  }

  return chosenPeople;
};
