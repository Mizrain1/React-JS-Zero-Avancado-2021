import { Link } from 'react-router-dom';

function Error() {
    return (
      <div>
        <h1>Parece que essa página não existe!</h1><br/>

        <span>Você pode estar procurando:</span><br/>
        <Link to="/">Home</Link><br/>
        <Link to="/contato">Contatos</Link>
      </div>
    );
  }
  
  export default Error;
  