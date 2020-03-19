import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCablANLK4qaX_YT_-yFaNAX46F9ENzqJg",
  authDomain: "article-rewriter-156e1.firebaseapp.com",
  databaseURL: "https://article-rewriter-156e1.firebaseio.com",
  projectId: "article-rewriter-156e1",
  storageBucket: "article-rewriter-156e1.appspot.com",
  messagingSenderId: "643104054808",
  appId: "1:643104054808:web:c4c7f781ecfcfe16172d6d",
  measurementId: "G-1GSV8FMTW2"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
