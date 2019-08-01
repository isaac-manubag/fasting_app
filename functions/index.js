const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 */
const createProfile = (userRecord) => {

  return db
    .collection('users')
    .doc(userRecord.uid)
    .set({ 
      email: userRecord.email,
      displayName: userRecord.displayName,
      uid: userRecord.uid,
      photoURL: userRecord.photoURL,
      provider: userRecord.providerData[0].providerId,
      hasActiveFast: false
    })
    .catch(console.error);
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
};
