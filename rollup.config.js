import commonjs from 'rollup-plugin-commonjs';

export default [{
    input: 'scripts/src/main.js',
    output: {
        file: 'index.js',
        format: 'cjs',
        name: 'Paradise',
    },
    plugins: [
        commonjs({
            namedExports: {
                'index.js': [
                    'StartGame', 'Interaction', 'Item', 'Locale', 'Player', 'Scene', 'terrains', 'Util', 'WorldMap',
                    'startingMaps'
                ]
            }
        })
    ]
},{
    input: 'scripts/src/main.js',
    output: {
        file: 'scripts/bundle.js',
        format: 'iife',
        name: 'Paradise'
    }
}];