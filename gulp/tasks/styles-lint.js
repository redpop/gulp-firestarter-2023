const { src } = require('gulp');

const stylelint = require('@ronilaukkarinen/gulp-stylelint');

const config = require('../config');

function stylesLint() {
    return src(`${config.stylesSrcPath}/**/*.scss`).pipe(
        stylelint({
            failAfterError: false,
            reporters: [{ formatter: 'string', console: true }],
        }),
    );
}

exports.stylesLint = stylesLint;
