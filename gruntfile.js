'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: [
                    'gruntfile.js',
                    'server.js',
                    'app/**/*.js',
                    'config/**/*.js',
                    'public/js/**',
                    'test/**/*.js',
                    '!test/coverage/**/*.js'
                ],
                tasks: ['jshint'], // test
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['public/views/**', 'app/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/css/**'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/**', 'test/**/*.js', '!test/coverage/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**', 'test/coverage/**'],
                    ext: 'js',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        'node-inspector': {
            dev: {}
        },
        concurrent: {
            tasks: ['nodemon', 'node-inspector', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'config/karma.js'
            },

            debug: {
                configFile: 'config/karma.js',
                options: {
                    browsers: ['Chrome'],
                    singleRun: false
                }
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    //Making grunt default to force in order not to break the project.
    //grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['test:backend', 'test:frontend']);
    grunt.registerTask('test:backend', ['env:test', 'mochaTest']);
    grunt.registerTask('test:frontend', ['env:test', 'karma:unit']);
    grunt.registerTask('test:frontend:debug', ['env:test', 'karma:debug']);
};
