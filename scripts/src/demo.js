/*
 *
 *  Paradise
 *  Declan Tyson
 *  v0.0.72
 *  21/09/2018
 *
 */

import { Util, TestMenu, StartGame } from './main';

window.startGame = () => {
  Util.clearLog();

  let testMenu = new TestMenu();
  StartGame(testMenu, null, null, null);
};
