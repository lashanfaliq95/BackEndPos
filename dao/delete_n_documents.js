const client = require('./mongo_client');
const db = require('./db_object');
const find_documents = require('./find_documents');

module.exports = function delete_n_documents(collectionName, query, n) {
    return new Promise((resolve, reject) => {
        const collection = db.name.collection(collectionName);
        find_documents(collection, query, n).then((results) => {
            collection.remove({ query }, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        }).catch((err) => {
            console.error(err);
        });
    });
}