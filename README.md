# grunt-better-build-number

> Grunt plugin for maintaining a build number in package.json (or another file)

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-better-build-number --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-better-build-number');
```

## The "buildnumber" task

### Overview
In your project's Gruntfile, add a section named `buildnumber` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  buildnumber: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

(due to how grunt handles tasks this **`buildnumber` object has to be present in the grunt configuration and has to have at least one target defined**, even when using the default options. Just leave the object empty, e.g. `buildnumber: { package:{} }`)

### Options

#### options.field
Type: `String`
Default value: `build`

A string value that is used as the name of the field in the json file to store the build number. This be dotty, meaning it can reference fields nested inside other fields, see the [Dotty documentation](http://deoxxa.github.io/dotty/docs/) for more information. (Note that as of right now, this value must be a string and not an array, contrary to the Dotty docs)

#### options.dontChangeIndentation
Type: `Boolean`
Default value: `true`

When changing the build number in the JSON file, avoid changing the indentation structure to the NPM-preferred 2-space indent.

#### options.forceTabIndentation
Type: `Boolean`
Default value: `false`

Force the files changed by grunt-better-build-number to be tab indented rather than space indented.

#### options.forceDotty
Type: `Boolean`
Default value: `false`

Force the field lookup to use Dotty internally. This option should never need to be set - if you need to set it, consider filing an issue.

### Usage Examples

#### Default Options

```js
//Gruntfile.js
grunt.initConfig({
  buildnumber: {
    package : {}
  }
})
```

```sh
$ grunt buildnumber
```

The task will search for the `package.json` file in your project, load it and bump/create the `build` field. Output will be similar to:

```sh
Running "buildnumber:package" (buildnumber) task
>> Build number set to "463" in "package.json".

Done, without errors.
```

#### Custom Options

```js
grunt.initConfig({
  buildnumber: {
    options: {
      field: 'buildnum',
	  dontChangeIndentation: false
    },
    files: ['package.json', 'bower.json']
  }
})
```

This will update a `buildnum` field inside `package.json` and `bower.json`.

## Contributing
Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 1.0.0: release of grunt-better-build-number

## License
Copyright (c) 2016 Benjamin Gwynn. Licensed under the MIT license.
Copyright (c) 2014 Camille Reynders. Licensed under the MIT license.
