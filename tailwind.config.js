module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true,
    },
    purge: {
        content: [
            './dist/**/*.html',
            './src/templates/**/*.njk',
            './src/assets/js/**/*.js'],
    },
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
};
