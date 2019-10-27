import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDnBrv_sCauLdlTkIWo3tzF6EOSAurKC_U",
  authDomain: "newagent-ywwgio.firebaseapp.com",
  projectId: "newagent-ywwgio"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db;

