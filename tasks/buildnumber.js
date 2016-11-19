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

	var findup = require('findup-sync'),
		S = require('string');

	module.exports = function (grunt) {

		grunt.registerMultiTask('buildnumber', 'Grunt plugin for maintaining a build number in package.json', function () {
			var files = this.files,
				useTabsInsteadOfSpaces = false,
				filepath,
				contents,
				json,
				buildNum,
				newLineMatches,
				newLineMatchIndex,
				cleanNewLineMatch,
				spaceCount = 0,
				stringified,
				lines,
				spaceIndex,
				space = '',
				options = this.options({ // Default options if none provided
					field: 'build',
					dontChangeIndentation: true,
					forceTabIndentation: false
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
						contents = new S(grunt.file.read(filepath));

						if (options.dontChangeIndentation) {
							// use this regular expression to get all the new lines and their leading spaces
							newLineMatches = contents.match(new RegExp("\n *", "g"));

							for (newLineMatchIndex = 0; newLineMatchIndex < newLineMatches.length; newLineMatchIndex += 1) {
								newLineMatches = new S(newLineMatches[newLineMatchIndex]);

								// remove new line characters
								cleanNewLineMatch = newLineMatches.replaceAll('\n', '');

								// count space characters, the only characters remaining
								spaceCount = cleanNewLineMatch.length;

								if (spaceCount) {
									break;
								}
							}

							// if there is still no spacecount
							if (!spaceCount) {
								// default to 2 spaces
								spaceCount = 2;

								// if contains a space use spaces instead
								useTabsInsteadOfSpaces = contents.contains('\t');
							}
						} else {
							// default to 2 spaces
							spaceCount = 2;
						}

						json = JSON.parse(contents);
						buildNum = json[options.field];

						if (buildNum !== undefined) {
							buildNum = parseInt(buildNum, 10) + 1;
						} else {
							buildNum = 1;
						}

						json[options.field] = buildNum.toString();
						stringified = JSON.stringify(json, null, spaceCount);

						if (useTabsInsteadOfSpaces || options.forceTabIndentation) {
							for (spaceIndex = 0; spaceIndex < spaceCount; spaceIndex += 1) {
								space += ' ';
							}

							lines = stringified.split('\n');
							stringified = '';
							lines.forEach(function (line) {
								line = new S(line);
								line = line.replaceAll(space, '\t');
								stringified += line + '\n';
							});
						}

						grunt.file.write(filepath, stringified);
						grunt.log.oklns('Build number set to "' + buildNum + '" in "' + filename + '".');
					} else {
						grunt.fail.fatal("file(s) not found: " + file.orig.src);
					}
				});
			});
		});
	};
}());
