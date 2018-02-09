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
                    'Item'
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