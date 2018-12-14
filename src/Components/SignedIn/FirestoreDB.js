import firebaseApp from '../../firebase'

// Initialize Cloud Firestore through Firebase
let db = firebaseApp.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export default db;
