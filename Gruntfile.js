'use strict';

module.exports = function( grunt ) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		// Task configuration.
		clean: {
			files: [ 'dist' ]
		},


		// production pipeline tasks
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: [ 'src/frood/*.js' ],
				dest: 'dist/<%= pkg.name %>.js'
			},
		},

		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/<%= pkg.name %>.min.js'
			},
		},


		// code quality and tests
		cucumber: {
			test: {
				features: 'features'
			},
			options: {
				profile: 'grunt'
			}
		},

		casper: {
			acceptance: {
				options: {
					test: true,
					concise: true,
					parallel: true
				},
				files: {
					'test/acceptance/casper.xml' : [ 'test/acceptance/*.js' ]
				}
			}
		},

		qunit: {
			files: [ 'test/unit/*.html' ]
		},

		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: [ 'src/**/*.js' ]
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: [ 'test/**/*.js' ]
			},
		},

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: [ 'jshint:gruntfile' ]
			},
			test: {
				files: [
					'<%= jshint.src.src %>',
					'<%= jshint.test.src %>',
				],
				tasks: [ 'test' ]
			},
		},


		// local server
		connect: {
			cucumber: {
				options: {
					port: 9009,
					base: '.'
				}
			}
		}
	});


	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-rcukes' );
	grunt.loadNpmTasks( 'grunt-casper' );


	// Default task.
	grunt.registerTask( 'test', [ 'jshint', 'qunit', 'casper' ]);
	grunt.registerTask( 'uat', [ 'connect:cucumber', 'cucumber' ]);
	grunt.registerTask( 'produce', [ 'clean', 'concat', 'uglify' ]);
	grunt.registerTask( 'default', [ 'test', 'produce', 'uat' ]);

};
