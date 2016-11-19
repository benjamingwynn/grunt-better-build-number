(function () {
	/*
	*	grunt-build-number
	*	https://github.com/creynders/grunt-build-number
	*
	*	Copyright (c) 2014 Camille Reynders
	*	Copyright (c) 2016 Benjamin Gwynn (http://xenxier.com)
	*	Licensed under the MIT license.
	*/

	'use strict';
	/*jslint node:true*/

	var findup = require('findup-sync');

	module.exports = function (grunt) {
		grunt.registerMultiTask('buildnumber', 'Grunt plugin for maintaining a build number in package.json', function () {
			var files = this.files,
				filepath,
				meta,
				buildNum,
				options = this.options({ // Default options if none provided
					field : 'build'
				});

			if (!files.length) {
				files = [
					{
						src : ["package.json"]
					}
				];
			}

			files.forEach(function (file) {
				file.src.forEach(function (filename) {
					filepath = findup(filename);

					if (filepath && grunt.file.exists(filepath)) {
						meta = grunt.file.readJSON(filepath);
						buildNum = meta[options.field];

						if (buildNum !== undefined) {
							buildNum = parseInt(buildNum, 10) + 1;
						} else {
							buildNum = 1;
						}

						meta[options.field] = buildNum.toString();
						grunt.file.write(filepath, JSON.stringify(meta, null, 2));
						grunt.log.oklns('Build number set to "' + buildNum + '" in "' + filename + '".');
					} else {
						grunt.fail.fatal("file(s) not found: " + file.orig.src);
					}
				});
			});
		});
	};
}());
