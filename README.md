Gulp - AngularJS Starter Project
==============================

This repository contains a starter project using AngularJS.
Based on [gulp-angularjs-starter-project](https://github.com/wlepinski/gulp-angularjs-starter-project)

### Compilation phase

To compile the project go to a terminal window pointing to the project's root folder. First of all you need to install all Node dependencies using the command <code>npm install</code>. This will take some time and after that you can use the <code>gulp</code> or <code>gulp compile</code> commands to compile your project.

The compilation result will be stored on the <code>build</code> folder.

The compilation phase has some steps described below:

- Cleans the build folder.
- Compile all css (less and compass see )
- Lint all JS files
  - If there's something wrong it stops the stream and show all linting errors on console.
- Creates a new header based on some information available on package.json to be inserted on top off every CSS and JS files.
- Instrospect all HTML files and find all compilation comments.
  - For both CSS and JS we're minifying (uglyfing for JS) and revisioning all files present inside a compilation comment.
  - For JS files, runs ngMin to assemble AngularJS DI dependencies that doesn't follow the <code>['dep', function(dep){ }]</code> convention.
  - Concatenate all JS libraries and insert a SHA fingerprint on the file.
  - Inject a compiled version of all views.
- Copy images files and optimize them.
- Minify all entry HTML files.
- Drop the compilated HTML file on the build directory.

### Serve tasks

There's two serve tasks available to be used. The <code>gulp serve:app</code> and the <code>gulp serve:build</code>.

The <code>gulp serve:app</code> should be used during development. It uses a connect server pointing to the <code>app</code> folder and configures a Livereload server to automatically refresh files. This task depends on another task called watch, that does exactly what you expect it to do.

The <code>gulp serve:build</code> should be used to test the whole compilation process. It uses a connect server pointing to the <code>build</code> folder and there's no Livereload server running on this task.

### Build compass
- Compile all SASS files and drop then on the .tmp folder.
  - Refresh the livereload server
  - If there's something wrong it stops the stream and show all compilation errors on console.

To build compass, install gulp-compass
```bash
$ npm i --save-dev gulp-compass
```
Uncomment this line
```js
// var compass = require('gulp-compass');
```

add compass in array CSS_COMPILE
```js
var CSS_COMPILE = ['compass', 'nativeCss'];
```

### Build less
- Compile all less files and drop then on the .tmp folder.
  - Refresh the livereload server

To build less, install gulp-less
```bash
$ npm i --save-dev gulp-less
```
Uncomment this line
```js
// var less = require('gulp-less');
```

add less in array CSS_COMPILE
```js
var CSS_COMPILE = ['less', 'nativeCss'];
```

## Authors

 - [David Touzet](https://github.com/eyolas) 
 - [William Lepinski](william.lepinski@rga.com) ([gulp-angularjs-starter-project](https://github.com/wlepinski/gulp-angularjs-starter-project))

## License

The [MIT](LICENCE) License



