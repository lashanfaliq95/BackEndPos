const client=require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

const MongoClient=new client(url);

module.exports=MongoClient;