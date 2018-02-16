/*
 *
 *  Paradise/Settings
 *  Declan Tyson
 *  v0.0.53
 *  16/02/2018
 *
 */

export let settings = {
    fps : 45,
    actionTimeoutLimit : 2,
    terrain: {
        tileSize: 20,
        tilesWide: 50,
        tilesHigh: 28
    },
    character : {
        spriteSize: 40,
        frameSize: 64,
        frameCount: 9,
        stepsPerTile: 5
    },
    personCount : 4,
    defaultInhabitanceSize : 2,
    loadingScreen: '/oob/loading.png',
    minLoadingTime: 2000,
    fonts : {
        large: '24px "Roboto Condensed"',
        small: '16px "Roboto"',
        death: '24px "Permanent Marker"'
    }
};

export let canvasProperties = {
    width: settings.terrain.tileSize * settings.terrain.tilesWide,
    height: settings.terrain.tileSize * settings.terrain.tilesHigh,
    centerPoint: {
        x: ((settings.terrain.tileSize * settings.terrain.tilesWide) / 2) - (settings.terrain.tileSize / 2),
        y: ((settings.terrain.tileSize * settings.terrain.tilesHigh) / 2) - (settings.terrain.tileSize / 2)
    }
};

export let tileStep = (settings.terrain.tileSize / settings.character.stepsPerTile);
export let portraitWidth = canvasProperties.width / 2;
