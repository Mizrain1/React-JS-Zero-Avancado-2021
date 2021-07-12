//imports necessarios do firebase
import firebase from 'firebase/app'; //import das aplicações
import 'firebase/firestore'; //import do banco de dados
import 'firebase/auth'; //import das autenticações (cadastro usuario etc)

var firebaseConfig = {
    apiKey: "AIzaSyCgUG6KW4LcLUq8eiy-mKwdLu8Trsjzb3U",
    authDomain: "curso-react-f29ad.firebaseapp.com",
    projectId: "curso-react-f29ad",
    storageBucket: "curso-react-f29ad.appspot.com",
    messagingSenderId: "588056035448",
    appId: "1:588056035448:web:91d23f6afe133b6e16ad8d",
    measurementId: "G-GWYBERHWVZ"
  };

  //verificação se ja tiver uma conexão aberta ou não inicialize o fire
  if(!firebase.apps.length) {
    // Inicializa conexão Firebase
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase
