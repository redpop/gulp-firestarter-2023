# Gulp starter kit 2020

[![Netlify Status](https://api.netlify.com/api/v1/badges/9f6f1057-2ce5-44f6-9b4a-47430a9bb5c8/deploy-status)](https://app.netlify.com/sites/gulp-firestarter-2020/deploys)

https://gulp-firestarter-2020.netlify.app/

## Tasks

- clean (dist folder)
- copy (static assets)
- images ([imagemin](https://www.npmjs.com/package/imagemin))
- javascript ([Parcel](https://parceljs.org))
- postcss ([PostCSS](https://www.npmjs.com/package/postcss))
- server ([Browsersync](https://www.npmjs.com/package/browser-sync))
- [stylelint](https://www.npmjs.com/package/stylelint)
- templates ([11ty](https://www.11ty.dev/))

## Features

- [11ty](https://www.11ty.dev/)
- [Browserslist](https://github.com/browserslist/browserslist)
- [Tailwind CSS](https://tailwindcss.com)
- [Cypress](https://www.cypress.io) / [Mocha](https://mochajs.org)
- [EditorConfig](https://editorconfig.org)
- [ECMAScript modules](https://github.com/standard-things/esm)
- [ESLint](https://eslint.org)
- [Prettier](https://www.npmjs.com/package/prettier)
- [Sentry](https://sentry.io)
- [Storybook](https://storybook.js.org)

## Notes

### Browsersync

If you want to use Browsersync in conjunction with HTTPS then you can use [mkcert](https://mkcert.org) and add the certs
into the ```/certs``` folder.  
The settings for HTTPS are in ```/gulpfile.esm.js/server.js```
