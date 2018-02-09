/*
 *
 *  Paradise
 *  Declan Tyson
 *  v0.0.33
 *  09/02/2018
 *
 */
// Engine
import { StartGame } from './engine/game';
import { Interaction } from "./engine/interaction";
import { Item } from './engine/item';
import { Locale, Inhabitance, Interior } from "./engine/locale";
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

export {
    StartGame, Interaction, Item, Locale, Inhabitance, Interior, Player, choosePeople, Person, Scene, terrains, Util, WorldMap,
    startingMaps, chooseStartingMap,
    people
};