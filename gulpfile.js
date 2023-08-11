const { dest, parallel, src, series, watch } = require("gulp");

const autoprefixer = require("autoprefixer");
const { babel } = require("@rollup/plugin-babel");
const browser = require("browser-sync");
const buffer = require("vinyl-buffer");
const dartSass = require("sass");
const nodeResolve = require("@rollup/plugin-node-resolve");
const multiEntry = require("@rollup/plugin-multi-entry");
const plugins = require("gulp-load-plugins");
const { rimraf } = require("rimraf");
const rollup = require("@rollup/stream");
const source = require("vinyl-source-stream");
const stylelint = require("@ronilaukkarinen/gulp-stylelint");
const spawn = require("cross-spawn");
const terser = require("gulp-terser");

const config = {
    browsersync: {
        directory: true,
        port: 8080,
        scrollMode: false,
    },
    cleanPath: ["dist/**/*"],
    distPath: "dist/",
    includePathsForSass: "node_modules",
    javascriptDistPath: "dist/javascript",
    javascriptEntries: "src/assets/javascript/app.js",
    javascriptSrcPath: "src/assets/javascript",
    sourcePath: "src",
    staticAssets: ["src/assets/images/**/*"],
    staticAssetsBase: "src/assets",
    stylesDistPath: "dist/styles",
    stylesSrcPath: "src/assets/styles",
    templatesPath: "src/templates",
};

const PRODUCTION = process.env.NODE_ENV === "production";
const $ = plugins();

async function serverTask() {
    await browser.init(
        // https://browsersync.io/docs/options
        {
            // proxy: "https://example.org",
            // host: "example.org",
            server: {
                baseDir: config.distPath,
                // index: "index.html",
                directory: config.browsersync.directory,
            },
            // https: {
            //     key: './certs/localhost+2-key.pem',
            //     cert: './certs/localhost+2.pem',
            // },
            open: false,
            port: config.browsersync.port,
            notify: false,
            ghostMode: {
                scroll: config.browsersync.scrollMode,
            },
        },
    );
}

async function browserReloadTask() {
    await browser.reload();
}

async function cleanTask() {
    await rimraf(config.cleanPath, { glob: true });
}

function copyTask() {
    return src(config.staticAssets, { base: config.staticAssetsBase }).pipe(dest(config.distPath));
}

let javascripCache;

function javascriptTask() {
    const options = {
        input: {
            include: config.javascriptEntries,
        },
        cache: javascripCache,
        plugins: [multiEntry(), nodeResolve(), babel({ babelHelpers: "bundled" })],
        output: {
            format: "iife",
            sourcemap: true,
        },
    };
    return (
        rollup(options)
            .on("bundle", (bundle) => {
                javascripCache = bundle;
            })
            .pipe(source("app.js"))
            .pipe(buffer())
            // .pipe($.if(!PRODUCTION, $.sourcemaps.init({ loadMaps: true })))
            .pipe($.if(PRODUCTION, terser({ keep_fnames: true, mangle: false })))
            // .pipe($.if(!PRODUCTION, $.sourcemaps.write(config.javascriptDistPath)))
            .pipe(dest(config.javascriptDistPath))
    );
}

function stylesLintTask() {
    return src(`${config.stylesSrcPath}/**/*.scss`).pipe(
        stylelint({
            failAfterError: false,
            reporters: [{ formatter: "string", console: true }],
        }),
    );
}

function stylesTask() {
    const sass = $.sass(dartSass);
    const postCssPlugins = [autoprefixer].filter(Boolean);

    return src(`${config.stylesSrcPath}/app.scss`)
        .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
        .pipe(
            sass({
                includePaths: config.includePathsForSass,
            }).on("error", sass.logError),
        )
        .pipe($.postcss(postCssPlugins))
        .pipe(
            $.if(
                PRODUCTION,
                $.cleanCss({
                    compatibility: "*",
                    level: 2,
                }),
                $.cleanCss({
                    compatibility: "*",
                    level: 2,
                    format: "beautify",
                }),
            ),
        )
        .pipe($.if(!PRODUCTION, $.sourcemaps.write(".")))
        .pipe(dest(config.stylesDistPath))
        .pipe(browser.reload({ stream: true }));
}

function templatesTask() {
    return spawn("npx", ["eleventy", "--quiet"], {
        stdio: "inherit",
    });
}

function watchTask() {
    watch(config.staticAssets, copyTask);
    watch(`${config.templatesPath}/**/*`).on("all", series(templatesTask, browserReloadTask));
    watch(`${config.stylesSrcPath}/**/*.scss`).on("all", series(stylesTask, stylesLintTask));
    watch(`${config.javascriptSrcPath}/**/*.js`).on("all", series(javascriptTask, browserReloadTask));
}

exports.build = buildTask;
exports.copy = copyTask;
exports.clean = cleanTask;
exports.javascript = javascriptTask;
exports.server = serverTask;
exports.styles = stylesTask;
exports.stylesLint = stylesLintTask;
exports.templates = templatesTask;

function buildTask(done) {
    series(cleanTask, parallel(templatesTask, javascriptTask, copyTask), stylesTask, stylesLintTask)(done);
}

exports.default = series(buildTask, serverTask, watchTask);
