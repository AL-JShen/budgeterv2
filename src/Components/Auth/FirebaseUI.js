import firebase from 'firebase';
import firebaseui from 'firebaseui';

// App settings/details
const config = {
  apiKey: "AIzaSyAL6kQphqhxpn-Q-QOpZJ_2cwgfAH7ZnuU",
  authDomain: "budgetv2.firebaseapp.com",
  databaseURL: "https://budgetv2.firebaseio.com",
  projectId: "budgetv2",
  storageBucket: "budgetv2.appspot.com",
  messagingSenderId: "70428616163"
};

// Initialize app and start firebase
firebase.initializeApp(config);


// Set up authentication methods
var uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/overview',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

// This sets up firebaseui
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// This adds firebaseui to the page
const FirebaseUI = (elementId) => {
  ui.start(elementId, uiConfig);
}

export default FirebaseUI;
