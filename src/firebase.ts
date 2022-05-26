import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyDRsf_H_np0tpVCpPFs4vYMmSYJMGQZlaM",
  authDomain: "collage-email-classification.firebaseapp.com",
  databaseURL: "https://collage-email-classification-default-rtdb.firebaseio.com",
  projectId: "collage-email-classification",
  storageBucket: "collage-email-classification.appspot.com",
  messagingSenderId: "132291225491",
  appId: "1:132291225491:web:ec45411260cb175429aa66"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const firebaseDatabase = firebase.database();
const firebaseauth = firebase.auth();

export {
  firestore , 
  firebaseDatabase,
  firebaseauth
}