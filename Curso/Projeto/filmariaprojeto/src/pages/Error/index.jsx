import './erro.css';
import { Link } from 'react-router-dom';

function Erro() {
    return (
      <div className="not-found">
          <h1>404</h1>
          <h2>pagina não encontrada</h2>
          <Link to="/">Veja tds filmes</Link>
      </div>
    );
  }
  
  export default Erro;