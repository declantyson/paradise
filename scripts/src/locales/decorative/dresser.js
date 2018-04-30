/*
 *
 *  Paradise/Decorative/Dresser
 *  Declan Tyson
 *  v0.0.71
 *  30/04/2018
 *
 */

import { Decorative } from '../../engine/decorative';

class Dresser extends Decorative {
  constructor(x, y) {
    super('Dresser', 'a fancy dresser', '/oob/Decorative/dresser.png', x, y, [false, false]);
    this.lines = [`It's a fancy dresser.`];

    this.resetInteractions();

    this.addConversationOption('Search', 'Open the drawers');
    this.addResponse('Search', 'You find nothing but a dead fly. You hope he had a fulfilling life.');
    this.addConversationOption('Leave', 'Shut the drawer and go elsewhere.', 'Search');

    this.addConversationOption('FreakOut', 'Touch the mysterious looking button');
    this.addResponse('FreakOut', 'You are now scarred for life.');
    this.addConversationOption('FreakOut', 'Press the button again', 'FreakOut');
    this.addConversationOption('Leave', 'Break the cycle', 'FreakOut');

    this.addConversationOption('Leave', 'Indeed it is.');
  }
}

export { Dresser };
