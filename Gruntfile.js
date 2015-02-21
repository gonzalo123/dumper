module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var jshintrc = grunt.file.readJSON('.jshintrc');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['Gruntfile.js', 'www/js/**.js', 'tests/js/**.js', 'io/**/*.js'],
            options: {
                globals: jshintrc
            }
        },

        cmpnt: grunt.file.readJSON('bower.json'),

        banner: '/*! ngHello v<%= cmpnt.version %> by Gonzalo Ayuso(gonzalo123@gmail.com) - ' +
        'http://github.com/gonzalo123/dumper - MIT License */\n',

        clean: ["dest/"],

        copy: {
            js: {
                src: 'www/js/dumper.js',
                dest: 'dist/dumper.js'
            }
        },

        uglify: {
            js: {
                src: ['www/js/dumper.js'],
                dest: 'dist/dumper.min.js',
                options: {
                    banner: '<%= banner %>',
                    sourceMap: function (fileName) {
                        return fileName.replace(/$/, '.map');
                    }
                }
            }
        },

        watch: {
            js: {
                files: ['Gruntfile.js', 'www/js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },

            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'www/**/*.html',
                    'www/**/*.js',
                    'www/**/*.css'
                ]
            }
        },

        php: {
            options: {
                port: 8080,
                livereload: true,
                hostname: 'localhost'
            },
            start: {
                options: {
                    open: true,
                    base: 'www/'
                }
            }
        }
    });

    grunt.registerTask('build', ['clean', 'jshint', 'copy', 'uglify']);
    grunt.registerTask('js', ['jshint']);
    grunt.registerTask('serve', ['php:start', 'watch']);
};