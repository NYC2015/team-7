'use strict';


module.exports = function(grunt) {

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var mountFolder = function(connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    var generateVersion = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    };

    var cfg = {
        assetDir: 'assets',
        srcDir: 'js',
        jsBuildDir: 'js/prod',
        cssDir: 'style/css',
        versionid: generateVersion()
    };

    // project configuration
    grunt.initConfig({
        cfg: cfg,

        ngconstant: {
            // Options for all targets
            options: {
                space: '  ',
                wrap: '"use strict";\n\n {%= __ngModule %}',
                name: 'plus.config'
            },
            // Environment targets
            development: {
                options: {
                    dest: '<%= cfg.srcDir %>/config.js'
                },
                constants: {
                    ENV: {
                        name: 'development',
                        endpoint: 'http://localhost:8080',
                        username: 'user',
                        pass: 'pass',
                        cachebust: '' + Date.now()
                    }
                }
            },
            production: {
                options: {
                    dest: '<%= cfg.srcDir %>/config.js'
                },
                constants: {
                    ENV: {
                        name: 'production',
                        endpoint: '//api.plus.co',
                        username: '',
                        pass: '',
                        cachebust: '' + Date.now()
                    }
                }
            }
        },

        watch: {
            dev: {
                files: ['style/css/*.css'],
                tasks: [],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true,
                },
            }
        },

        "http-server": {
            dev: {
                port: 8081,
                root: './',
                autoIndex: true,
                runInBackground: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-cache-breaker');
};
