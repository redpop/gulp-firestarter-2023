const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

const {rimraf} = require('rimraf');

function clean(done) {
    rimraf("dist");
    done();
}

exports.clean = clean
