import firebase from 'firebase'



const firebaseConfig = {
  apiKey: "AIzaSyCqNrpyNSDrXQvbM_iFgqWqMbZfur1Pqv8",
  authDomain: "whclone-54c4c.firebaseapp.com",
  projectId: "whclone-54c4c",
  storageBucket: "whclone-54c4c.appspot.com",
  messagingSenderId: "481811274441",
  appId: "1:481811274441:web:bfd0ee4c5dba7698f8cb18"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();

//responsible for authentication 
const auth = firebase.auth();

//google authentication
// 
const provider = new firebase.auth.GoogleAuthProvider();

//explicit export for the auth and the provider 
//default export for the firebases's db 


export {auth, provider}; 
export default db; 
