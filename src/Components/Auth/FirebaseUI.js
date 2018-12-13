import firebase from 'firebase';
import firebaseui from 'firebaseui';

// App settings/details
const config = {
  // removing api key for github 
};

// Initialize app and start firebase
firebase.initializeApp(config);

// Set up authentication methods
var uiConfig = {
  signInSuccessUrl: 'https://google.ca',
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
