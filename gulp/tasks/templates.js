const spawn = require('cross-spawn');

function templates() {
    return spawn('npx', ['eleventy', '--quiet'], {
        stdio: 'inherit',
    });
}

exports.templates = templates;
