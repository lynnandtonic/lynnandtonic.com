var RastaSync = require('./rasta-sync');
var path = require('path');
var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-pug');

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        stylus: {
            compile: {
                options: {
                    use: [
                        require('autoprefixer-stylus')
                    ]
                },

                files: {
                    'public/assets/css/main.css': ['_styl/main.styl'],
                    'public/assets/css/home.css': ['_styl/pages/home.styl']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/assets/css',
                    ext: '.min.css',
                }]
            }
        },
        pug: {
            basic: {
                files: [{
                    expand: true,
                    cwd: '_pug',
                    src: ['**/*.pug'],
                    dest: 'public',
                    ext: '.html',
                    //Don't render pug files in include or with a _ in the front
                    filter: function (src) {
                        if (src.indexOf('include') > -1) {
                            return false;
                        }
                        if (path.basename(src)[0] === '_') {
                            return false;
                        }
                        return true;
                    },
                    //Move non index.html files into their own dir for clean paths
                    rename: function (dest, src) {
                        if (src !== 'index.html') {
                            return dest + '/' + src.replace('.html', '/index.html');
                        }
                        return dest + '/' + src;
                    }
                }]
            }
        },

        //- browserify the main javascript file to the output js dir
        browserify: {
            main: {
                src: '_js/main.js',
                dest: 'public/js/main.js',
            }
        },

        //- minify any js files in the output dir
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'public/js',
                    ext: '.min.js'
                }]
          }
        },

        copy: {
            public: {
                files: [
                    {
                        cwd: '_assets',
                        expand: true,
                        src: ['**'],
                        dest: 'public/assets'
                    }
                ]
            },
        },
        watch: {
            build: {
                files: ['_styl/**/*.styl', '_pug/**/*.pug', 'team/**/*.md', '_images/**', '_js/**'],
                tasks: ['build'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'public',
                    livereload: true,
                    open: true
                }
            }
        }
    });

    grunt.registerTask('build', ['stylus', 'cssmin', 'browserify', 'uglify', 'pug', 'copy'])
    grunt.registerTask('serve', ['build', 'connect:server', 'watch'])
    grunt.registerTask('default', ['build'])
};
