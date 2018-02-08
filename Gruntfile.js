module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch : {
            styles : {
                files: ['css/src/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {

                }
            },
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
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-notify');
    grunt.registerTask('default', ['watch']);

};