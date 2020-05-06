/*
 *
 *  Paradise
 *  Declan Tyson
 *  v0.0.72
 *  21/09/2018
 *
 */

// Engine
import { StartGame, Renderer, Game } from './engine/game';
import { Interaction } from './engine/interaction';
import { ObjectInteraction } from './engine/objectinteraction';
import { Item } from './engine/item';
import { Locale, Inhabitance, Interior } from './engine/locale';
import { Player } from './engine/player';
import { choosePeople } from './engine/people';
import { Person } from './engine/person';
import { Portrait } from './engine/portrait';
import { Scene } from './engine/scene';
import { Terrain } from './engine/terrain';
import { terrains } from './engine/terrains';
import { Util } from './engine/util';
import { WorldMap } from './engine/worldmap';
import { Decorative } from './engine/decorative';
import { Menu } from './engine/menu';
import { settings } from './settings';

// Demo data
import { startingMaps, chooseStartingMap } from './locales/locales';
import { people } from './people/people';
import { enemies } from './enemies/enemies';
import { Evelyn } from './people/evelyn';
import { Jill } from './people/jill';
import { John } from './people/john';
import { Neil } from './people/neil';
import { Pauline } from './people/pauline';
import { Petey } from './people/petey';
import { Quazar } from './people/quazar';
import { Zenith } from './people/zenith';
import { Tree } from './locales/decorative/tree';
import { Dresser } from './locales/decorative/dresser';
import { Rug } from './locales/decorative/rug';
import { TestMenu } from './scenes/testmenu';
import { Slime } from './enemies/slime';

export {
  StartGame,
  Interaction,
  ObjectInteraction,
  Item,
  Locale,
  Inhabitance,
  Interior,
  Player,
  choosePeople,
  Person,
  Scene,
  terrains,
  Util,
  WorldMap,
  Decorative,
  Renderer,
  Game,
  Portrait,
  settings,
  startingMaps,
  chooseStartingMap,
  people,
  enemies,
  Evelyn,
  Jill,
  John,
  Neil,
  Pauline,
  Petey,
  Quazar,
  Zenith,
  Dresser,
  Rug,
  Tree,
  Terrain,
  Menu,
  TestMenu,
  Slime,
};
