
import { useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';//alerts personalizados
//para cadastrar o user no banco
import firebase from '../services/firebaseConnection';

//sera exportado pra uso "AuthContext"
export const AuthContext = createContext({});

function AuthProvider({ children }){

    //vai cmç como nulo pq n tem user logado
  const [user, setUser] = useState(null);
  //qd apertar em logar vai ficar true 
  const [loadingAuth, setLoadingAuth] = useState(false);
  //qd abrir app esse vai começar carregando "true"
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    function loadStorage(){
    //"storageUser" logar o user e armazená-lo no storage
      const storageUser = localStorage.getItem('SistemaUser');

      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
  
      setLoading(false);
    }
    
    loadStorage();

  }, [])

  //Fazendo login do usuario
  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value)=> {
      let uid = value.user.uid;

      //vai la no banco de dados pegar as inf do user que quer acessar
      const userProfile = await firebase.firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        avatarUrl: userProfile.data().avatarUrl,
        email: value.user.email
      };

      setUser(data)
      storageUser(data)
      setLoadingAuth(false)
      toast.success('Bem vindo de volta!')

    })
    .catch((error)=>{
      console.log(error)
      toast.error('Ops algo deu errado!')
      setLoadingAuth(false)
    })

  }

  //Cadastrando um novo usuario
  async function signUp(email, password, nome){
    setLoadingAuth(true);

    //autenticaçao firebase passando email e senha
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value)=>{
      let uid = value.user.uid;

      //cadastrando no storage do banco em "users"
      await firebase.firestore().collection('users')
      //vai cadastrar no doc "uid" o nome e um avatar padrão
      .doc(uid).set({
        nome: nome,
        avatarUrl: null,
      })
      .then( () => {

        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          avatarUrl: null
        };

        setUser(data)
        storageUser(data)
        setLoadingAuth(false)
        //"toast" substitui o alert +bonito
        toast.success('Bem vindo a plataforma!')

      })

    })
    .catch((error)=>{
      console.log(error)
      toast.error('Ops algo deu errado!')
      setLoadingAuth(false)
    })

  }

  //armazenando no localStorage
  function storageUser(data){
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }

  //Logout do usuario
  async function signOut(){
    await firebase.auth().signOut();
    localStorage.removeItem('SistemaUser'); //limpando localstorage
    setUser(null); //voltando estado do user para null
  }


  return(
      //"!!user" vai receber true ou false
    <AuthContext.Provider value={{ signed: !!user,  user, loading, signUp, signOut, signIn, loadingAuth, setUser, storageUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
