const { series } = require('gulp');

function defaultTask(done) {
    series('build', 'server', 'watch')(done);
}

exports.default = defaultTask;
