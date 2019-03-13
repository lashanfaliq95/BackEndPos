const MongoClient=require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

const client=new MongoClient(url);

module.exports=client;