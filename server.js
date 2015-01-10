var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var folder = '';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, folder)));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, folder));
});

app.listen(8000);
console.log("App listening on port 8000");