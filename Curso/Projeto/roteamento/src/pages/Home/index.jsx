import { Link } from 'react-router-dom';
//"Link" serve para linkar outras páginas e navegar para elas

function Home() {
    return (
      <div>
        <h1>Bem vindo a pag Home!</h1>
        <Link to="/sobre">Sobre</Link><br/>
        <Link to="/contato">Contatos</Link>
      </div>
    );
  }
  
  export default Home;
  