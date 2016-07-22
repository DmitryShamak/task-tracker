var express = require("express");
var app = express();

app.use('/', express.static(__dirname));
app.use('/bower_components', express.static(__dirname + "/bower_components"));
app.use('/build', express.static(__dirname + "/build"));

app.listen(3001);

