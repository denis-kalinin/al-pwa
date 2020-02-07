# al-pwa [![Build Status](https://travis-ci.org/denis-kalinin/al-pwa.svg?branch=master)](https://travis-ci.org/denis-kalinin/al-pwa)

## Project descirption
Simple PWA (progressive web application) on Vue.js in TypeScript.
Features:
- [Vuetify](https://vuetifyjs.com/)
- [Material icons font](https://material.io/resources/icons/)
- [Lazy loading](https://router.vuejs.org/guide/advanced/lazy-loading.html) - click "About" in demo
- Offline detection

Build pipeline with [Travis-CI](.travis.yml) and deploy to [Yandex.Cloud](https://al-pwa.website.yandexcloud.net/).

## Demo
https://al-pwa.website.yandexcloud.net/


## Project setup from source code
If you don't have [Node.js](https://nodejs.org/) installed and don't want to, then you can test ANT build - if you have Java and [Ant](https://ant.apache.org/) installed. Go to [Java build](#java-build)
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Java build
For those with only Java try Ant build. If you are on Linux run
`ant -f /opt/ant/fetch.xml -Ddest=system` before.
To build the project:
```bash
ant npm
```
&mdash; it will download Node.js to `~/.ant/node` and under the hood runs commands:
- `~/.ant/node/npm install`
- `~/.ant/node/npm run build`

__The result of the build is in the `dist` directory!__


[How to write a Vuejs app in Typescript]:https://blog.logrocket.com/how-to-write-a-vue-js-app-completely-in-typescript/