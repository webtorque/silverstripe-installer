module.exports = function (grunt) {

    //bower js files
    var jsFiles = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jcarousel/dist/jquery.jcarousel.js',
        'bower_components/jcarousel/dist/jquery.jcarousel-pagination.js',
        'bower_components/jquery.entwine-dist/index.js',
        'bower_components/jquery.cycle2/index.js',
        'bower_components/jquery.cycle2.swipe.min/index.js',
        'bower_components/jquery-form/jquery.form.js',
        'bower_components/selectize/dist/js/standalone/selectize.js',
        'bower_components/jquery.customSelect/jquery.customSelect.js',
        'bower_components/modernizr/modernizr.js',
	    'bower_components/jquery.cookie/jquery.cookie.js',
	    'bower_components/gsap/src/uncompressed/TweenMax.js',
	    'bower_components/jquery.easing/js/jquery.easing.js',
	    'bower_components/history.js/scripts/bundled-uncompressed/html4+html5/jquery.history.js',
	    //'bower_components/jquery-ui/jquery-ui.js'
    ];

    var themeDir = '../public_html/themes/default/';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                files: [
                    {
                        src: [
	                        themeDir + 'javascript/*.js',
	                        themeDir + 'javascript/**/*.js',
	                        '!' + themeDir + 'javascript/libs/*.js'
                        ],
                        dest: themeDir + 'build/site.js'
                    },
                    {
                        src: jsFiles.concat([themeDir + 'javascript/libs/*.js']),
                        dest: themeDir + 'build/libs.js'
                    }
                ],
	            sourceMap: true
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:mm") %> */\n',
                mangle: true,
                sourceMap: true
            },

            dist: {
                files: [
                    {
                        src: themeDir + 'build/libs.js',
                        dest: themeDir + 'build/libs.min.js'
                    },
                    {
                        src: themeDir + 'build/site.js',
                        dest: themeDir + 'build/site.min.js'
                    }
                ]

            }
        },
        clean: {
            options: { force: true },
            dist: [
                themeDir + 'build/site.js'
            ],
            dev: [
                themeDir + 'shop/build/libs.js'
            ]
        },
        copy: {
            dev: {
                expand: false,
                src: jsFiles,
                dest: themeDir + 'bower/'
            }
        },
        jshint: {
            dev: {
                src: [themeDir + 'shop/javascript/*.js']//,
//                options: {
//                    ignores: ['client/js/app/domReady.js']
//                }

            }
        },
        strip: {

            dist: {
                src: themeDir + 'build/*.min.js',

                options: {
                    inline: true,
                    nodes: ['console.log', 'debug']
                }
            }

        },

        watch: {
            options: {
                spawn: false
            },

            scripts: {
                files: [
                    themeDir + 'javascript/*.js',
                    themeDir + 'javascript/**/*.js'
                ],
                tasks: ['build:js']
            },

            styles: {
                files: [themeDir + 'scss/*.scss', themeDir +  'scss/**/*.scss'],
                tasks: ['compass:compile']
            }
        },

        compass: {
            // default options
            options: {
                config: themeDir + 'config.rb',
                basePath: themeDir,
                relativeAssets: true,
                quiet: true
            },

            // production
            dist: {
                options: {
                    environment: 'production',
                    force: true
                }
            },

            // dev
            compile: {

                options: {
                    environment: 'development',
                    force: false
                }

            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [themeDir + 'css/*.css', themeDir + 'javascript/*.js', themeDir +  'javascript/**/*.js', themeDir + 'templates/*.ss', themeDir + 'templates/**/*.ss']
                },
                options: {
                    watchTask: true, // < VERY important
//                    server: {
//                        baseDir: themeDir
//                    }
                    proxy: "ss-default.local",
                    browser: ["google chrome"]
                }
            }
        },

        // Adds some text to some files
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '// Web Torque Default SilverStripe website' +
                        '\n// Source file generated on <%= grunt.template.today("dd-mm-yyyy") %> at <%= grunt.template.today("h:MM:ss TT") %>' +
                        '\n// @Copyright Web Torque <%= grunt.template.today("yyyy") %>'
                },
                files: {
                    src: [
                        themeDir + 'js/build/*.js'
                    ]
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-banner');

    // Default task(s).
    grunt.registerTask('default', ['browserSync' ,'watch', 'jshint']);
    grunt.registerTask('build:js', ['jshint', 'concat:js']);
    grunt.registerTask('build:dev', ['jshint', 'concat:js', 'compass:compile']);
    grunt.registerTask('build', ['jshint', 'concat:js', 'compass:compile', 'strip:dist', 'uglify:dist', 'usebanner:dist']);


};