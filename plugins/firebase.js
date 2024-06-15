import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

  const firebaseConfig = {
    apiKey: "AIzaSyCtAnqquqD4oYzGAcqDXA-yNJDM_TdGecg",
    authDomain: "carbon-e900f.firebaseapp.com",
    projectId: "carbon-e900f",
    storageBucket: "carbon-e900f.appspot.com",
    messagingSenderId: "830495790488",
    appId: "1:830495790488:web:84254cc62bc0026653c7ed",
    measurementId: "G-T1BHZWSPXD",
    databaseURL: "https://carbon-e900f-default-rtdb.firebaseio.com/"
  };

// Check if the Firebase app is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;