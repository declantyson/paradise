export default [{
    input: 'scripts/src/main.js',
    output: {
        file: 'index.js',
        format: 'cjs'
    }
},{
    input: 'scripts/src/main.js',
    output: {
        file: 'scripts/bundle.js',
        format: 'iife'
    }
}];