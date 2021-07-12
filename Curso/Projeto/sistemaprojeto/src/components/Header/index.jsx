
//importando os context aqui para usar
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { Link } from 'react-router-dom';
import './header.css';

//biblioteca de icons svg, passando name dos icons
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

//imagem do avatar padrão(qd user n tiver salvo uma)
import avatar from '../../assets/avatar.png';


function Header(){
  //quero buscar o "user" do context pra usar aqui
  const { user } = useContext(AuthContext);

  return(
    <div className="sidebar">
      <div>
{/* Se "avatarUrl" do user for null(n tiver) então vai mostrar o "avatar"(img minha padrao)/ Se não for null, então vai mostrar a img do user */}
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt="Foto avatar" />
      </div>

      <Link to="/dashboard">
        {/* passando cor e tamanho no icon */}
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>    
      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Configurações
      </Link>           
    </div>
  )
}

export default Header