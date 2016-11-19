(function () {
	/*
	 * grunt-better-build-number
	 * https://github.com/benjamingwynn/grunt-better-build-number
	 *
	 * Copyright (c) 2014 Camille Reynders
	 * Copyright (c) 2016 Benjamin Gwynn (http://xenxier.com)
	 * Licensed under the MIT license.
	 */

	'use strict';
	/*jslint node:true*/

	module.exports = function (grunt) {
		// load all npm grunt tasks
		grunt.loadNpmTasks('grunt-jslint');

		// Project configuration.
		grunt.initConfig({
			jslint: {
				all: {
					src: [
						'Gruntfile.js',
						'tasks/*.js'
					],

					directives: {
						white: true
					}
				}
			}
		});

		// By default, lint and run all tests.
		grunt.registerTask('default', ['jslint']);
	};
}());
