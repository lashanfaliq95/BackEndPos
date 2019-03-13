const client = require('./mongo_client');
const db=require('./db_object');

module.exports = function insert_documents(collectionname, documents) {
    return new Promise((resolve, reject) => {
        const collection = db.name.collection(collectionname);
        collection.insertMany(documents, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
}