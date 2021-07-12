import { useContext } from 'react';
import { UserContext } from '../../contexts/user';

function Nome() {

    const { alunos, setAlunos } = useContext(UserContext) 

    return (
      <div>
        <span style={{ color: '#ff0000' }}>Bem vindo: {alunos}</span>
        <br/>
        <button onClick={() => setAlunos('lucas')}>Troca Nome</button>
      </div>
    );
  }
  
  export default Nome;
  