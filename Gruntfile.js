var path = require('path');
var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    /*  ---------------------
        ARCHIVED YEARS
        --------------------*/
    // grunt.loadNpmTasks('grunt-css-mqpacker');
    // grunt.loadNpmTasks('grunt-postcss-import');

    grunt.initConfig({
        stylus: {
            compile: {
                options: {
                    /*  ---------------------------------------------------
                        ARCHIVE NOTE:
                        This is required to compile 2021 and earlier,
                        but will error for 2022 and later.
                        To compile those files, please comment accordingly.
                        ---------------------------------------------------*/
                    // use: [
                    //     require('autoprefixer-stylus')
                    // ]
                },

                files: {
                    'public/assets/css/main.css':              ['_styl/main.styl'],
                    'public/assets/css/monokai-sublime.css':   ['_styl/components/code-monokai.styl'],
                    'public/assets/css/code.css':              ['_styl/components/code-panda.styl']
                    /*  ---------------------------------------------------
                        ARCHIVE NOTE:
                        These generated CSS files are in assets/css/archive
                        The following do not need autoprefixer
                        ---------------------------------------------------*/
                    // 'public/assets/css/archive/2022.css':          ['_styl/archive/2022.styl'],
                    /*  ---------------------------------------------------
                        ARCHIVE NOTE:
                        These generated CSS files are in assets/css/archive
                        To compile these, you will need autoprefixer above
                        ---------------------------------------------------*/
                    // 'public/assets/css/archive/2021.css':          ['_styl/archive/2021.styl'],
                    // 'public/assets/css/archive/2020.css':          ['_styl/archive/2020.styl'],
                    // 'public/assets/css/archive/2019-home.css':     ['_styl/archive/2019/pages/home.styl'],
                    // 'public/assets/css/archive/2019.css':          ['_styl/archive/2019.styl'],
                    // '_css/archive/2018/generated-post.css':        ['_styl/archive/2018/pages/home/_post.styl'],
                    // '_css/archive/2018/generated-home-base.css':   ['_styl/archive/2018/pages/home/base.styl'],
                    // '_css/archive/2018/generated-home-small.css':  ['_styl/archive/2018/pages/home/view-small.styl'],
                    // '_css/archive/2018/generated-home-large.css':  ['_styl/archive/2018/pages/home/view-large.styl'],
                    // 'public/assets/css/archive/2018.css':          ['_styl/archive/2018.styl'],
                    // 'public/assets/css/archive/2017.css':          ['_styl/archive/2017.styl'],
                    // 'public/assets/css/archive/2017-home.css':     ['_styl/archive/2017/pages/home.styl'],
                    // 'public/assets/css/archive/2016.css':          ['_styl/archive/2016.styl'],
                    // 'public/assets/css/archive/2015.css':          ['_styl/archive/2015.styl'],
                    // 'public/assets/css/archive/2015-ie.css':       ['_styl/archive/2015/sections/ie.styl'],
                    // 'public/assets/css/archive/2014.css':          ['_styl/archive/2014.styl'],
                    // 'public/assets/css/archive/2013.css':          ['_styl/archive/2013.styl'],
                    // 'public/assets/css/archive/2012.css':          ['_styl/archive/2012.styl'],
                    // 'public/assets/css/archive/2011.css':          ['_styl/archive/2011.styl'],
                    // 'public/assets/css/archive/2010.css':          ['_styl/archive/2010.styl' ],
                    // 'public/assets/css/archive/2009.css':          ['_styl/archive/2009.styl'],
                    // 'public/assets/css/archive/2008.css':          ['_styl/archive/2008.styl'],
                    // 'public/assets/css/archive/2007.css':          ['_styl/archive/2007.styl']
                }
            }
        },

        /*  ---------------------
            ARCHIVED YEARS
            ---------------------*/
        // css_mqpacker: {
        //     public: {
        //         files: [{
        //             '_css/archive/2018/generated-home-small.css': ['_css/archive/2018/generated-home-small.css'],
        //             '_css/archive/2018/generated-home-large.css': ['_css/archive/2018/generated-home-large.css']
        //         }]
        //     }
        // },

        // postcss_import: {
        //     public: {
        //         files: [{
        //             'public/assets/css/archive/2018-home.css': ['_css/archive/2018/generated-post.css']
        //         }]
        //     }
        // },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/assets/css',
                    src: ['home.css', 'main.css', 'monokai-sublime.css', 'archive/*.css', '!*.min.css'],
                    dest: 'public/assets/css',
                    ext: '.css',
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
                    'public/404.html': ['_pug/404.pug'],
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
                        if (src !== 'index.html' && src !== '404.html') {
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
                    },
                    {
                        cwd: '_blog-assets',
                        expand: true,
                        src: ['**'],
                        dest: 'public/images/blog'
                    },
                    {
                        cwd: '_rss',
                        expand: true,
                        src: ['**'],
                        dest: 'public/'
                    },
                    {
                        src: ['_redirects'],
                        dest: 'public/'
                    },
                    {
                        src: ['robots.txt'],
                        dest: 'public/'
                    }
                ]
            },
        },
        watch: {
            pug: {
                files: ['_pug/**'],
                tasks: ['pug:basic'],
                options: {
                  spawn: false,
                  livereload: true
              }
            },
            css: {
                files: ['_styl/**'],
                tasks: ['css'],
                options: {
                  livereload: true
                }
            },
            js: {
                files: ['_js/**'],
                tasks: ['js'],
                options: {
                  livereload: true
                }
            },
            assets: {
                files: ['_assets/**'],
                tasks: ['copy'],
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
        },

        clean: ['public']
    });

    grunt.event.on('watch', (action, filepath, target) => {
        if (target === 'pug') {
        const files = grunt.config('pug.basic.files');
        files[0].cwd = '_pug';
        files[0].src = ['**/*.pug'];
        grunt.config.set('pug.basic.files', files);
        }
    });

    /*  ---------------------
        ARCHIVED YEARS
        ---------------------*/
    // grunt.registerTask('css', ['stylus', 'css_mqpacker', 'postcss_import', 'cssmin']);
    // Note: cssmin breaks the :has supports stuff, so leaving off for now
    grunt.registerTask('css', ['stylus']);
    grunt.registerTask('js', ['browserify', 'uglify']);
    grunt.registerTask('build', ['clean', 'css', 'js', 'pug', 'copy']);
    grunt.registerTask('serve', ['build', 'connect:server', 'watch']);
    grunt.registerTask('default', ['build']);
};
