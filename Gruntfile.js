var RastaSync = require('./rasta-sync');
var path = require('path');
var NODE_ENV = process.env.NODE_ENV || 'development';

var howdyDomain = NODE_ENV === 'production' ? 'https://howdy.andyet.com' : 'https://howdy.anyet.net';

var rastaTeam = RastaSync.createRasta(__dirname + '/team');

var Team = rastaTeam.all();

function makeTeamFileList(layoutFile) {
    var files = {};
    Team.forEach(function (person) {
        files['./public/team/' + person.meta.slug + '/index.html'] = layoutFile;
    });
    return files;
}




module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jade');

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
                        require('yeticss'),
                        require('autoprefixer-stylus')
                    ]
                },

                files: {
                    'public/css/main.css': ['_styl/main.styl']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css',
                    ext: '.min.css',
                }]
            }
        },
        jade: {
            basic: {
                options: {
                    data: {
                        allTeam: Team,
                        howdyDomain: howdyDomain
                    }
                },
                files: [{
                    expand: true,
                    cwd: '_jade',
                    src: ['**/*.jade'],
                    dest: 'public',
                    ext: '.html',
                    //Don't render jade files in include or with a _ in the front
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
            },
            team: {
                options: {
                    data: function (dest, src) {
                        var slug = dest.split('/').slice(-2,-1)[0];
                        var item = rastaTeam.getBySlug(slug);
                        return { person: item.meta, bio: item.html, allTeam: Team};
                    }
                },
                files: makeTeamFileList('./_jade/_teamMember.jade')
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
                        dest: 'public'
                    }
                ]
            },
        },
        watch: {
            build: {
                files: ['_styl/**/*.styl', '_jade/**/*.jade', 'team/**/*.md', '_images/**', '_js/**'],
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

    grunt.registerTask('build', ['stylus', 'cssmin', 'browserify', 'uglify', 'jade', 'copy'])
    grunt.registerTask('serve', ['build', 'connect:server', 'watch'])
    grunt.registerTask('default', ['build'])
};
