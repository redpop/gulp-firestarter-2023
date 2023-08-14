const { parallel, series } = require('gulp');

function build(done) {
    series('clean', parallel('templates', 'javascript', 'copy'), 'styles', 'stylesLint')(done);
}

exports.build = build;
