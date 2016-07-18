var path = require('path');

module.exports = {
    entry: "./app/app.js",
    output: {
        path: __dirname + "/build/",
        filename: "build.js"
    }
};