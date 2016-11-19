(function () {
	/*
	 * grunt-build-number
	 * https://github.com/creynders/grunt-build-number
	 *
	 * Copyright (c) 2014 Camille Reynders
	 * Licensed under the MIT license.
	 */

	'use strict';
	/*jslint node:true*/

	module.exports = function (grunt) {
		// load all npm grunt tasks
		require('load-grunt-tasks')(grunt);

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
