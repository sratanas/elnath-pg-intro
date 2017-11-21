var express = require('express');
var pg = require('pg');
var bodyParser = require ('body-parser');

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded[{extended: true}]);
app.use(express.static('server/public'));


app.listen(port, function(req, res){
    res.send('listening on port', port);
})