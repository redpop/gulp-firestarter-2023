# Gulp starter kit 2023

[![Netlify Status](https://api.netlify.com/api/v1/badges/9f6f1057-2ce5-44f6-9b4a-47430a9bb5c8/deploy-status)](https://app.netlify.com/sites/gulp-firestarter-2023/deploys)

https://gulp-firestarter-203.netlify.app/

## Tasks

- clean (dist folder)
- copy (static assets)
- javascript ([rollup.js](https://www.rollupjs.org/))
- sass ([Sass](https://sass-lang.com/))
- server ([Browsersync](https://www.npmjs.com/package/browser-sync))
- [stylelint](https://www.npmjs.com/package/stylelint)
- templates ([11ty](https://www.11ty.dev/))

## Features

- [11ty](https://www.11ty.dev/)
- [Browserslist](https://github.com/browserslist/browserslist)
- [EditorConfig](https://editorconfig.org)
- [ECMAScript modules](https://github.com/standard-things/esm)
- [ESLint](https://eslint.org)
- [Netlify](https://www.netlify.com)
- [Prettier](https://www.npmjs.com/package/prettier)

## Notes

### Browsersync

If you want to use Browsersync in conjunction with HTTPS then you can use [mkcert](https://mkcert.org) and add the certs
into the ```/certs``` folder.  
The settings for HTTPS are in ```/gulpfile.esm.js/server.js```
