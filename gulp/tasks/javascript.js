const spawn = require('cross-spawn');

function javascript() {
    return spawn('rollup', ['-c', 'rollup.config.mjs'], {
        stdio: 'inherit',
    });
}

exports.javascript = javascript;
