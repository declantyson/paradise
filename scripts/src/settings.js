/*
 *
 *  Paradise/Settings
 *  Declan Tyson
 *  v0.0.37
 *  12/02/2018
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
        frameCount: 9
    },
    personCount : 4,
    defaultInhabitanceSize : 2
}

export let canvasProperties = {
    width: settings.terrain.tileSize * settings.terrain.tilesWide,
    height: settings.terrain.tileSize * settings.terrain.tilesHigh,
    centerPoint: {
        x: ((settings.terrain.tileSize * settings.terrain.tilesWide) / 2) - (settings.terrain.tileSize / 2),
        y: ((settings.terrain.tileSize * settings.terrain.tilesHigh) / 2) - (settings.terrain.tileSize / 2)
    }
};