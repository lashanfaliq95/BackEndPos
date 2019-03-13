const client = require('./mongo_client');
const db = require('./db_object');

module.exports = function delete_all_documents(collectionName, query) {
    return new Promise((resolve, reject) => {
        const collection = db.name.collection(collectionName);
        collection.deleteMany(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}