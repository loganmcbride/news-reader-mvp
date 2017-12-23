var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var querySchema = mongoose.Schema({
  query: String
});

var Item = mongoose.model('Item', querySchema);

var saveQuery = function(query) {
  var keyword = {query: query};
  Item.find(keyword, function(error, output){
    if(error){ console.log('save query error: ',error)}
    if (output.length < 1){
      var savable = new Item({query: query});
      savable.save(function(error){
        if (error){
          console.log('savable error ',error)
        } else { console.log(query,' persisted successfully')}
      })
    }
  })
}

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var clearSearchHistory = function() {
  Item.remove({}, function(err){
    if(err) {
      console.log('History clear error: ',err)
    } else { console.log('History cleared') }
  })
};

module.exports.selectAll = selectAll;
module.exports.saveQuery = saveQuery;
module.exports.clearSearchHistory = clearSearchHistory;
