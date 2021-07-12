import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
//importando a pasta de rotas
import Routes from './routes'; 

//biblioteca dos alerts personalizados
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    //"AuthProvider" engloba tds as tags, com isso tds os values nele podem ser acessados por qualquer component
    <AuthProvider>
      <BrowserRouter>
        {/* vai fechar dps de 3 segundos */}
        <ToastContainer autoClose={3000}/>
        <Routes/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
