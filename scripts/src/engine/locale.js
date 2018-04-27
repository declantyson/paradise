/*
 *
 *  Paradise/Locales/Base
 *  Declan Tyson
 *  v0.0.56
 *  16/02/2018
 *
 */

import { Util } from './util';
import { pairedRelationships } from '../constants';
import { settings } from '../settings';

class Locale {
  constructor(player, activePeople) {
    this.player = player;
    this.people = activePeople;
    this.entryPoints = {};
    this.spawnPoints = [];
    this.inhabitances = [];
    this.decorative = [];
  }

  initialise(width, height) {
    let map = [],
      enc = [],
      ent = [];
    for (let i = 0; i < width; i++) {
      map.push([]);
      enc.push([]);
      ent.push([]);
      for (let j = 0; j < height; j++) {
        map[i].push(['Blank']);
        enc[i].push(false);
        ent[i].push(false);
      }
    }

    this.map = map;
    this.encounters = enc;
    this.entrances = ent;
    this.width = width;
    this.height = height;
  }

  terrainPaint(startX, startY, width, height, terrain) {
    for (let x = startX; x < startX + width; x++) {
      for (let y = startY; y < startY + height; y++) {
        this.map[x][y] = terrain;
      }
    }
  }

  randomEncounterPatch(startX, startY, width, height, rate, enemies) {
    for (let x = startX; x < startX + width; x++) {
      for (let y = startY; y < startY + height; y++) {
        this.encounters[x][y] = {
          rate: rate,
          enemies: enemies,
        };
      }
    }
  }

  addInhabitance(startX, startY, width, height, inhabitance) {
    let doorway = inhabitance.doorway;
    this.terrainPaint(startX, startY, width, height, 'Wall');
    this.terrainPaint(doorway.x, doorway.y, 1, 1, 'Doorway');
    this.entrances[doorway.x][doorway.y] = {
      locale: inhabitance,
      entryPoint: 'frontDoor',
    };
  }

  enterLocaleAt(entryPoint) {
    this.player.stepX = 0;
    this.player.stepY = 0;
    this.player.setPlacement(this.entryPoints[entryPoint].x, this.entryPoints[entryPoint].y, true);
  }

  addDecoration(decoration) {
    this.decorative.push(decoration);
  }

  addSpawnPoint(x, y) {
    this.spawnPoints.push({
      x: x,
      y: y,
    });
  }

  drawInhabitances() {
    for (let i = 0; i < this.inhabitances.length; i++) {
      let inhabitance = this.inhabitances[i];
      this.addInhabitance(inhabitance.x, inhabitance.y, inhabitance.sizeX, inhabitance.sizeY, inhabitance);
    }
  }

  assignPeopleToInhabitancesRandomly(maxPerInhabitancy, thisPeople = this.people) {
    if (this.inhabitances.length === 0 || thisPeople.length === 0) return;

    for (let i = 0; i < thisPeople.length; i++) {
      let person = thisPeople[i],
        index = Math.floor(Math.random() * this.inhabitances.length),
        inhabitance = this.inhabitances[index];

      while (inhabitance.inhabitants.length >= maxPerInhabitancy) {
        index = Math.floor(Math.random() * this.inhabitances.length);
        inhabitance = this.inhabitances[index];
      }

      inhabitance.addInhabitant(person);
    }
  }

  assignPairedPeopleToInhabitancesRandomly(maxPerInhabitancy) {
    if (this.inhabitances.length === 0 || this.people.length === 0) return;

    let thisPeople = this.people.slice(0),
      pairedPeople = [],
      currentPairing = [];

    for (let i = 0; i < thisPeople.length; i++) {
      let person = thisPeople[i];
      if (pairedPeople.indexOf(person) === -1) {
        currentPairing.push(person);
        let thisPerson = new window.game.people[person]();
        Object.keys(thisPerson.relationships).forEach(relationship => {
          if (
            pairedRelationships.indexOf(thisPerson.relationships[relationship].description) !== -1 &&
            this.people.indexOf(relationship) !== -1
          ) {
            currentPairing.push(relationship);
          }
        });
      }

      if (currentPairing.length === maxPerInhabitancy) {
        let index = Math.floor(Math.random() * this.inhabitances.length),
          inhabitance = this.inhabitances[index];

        while (inhabitance.inhabitants.length + 1 >= maxPerInhabitancy) {
          index = Math.floor(Math.random() * this.inhabitances.length);
          inhabitance = this.inhabitances[index];
        }

        inhabitance.addInhabitants(currentPairing);
        currentPairing.forEach(person => {
          pairedPeople.push(person);
        });
      }

      currentPairing = [];
    }

    let remainingPeople = thisPeople.filter(item => {
      return pairedPeople.indexOf(item) === -1;
    });

    this.assignPeopleToInhabitancesRandomly(maxPerInhabitancy, remainingPeople);
  }
}

class Interior extends Locale {
  constructor(player, people, inhabitance = null) {
    super(player, people);

    if (!inhabitance) return;

    this.inhabitance = inhabitance;
    Util.log(`Welcome to ${inhabitance.name}.`);

    for (let i = 0; i < inhabitance.inhabitants.length; i++) {
      let inhabitant = inhabitance.inhabitants[i];
      Util.log(`${inhabitant} lives here.`);
    }
  }
}

class Inhabitance {
  constructor(
    id,
    name,
    x,
    y,
    doorway,
    sizeX = settings.defaultInhabitanceSize,
    sizeY = settings.defaultInhabitanceSize
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.doorway = doorway;
    this.inhabitants = [];
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  addInhabitant(person) {
    this.inhabitants.push(person);
  }

  addInhabitants(people) {
    for (let i = 0; i < people.length; i++) {
      this.addInhabitant(people[i]);
    }
  }
}

export { Locale, Interior, Inhabitance };
