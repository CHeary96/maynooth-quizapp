import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDbL_8YYZKAPIoakRlOr0n4hbhLy_qFV9U',
  authDomain: 'quiz-77433.firebaseapp.com',
  projectId: 'quiz-77433',
  storageBucket: 'quiz-77433.appspot.com',
  messagingSenderId: '643743918135',
  appId: '1:643743918135:web:218c79e2e7dc98a294f7b2',
  measurementId: 'G-G256RJKZ0N',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth, firebase };
