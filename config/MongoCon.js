var MongoClient =  require('mongodb').MongoClient;
var kers= require('./keys')
var url = kers.MongoDB.key;

module.exports.init=function(cb){
MongoClient.connect(url,{useNewUrlParser:true},cb);
console.log("connected to mongo!!")
}