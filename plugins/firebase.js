import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCE3qtmBF-NGKJKIXQRzEM3VyVBKeE9dTM",
  authDomain: "carbon-185cf.firebaseapp.com",
  projectId: "carbon-185cf",
  storageBucket: "carbon-185cf.firebasestorage.app",
  messagingSenderId: "261000389665",
  appId: "1:261000389665:web:850593183644fe375fef60",
  measurementId: "G-KTQFCNBZ7D",
  databaseURL: "https://carbon-185cf-default-rtdb.firebaseio.com/"
};

// Check if the Firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;