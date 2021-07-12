//importando o firebase
import firebase from 'firebase/app'; 
//importando autenticação do firebase
import 'firebase/auth';
import 'firebase/firestore';

//storage a parte de enviar arquivos para o firebase
import 'firebase/storage';

//Copie a chave do seu projeto no firebase e cole aqui
let firebaseConfig = {
    apiKey: "AIzaSyCZMcsaB7wcjfgKPJ-hw-xMFKqS9qAxbwY",
    authDomain: "sistema-projeto-react.firebaseapp.com",
    projectId: "sistema-projeto-react",
    storageBucket: "sistema-projeto-react.appspot.com",
    messagingSenderId: "920944434167",
    appId: "1:920944434167:web:5031443a07ea0f0dacacf2",
    measurementId: "G-VDJFS7J2LR"
};

//Vericação se não tiver nenhuma conexão aberta, então entre neste if e inicialize
if(!firebase.apps.length) {
    // Inicializa Firebase
    firebase.initializeApp(firebaseConfig);
}

//se tiver ele so vai pular o if

export default firebase