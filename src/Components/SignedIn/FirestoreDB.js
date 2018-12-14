import firebase from 'firebase';

// App settings/details
const config = {
  apiKey: "AIzaSyAL6kQphqhxpn-Q-QOpZJ_2cwgfAH7ZnuU",
  authDomain: "budgetv2.firebaseapp.com",
  databaseURL: "https://budgetv2.firebaseio.com",
  projectId: "budgetv2",
  storageBucket: "budgetv2.appspot.com",
  messagingSenderId: "70428616163"
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export default db;
