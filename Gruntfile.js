module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['scripts/script.js'],
                dest: 'scripts/script.min.js'
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [["babelify"]]
                },
                files: {
                    "scripts/script.js": "scripts/compiled/*.js"
                }
            }
        },
        watch : {
            scripts: {
                files: ['scripts/src/**/*.js',  '!**/*.min.js'],
                tasks: ['jshint', 'babel', 'browserify'],
                options: {

                }
            },
            styles : {
                files: ['css/src/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {

                }
            },
            uglify: {
                files: ['scripts/script.js'],
                tasks: ['uglify'],
                options: {

                }
            }
        },
        sass : {
            development: {
                options : {

                },
                files : {
                    'css/styles.css': 'css/src/*.scss'
                }
            }
        },
        cssmin : {
            options : {

            },
            target: {
                files : [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            options: {
                esversion: 6
            },
            all: [
                'Gruntfile.js',
                'scripts/src/*.js',
                'scripts/src/**/*.js',
                '!scripts/*.min.js'
            ]
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'scripts/src/',
                    src: ['**/*.js'],
                    dest: 'scripts/compiled/',
                    ext: '.js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-notify');
    grunt.registerTask('default', ['watch']);

};