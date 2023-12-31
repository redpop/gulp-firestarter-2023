module.exports = {
    browsersync: {
        previewDirectory: false,
        serverDirectory: false,
        port: 8080,
        scrollMode: false,
    },
    cleanPath: 'dist',
    distPath: 'dist/',
    includePathsForSass: 'node_modules',
    javascriptDistPath: 'dist/javascript',
    javascriptEntries: 'src/assets/javascript/app.js',
    javascriptSrcPath: 'src/assets/javascript',
    sourcePath: 'src',
    staticAssets: ['src/assets/images/**/*'],
    staticAssetsBase: 'src/assets',
    stylesDistPath: 'dist/styles',
    stylesSrcPath: 'src/assets/styles',
    templatesPath: 'src/templates',
};
