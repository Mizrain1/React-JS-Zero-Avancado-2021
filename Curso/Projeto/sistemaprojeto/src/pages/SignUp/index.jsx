
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import logo from '../../assets/logo.png';

function SignUp() {
  //armazenando aqui td que e digitado em "email,senha e nome" 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')

  const { signUp, loadingAuth } = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault() //n atualizar a pagina apos o submit do form
    
    //se tds forem diferente de vazio então vai cadastrar
    if(nome !== '' && email !== '' && password !== ''){
      signUp(email, password, nome)
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
          <input type="text" placeholder="seu nome" value={nome} onChange={ (e) => setNome(e.target.value) }/>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />
        {/* Operação binária, se for true vai mostrar carregando, se n... */}
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>  

        {/* ao clicar vai para a tela de Login(home) */}
        <Link to="/">Já tem uma conta? Entre!</Link>
      </div>
    </div>
  );
}

export default SignUp
