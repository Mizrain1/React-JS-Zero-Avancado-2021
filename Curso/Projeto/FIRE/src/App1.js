import { useState, useEffect } from 'react';

//importando meu arquivo de config do firebase
import firebase from './firebaseConnection';

import './style.css';

function App1() {

  //td que for digitado sera salvo nessas const
  const [idPost, setIdPost] = useState('')
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [posts, setPosts] = useState([])

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  //começa com "false" pq n tem nenhum usuario logado
  const [user, setUser] = useState(false)
  //objeto que ficara as inf do usuario logado 
  const [userLogged, setUserLogged] = useState({})

  //Monitorando em tempo real a lista (real time)
  //(traz os dados atualizados sem precisar chamar)
  useEffect(() => {
    async function loadPosts() {
      await firebase.firestore().collection('post')
      //"onSnapshot" vai ficar monitorando o "doc" 
      .onSnapshot((doc) => {
        let meusPosts = []

        doc.forEach((item) => {
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor
          })
        })

        setPosts(meusPosts)

      })
    }

    loadPosts()

  }, [])

  useEffect(() => {

    async function checkLogin() {
      //"onAuthStateChanged" fica monitorando seu estado de usuario (logo,deslogo)
      await firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          //se tem usuario logado entra aqui dentro 
          setUser(true)
          setUserLogged({
            uid: user.uid,
            email: user.email 
          })
        } else {
          //n possui nenhum user logado
          setUser(false)
          setUserLogged({})
        }
      })
    }

    checkLogin()

  }, [])

  //função "async" e espera, tem que esperar a requisição ser feita
  async function handleAdd() {
    //"firestore" nome do banco 
    //"collection" nome da coleção do meu banco que quero acessar
    //"doc" nome do documento no meu banco que quero acessar
    //"set" dentro do meu "doc" irei criar alguma coisa, então passarei um objeto que sera criado
    //passei o "titulo" e o "autor" passando as const respectivas a cada um
    await firebase.firestore().collection('post')
    .doc('12345')
    .set({
      titulo: titulo,
      autor: autor
    })
    //"then" se for cadastrado com sucesso o "set" então vai executar esse "then"
    .then(() => {
      console.log('DADOS CADASTRADOS COM SUCESSO!')
      setTitulo('')
      setAutor('') //limpa os campos apos cadastrar
    })
    //Porem se tiver dado algum erro no cadastro, ira cair no "catch"
    .catch((error) => {
      console.log('GEROU UM ERRO:' + error)
    })
  }

  // async function buscaPost() {
  //   await firebase.firestore().collection('post')
  //   //"doc" passo o doc onde os dados serão puxados
  //   .doc('123')
  //   .get()
  //   //vms receber os dados dentro dessa var "snapshot"
  //   .then((snapshot) => {
  //     //vai buscar o dado "titulo" e "autor"
  //     setTitulo(snapshot.data().titulo)
  //     setAutor(snapshot.data().autor)
  //   })
  //   .catch(() => {
  //     console.log('DEU ALGUM ERRO')
  //   })
  // }

  //vai buscar tds os Posts
  async function buscaPost() {
    await firebase.firestore().collection('post')
    .get()
    .then((snapshot) => {
      let lista = []

      //percorrendo td a lista de "post" e recebendo o "doc"
      //"lista.push" colocando os itens em lista
      //Então quero colocar na lista o "id" e o dados "titulo" e "autor"
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor 
        })
      })

      //Dps que percorrer e trazer td então vou atualizar "lista" com tds os posts
      setPosts(lista)

    })
    .catch(() => {
      console.log('DEU ALGUM ERRO!')
    })
  }

  // async function handleAdd() {
  //   await firebase.firestore().collection('post')
  //   //"add" gera um "id" aleatorio, por isso n precisa do "doc"
  //   .add({
  //     titulo: titulo,
  //     autor: autor
  //   })
  //   .then(() => {
  //     console.log('DADOS CADASTRADOS COM SUCESSO!')
  //   })
  //   .catch((error) => {
  //     console.log('GEROU UM ERRO:' + error)
  //   })
  // }

  async function editarPost() {
    await firebase.firestore().collection('post')
    //"doc" vai pegar o id que o usuario digito para atualizar
    .doc(idPost)
    //aqui sera passado as inf novas, dados que serao atualizados
    .update({
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log('DADOS ATUALIZADOS COM SUCESSO!')
      //dps vai limpar esses campos
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(() => {
      console.log('ERRO AO ATUALIZAR')
    })
  }

  async function excluirPost(id) {
    //passa o "id" do "doc" que quero acessar e deletar
    await firebase.firestore().collection('post').doc(id)
    .delete() //vai deletar
    .then(() => {
      alert('ESSE POST FOI EXCLUIDO!')
    })
    .catch(() => {
      alert('ERRO AO EXCLUIR POST!')
    })
  }

  //função que vai cuidar da autenticação e cadastro
  async function novoUsuario() {
    //"auth" chamando o metodo de autenticação
    //"createUserWithEmailAndPassword" criar um usuario com email e senha
    //passando do useState as const "email" e a "senha"
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(() => {
      console.log('CADASTRADO COM SUCESSO')
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
  }

  //função de login usuario
  async function fazerLogin() {
    //"signInWithEmailAndPassword" vai logar passando o "email e senha"
    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((value) => {
      console.log(value.user)
    })
    .catch((error) => {
      console.log('ERRO AO FAZER O LOGIN' + error)
    })
  }

  return (
    <div>
      <h1>ReactJs + Firebase</h1><br/>

      {/* se usuario estiver logado vai entrar aqui */}
      {user && (
        <div>
          <strong>Seja bem vindo! vc esta logado!</strong><br/>
          <span>{userLogged.uid} - {userLogged.email}</span>
          <br/><br/>
        </div>
      )}

      <div className="container">
        <label>Email</label>
        <input type="text" value={email} onChange={ (e) => setEmail(e.target.value)} /><br/>

        <label>Senha</label>
        <input type="password" value={senha} onChange={ (e) => setSenha(e.target.value)} /><br/>

        <button onClick={ fazerLogin }>Fazer Login</button>
        <button onClick={ novoUsuario }>Cadastrar</button>
        <button onClick={ logout }>Sair da conta</button>
      </div>

      <hr/>

      <div className="container">

        <h2>Banco de dados:</h2>
        <label>ID: </label>
        <input type="text" value={idPost} onChange={ (e) => setIdPost(e.target.value)} />

        <label>Titulo: </label>
        {/* "onChange" vai pegar td que for digitado no textarea que sera colocado na const "titulo" */}
        <textarea type="text" value={titulo} onChange={ (e) => setTitulo(e.target.value)} />

        <label>Autor: </label>
        <input type="text" value={autor} onChange={ (e) => setAutor(e.target.value)} />

        {/* função "handleAdd" ira cadastrar fazer o POST no firebase ao ser clicada */}
        <button onClick={ handleAdd }>Cadastrar</button>
        {/* função que ira buscar um post do banco */}
        <button onClick={ buscaPost }>Buscar Post</button>
        {/* função que ira editar o post */}
        <button onClick={ editarPost }>Editar</button><br/>

        {/* a lista com os dados sera montada aqui */}
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>ID - {post.id}</span><br/>
                <span>Titulo: {post.titulo}</span><br/>
                <span>Autor: {post.autor}</span><br/>
                {/* função que ira excluir o post com base no "id" */}
                <button onClick={ () => excluirPost(post.id)}>Excluir Post</button><br/><br/>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
}

export default App1;
