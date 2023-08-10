const { dest, parallel, src, series, watch } = require("gulp");

const { rimraf } = require("rimraf");

const config = {
    browsersync: {
        port: 8080,
        scrollMode: false,
    },
    cleanPath: ["dist/**/*"],
    distPath: "dist/",
    includePathsForSass: "node_modules",
    javascriptDistPath: "dist/javascript",
    javascriptEntriesFile: "src/assets/javascript/app.js",
    sourcePath: "src",
    staticAssets: ["src/assets/images/**/*"],
    staticAssetsBase: "src/assets",
    stylesDistPath: "dist/styles",
    stylesSrcPath: "src/assets/styles",
    templatesPath: "src/templates",
};

async function cleanTask() {
    await rimraf(config.cleanPath, { glob: true });
}

function copyTask() {
    return src(config.staticAssets, { base: config.staticAssetsBase }).pipe(dest(config.distPath));
}

function buildTask(done) {
    series(cleanTask, parallel(copyTask))(done);
}

exports.build = buildTask;
// exports.build = series(clean, parallel(templates, javascript, copy), styles);
exports.copy = copyTask;
exports.clean = cleanTask;
exports.default = series(buildTask);
// exports.default = series(build, server, watch);
