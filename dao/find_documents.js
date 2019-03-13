const client = require('./mongo_client');
const db = require('./db_object');

module.exports = function find_documents(collectionName, query, limit) {
    return new Promise((resolve, reject) => {
        const collection = db.name.collection(collectionName);
        if (limit) {
            collection.find({ query }).limit(limit).sort({timestamp:-1}).toArray((err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        } else {
            collection.find({ query }).sort({timestamp:-1}).toArray((err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        }
    });
}

