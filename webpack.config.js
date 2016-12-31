var webpack = require('webpack');
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

nodeModules['iconv'] = 'commonjs iconv';
nodeModules['webpage'] = 'commonjs webpage';
nodeModules['system'] = 'commonjs system';

module.exports = {

    entry:  {
        'client': './src/client.ts'
    } ,
    externals: nodeModules,
    target: 'node',
    node: {
        __filename: false,
        __dirname: false
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        library: 'ng1-server-node-client',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.ts']
    },
    devtool: 'inline-source-map',
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ],
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};