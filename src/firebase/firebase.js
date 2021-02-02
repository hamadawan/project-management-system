import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBDaEFOZPU7PONYTUWiJW9pdrODPPmDH0E",
    authDomain: "project-management-syste-26827.firebaseapp.com",
    projectId: "project-management-syste-26827",
    storageBucket: "project-management-syste-26827.appspot.com",
    messagingSenderId: "91583567420",
    appId: "1:91583567420:web:27c9dbafbc47aa73b79539",
    measurementId: "G-GYTTP1XQHF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const projectsCollection = db.collection('projects')
const bugsCollection = db.collection('bugs')
// const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  projectsCollection,
  bugsCollection,
//   likesCollection
}