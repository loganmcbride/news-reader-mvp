var express = require('express');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');
var db = require('../database/index.js');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/items', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/stories', function (req, res) {
  db.saveQuery(req.query.data);
  helpers.searchQuery(req.query.data, function(input){
    res.send(input);
  })
});

app.delete('/stories', function (req, res) {
  db.clearSearchHistory()
  res.sendStatus(202);
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
