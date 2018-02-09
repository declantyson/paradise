import commonjs from 'rollup-plugin-commonjs';

export default [{
    input: 'scripts/src/main.js',
    output: {
        file: 'index.js',
        format: 'es',
        name: 'Paradise',
    }
},{
    input: 'scripts/src/main.js',
    output: {
        file: 'scripts/bundle.js',
        format: 'iife',
        name: 'Paradise'
    }
},{
    input: 'scripts/src/demo.js',
    output: {
        file: 'games/demo.js',
        format: 'iife',
        name: 'Paradise'
    }
}];