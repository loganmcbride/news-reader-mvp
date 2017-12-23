var request = require('request');
var api = require('../api_token.js');


var searchQuery = function(query, cb){
  request.get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': api.apiKey.APIKEY,
      'q': query,
      'sort': "newest"
    },
  }, function(err, response, body) {
    if(err){return err}
    body = JSON.parse(body);
    cb(body);
  })
};


module.exports.searchQuery = searchQuery;
