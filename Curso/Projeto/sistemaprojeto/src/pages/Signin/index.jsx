import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import './signin.css';
import logo from '../../assets/logo.png';

function SignIn() {
  //armazenando aqui td que e digitado em "email e senha" 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault() //n atualizar a pagina apos o submit do form
    
    //se for diferente de vazio
    if(email !== '' && password !== ''){
      signIn(email, password)
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />
        {/* Operação binária, se for true vai mostrar carregando, se n... */}
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
        </form>  

        {/* ao clicar vai para a tela de registro */}
        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
