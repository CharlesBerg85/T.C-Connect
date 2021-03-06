import * as functions from "firebase-functions";
import * as admin from 'firebase-admin'
admin.initializeApp();
const env = functions.config();

import algoliasearch from 'algoliasearch';


// Initialize the Algolia Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('users');

exports.users = functions.firestore
    .document('users')
    .onCreate((snap, context) => {
        const data = snap.data();
        const objectId = snap.id;

        // add the data to the algoia index
        return index.saveObject({
            objectId,
            ...data
        });
    })

    exports.unindexedUsers = functions.firestore
    .document('users')
    .onDelete((snap, context) => {
        const objectId = snap.id;

        // delete an ID from the index
        return index.deleteObject(objectId);
    })
