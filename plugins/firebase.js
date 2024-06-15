import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';



  const firebaseConfig = {
    apiKey: "AIzaSyBqkp1wzyidGp2Vu-rJOGH4WivWOQJSnEo",
    authDomain: "horoscope-47b18.firebaseapp.com",
    projectId: "horoscope-47b18",
    storageBucket: "horoscope-47b18.appspot.com",
    messagingSenderId: "819080479013",
    appId: "1:819080479013:web:e4178a6e5b1da8f1755acc",
    measurementId: "G-JVSRDE1D99",
    databaseURL: "https://horoscope-47b18-default-rtdb.firebaseio.com"
  };

// Check if the Firebase app is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
