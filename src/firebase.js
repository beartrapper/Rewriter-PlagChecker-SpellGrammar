import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0my9sWgU-Th6zME5y1dDMGYGV281yvlI",
  authDomain: "automationsmm.firebaseapp.com",
  databaseURL: "https://automationsmm.firebaseio.com",
  projectId: "automationsmm",
  storageBucket: "automationsmm.appspot.com",
  messagingSenderId: "247795926680",
  appId: "1:247795926680:web:571c65c43cedaa7a9872ed",
  measurementId: "G-3ZESS45C3V"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default firebase;
