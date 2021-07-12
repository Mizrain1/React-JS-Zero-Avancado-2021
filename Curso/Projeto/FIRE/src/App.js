import { useState } from 'react';

//importando meu arquivo de config do firebase
import firebase from './firebaseConnection';

import './style.css';

function App() {

  //td que for digitado sera salvo nessas const
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [cargo, setCargo] = useState('')
  const [nome, setNome] = useState('')

  const [user, setUser] = useState({})

  //função que vai cuidar da autenticação e cadastro
  async function novoUsuario() {
    //"auth" chamando o metodo de autenticação
    //"createUserWithEmailAndPassword" criar um usuario com email e senha
    //passando do useState as const "email" e a "senha"
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then( async (value) => {
      
      await firebase.firestore().collection('users')
      .doc(value.user.uid)
      .set({
        nome: nome,
        cargo: cargo,
        status: true
      })
      .then(() => {
        setNome('')
        setCargo('')
        setEmail('')
        setSenha('')
      })
    })
    .catch((error) => {
      //verifica se a senha ja existe
      if(error.code === 'auth/weak-password') {
        alert('Senha mt fraca...')
        //verifica se o e-mail ja existe
      } else if(error.code === 'auth/email-already-in-use') {
        alert('Esse email já existe')
      }
    })
  }

  //função do logout usuario
  async function logout() {
    //"signOut" deslogo o usuario
    await firebase.auth().signOut()
    //qd deslogar vai voltar para o objeto vazio
    setUser({})
  }

  async function login() {
    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(async (value) => {
      await firebase.firestore().collection('users')
      .doc(value.user.uid)
      .get()
      .then((snapshot) => {
        setUser({
          nome: snapshot.data().nome,
          cargo: snapshot.data().cargo,
          status: snapshot.data().status,
          email: value.user.email
        })
      })
    })
    .catch((error) => {
      console.log('ERRO AO LOGAR' + error)
    })
  }

  return (
    <div>
      <h1>ReactJs + Firebase</h1><br/>

      <div className="container">
        <label>Nome</label>
        <input type="text" value={nome} onChange={ (e) => setNome(e.target.value)} /><br/>

        <label>Cargo</label>
        <input type="text" value={cargo} onChange={ (e) => setCargo(e.target.value)} /><br/>

        <label>Email</label>
        <input type="text" value={email} onChange={ (e) => setEmail(e.target.value)} /><br/>

        <label>Senha</label>
        <input type="password" value={senha} onChange={ (e) => setSenha(e.target.value)} /><br/>

        <button onClick={ login }>Fazer Login</button>
        <button onClick={ novoUsuario }>Cadastrar</button>
        <button onClick={ logout }>Sair da conta</button>
      </div>

      <hr/><br/>

      { Object.keys(user).length > 0 && (
        <div>
          <strong>Olá </strong> {user.nome} <br/>
          <strong>Cargo: </strong> {user.cargo} <br/>
          <strong>Email </strong> {user.email} <br/>
          <strong>Status: </strong> {user.status ? 'ATIVO' : 'DESATIVADO'} <br/>
        </div>
      )}

    </div>
  );
}

export default App;
