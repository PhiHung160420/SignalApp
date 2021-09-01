import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD5fHstEH2p0NsEb2BK3zIgoNhS9FyoSpY",
    authDomain: "signalapp-1a8f7.firebaseapp.com",
    projectId: "signalapp-1a8f7",
    storageBucket: "signalapp-1a8f7.appspot.com",
    messagingSenderId: "472548134406",
    appId: "1:472548134406:web:3e19e193e19af864697d87",
    measurementId: "G-46BKP0M2M1",
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
