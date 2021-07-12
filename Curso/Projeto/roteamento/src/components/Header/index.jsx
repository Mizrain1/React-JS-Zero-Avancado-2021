import { Link } from 'react-router-dom';

function Header() {
  return (
      <header>
          <h2>Header da Pagina</h2>
          <Link to="/contato">Contatos</Link>
      </header>
  );
}

export default Header;
