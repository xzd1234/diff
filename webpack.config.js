const path = require('path');
module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map', 
    output: {
        publicPath: 'xuni',
        filename: 'bundle.js',
    },
    devServer: {
        port: 8080,
        open: true,
        contentBase: 'public'
    }
}