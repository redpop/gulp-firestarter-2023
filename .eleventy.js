const config = require('./gulp/config');

module.exports = {
    dir: {
        input: config.templatesPath,
        output: config.distPath,
    },
};
