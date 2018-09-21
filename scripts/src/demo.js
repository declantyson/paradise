/*
 *
 *  Paradise
 *  Declan Tyson
 *  v0.0.73
 *  16/09/2018
 *
 */

import { Util, TestMenu, StartGame } from './main';

window.startGame = () => {
  Util.clearLog();

  let testMenu = new TestMenu();
  StartGame(testMenu);
};
