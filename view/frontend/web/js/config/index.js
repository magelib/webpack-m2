'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const fse = require('fs-extra')

const RELATIVE_XML_PATH = '../../../../../../../../../vendor/erickpatrick/webpack-magento2/view/frontend/layout/default_head_blocks.xml'
const CUSTOM_NAMESPACE = 'CUSTOM'
const WEBPACK_MAGENTO_NAMESPACE = 'Webpack_Magento2'
const LOCALIZED_STATIC_DEPLOYED_FOLDER = './../../'

const dirs = p => fse.readdirSync(p).filter(f => {
  return fse.statSync(`${p}/${f}`).isDirectory() && fse.existsSync(`${p}/${f}/js/src`)
})

const entries = dirs(LOCALIZED_STATIC_DEPLOYED_FOLDER)
  .filter(item => item.includes(CUSTOM_NAMESPACE) && !item.includes(WEBPACK_MAGENTO_NAMESPACE))
  .map(dir => {
    fse.copySync(`${LOCALIZED_STATIC_DEPLOYED_FOLDER}${dir}/js/src`, `./src/${dir}`)

    if (fse.existsSync(`${LOCALIZED_STATIC_DEPLOYED_FOLDER}${dir}/js/test`)) {
      fse.copySync(`${LOCALIZED_STATIC_DEPLOYED_FOLDER}${dir}/js/test/unit/specs`, `./test/unit/specs/${dir}`)
    }
    
    if (fse.existsSync(`${LOCALIZED_STATIC_DEPLOYED_FOLDER}${dir}/js/static`)) {
      fse.copySync(`./../../${LOCALIZED_STATIC_DEPLOYED_FOLDER}${dir}/js/static`, `./static`)
    }

    return `./src/${dir}/main.js`
  })

entries.unshift(`./entry-point.js`)

module.exports = {
  entries: entries,
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    xmlPath: path.resolve(__dirname, RELATIVE_XML_PATH),

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    xmlPath: path.resolve(__dirname, RELATIVE_XML_PATH),

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
