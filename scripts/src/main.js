/*
 *
 *  Paradise
 *  Declan Tyson
 *  v0.0.32
 *  07/02/2018
 *
 */
// Engine
import { StartGame } from './engine/game';
import { Interaction } from "./engine/interaction";
import { Item } from './engine/item';
import { Locale } from "./engine/locale";
import { Player } from "./engine/player";
import { choosePeople } from "./engine/people";
import { Person } from "./engine/person";
import { Scene } from "./engine/scene";
import { terrains } from './engine/terrains';
import { Util } from './engine/util';
import { WorldMap } from './engine/worldmap';

// Test data
import { startingMaps, chooseStartingMap } from "./locales/locales";
import { people } from './people/people';

window.startGame = (locale, people) => {
    Util.clearLog();

    locale = startingMaps[locale] || startingMaps[chooseStartingMap()];
    people = people || choosePeople();

    let player = new Player(),
        worldMap = new WorldMap(player);

    window.game = StartGame(locale, people, player, worldMap);
    window.game.people = people;

    document.querySelectorAll('button').forEach((button) => {
        button.blur();
    });
};


export {
    StartGame, Interaction, Item, Locale, Player, choosePeople, Person, Scene, terrains, Util, WorldMap,
    startingMaps, chooseStartingMap,
    people
};