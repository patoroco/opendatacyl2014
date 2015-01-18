var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var folder = '';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, folder)));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.set('port', (process.env.PORT || 8000))
app.listen(app.get('port'));
console.log("App listening on port " + app.get('port'));