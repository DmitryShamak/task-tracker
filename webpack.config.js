var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
    entry: "./app/app.js",
    output: {
        path: __dirname + "/build/",
        filename: "build.js"
    },
    module: {
        loaders: [{ test: /\.scss$/i, loader: extractCSS.extract(['css','sass', "autoprefixer"]) }]
    },
    plugins: [
        extractCSS
    ]
};