(function () {
	'use strict';
	/*jslint node:true*/

	module.exports = function (grunt) {
		grunt.loadTasks('../tasks');

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),

			buildnumber: {
				main: {
					options: {
						field: 'whatever.build',
						forceTabIndentation: true
					}
				}
			}
		});

		grunt.registerTask('default', ['buildnumber']);
	};
}());
