var connection = require('../config/MongoCon');
var config = require('../config/db');


module.exports.insertOne=function(obj,col,cb){
	connection.init(function(err, client){
            var db1 = client.db(config.dbName);
        db1.collection(col).insertOne(obj, cb);
	});
}
	
module.exports.findOne=function(obj,col,cb){
	connection.init(function(err, client){
		var db1 = client.db(config.dbName);
		db1.collection(col).find(obj).toArray(cb);
	});
}

module.exports.find=function(col,cb){
	connection.init(function(err, client){
		var db1 = client.db(config.dbName);
		db1.collection(col).find().toArray(cb);
	});
}

module.exports.updateWhere=function(where, obj,col, cb){
	connection.init(function(err, client){
		var db1 = client.db(config.dbName);
		db1.collection(col).updateOne(where, {$set : obj},{multi: true}, cb);
	});
}

module.exports.remove=function(obj,col,cb){
	connection.init(function(err,client){
		var db1=client.db(config.dbName);
		db1.collection(col).remove(obj,cb)
	});
}