import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC-8sso_3_bNXdTP1TFU9rxQKWpoClIvGs",
    authDomain: "fireplace-store-final-project.firebaseapp.com",
    databaseURL: "https://fireplace-store-final-project.firebaseio.com",
    projectId: "fireplace-store-final-project",
    storageBucket: "fireplace-store-final-project.appspot.com",
    messagingSenderId: "1024301216519",
    appId: "1:1024301216519:web:45fc69f6329ffb9d6a4ba2"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;