module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true,
    },
    content: [
        './dist/**/*.html',
        './src/templates/**/*.njk',
        './src/assets/js/**/*.js'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
}
