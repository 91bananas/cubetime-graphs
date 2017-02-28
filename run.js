var fs = require('fs');
var _ = require('underscore');
var watchify = require('watchify');
var mkdirp = require('mkdirp'),
    chalk = require('chalk');

var compileUnderscore = require('node-underscorify').transform({
    templateSettings: {
        evaluate: /\{\{#(.+?)\}\}/g,
        interpolate: /\{\{=(.+?)\}\}/g,
        escape: /\{\{(?!#|=)(.+?)\}\}/g
    }
});
var files = [
    ['index.js', 'build.js']
];

var watching = false;
var initConfig = {
    entries: _.pluck(files, 0),
};

if (process.argv[2] == '--watch') {
    watching = true;
    initConfig.cache = {};
    initConfig.packageCache = {};
    initConfig.plugin = [watchify];
}

var b = require('browserify')(initConfig);
// b.plugin('factor-bundle', {
//     outputs: _.pluck(files, 1)
// });
b.transform('lessify');
b.transform(compileUnderscore);

b.on('update', doTheThing);
doTheThing();
function doTheThing(e) {
    console.log(chalk.cyan('Starting build!'));
    mkdirp('./bundles/', function (err) {
        if (err) {
            console.log(chalk.bgRed.white(err));
        } else {
            b.bundle(function (err, buf) {
                // console.log(buf.toString());
                if (buf) {
                    var message = 'Bundles created.';
                    if (watching) {
                        message += chalk.yellow(' Watchifying...');
                    }
                    console.log(message);
                }
            })
            .on('error', function (err) {
                console.log(chalk.bgRed.white(err.message));
            });
        }
    });
}
