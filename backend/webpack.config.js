var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    target: 'node',
    node: {
        __dirname: true,
        __filename: true,
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: nodeModules
    /* https://github.com/webpack-contrib/css-loader/issues/447
     * https://github.com/socketio/socket.io/issues/3249
     * https://jlongster.com/Backend-Apps-with-Webpack--Part-I#Getting-Started
     */
    /*
    node: {
            fs: 'empty',
            net: "empty",
            uws: "empty"
        }
     */
};