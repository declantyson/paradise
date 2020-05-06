/*
 *
 *  Paradise/Person/Zenith
 *  Declan Tyson
 *  v0.0.80
 *  17/01/2019
 *
 */

import { genders, colours } from '../constants';
import { Person } from '../engine/person';

class Zenith extends Person {
  constructor() {
    super('Zenith', genders.alien);

    this.colour = colours.green;
    this.relationships = {
      Quazar: {
        description: 'Roommate',
        value: 85,
      },
    };

    this.lines = ['I am so lonely...'];

    this.resetInteractions();

    this.addConversationOption('Nice', "Happy Valentine's Day!");
    this.addResponse('Nice', '<3');
    this.addConversationOption('Goodbye', 'Goodbye', 'Nice');

    this.addConversationOption('Truth', 'You will die alone.');
    this.addResponse('Truth', 'I know... :(');
    this.addConversationOption('Goodbye', 'Goodbye', 'Truth');

    this.addConversationOption('Mean', 'LOL!', null, this.scream);
    this.addResponse('Mean', 'Why you little fuckface!', 'angry');
    this.addConversationOption('Confront', 'What are you going to do about it?', 'Mean');
    this.addResponse('Confront', "Nothing, I guess... I'm so lonely...");
    this.addConversationOption('Regret', 'I feel a bit bad now.', 'Confront');
    this.addConversationOption('Laughter', "Who's the fuckface now, eh?", 'Confront');
  }

  scream() {
    alert('!!!!');
  }
}

export { Zenith };
