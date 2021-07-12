import React from 'react';
import Routes from './routes';

//Biblioteca "toast" estiliza os alerts da página, mt boa
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

function App() {
  return (
    <div className="app">
      <Routes></Routes>
      <ToastContainer autoClose={3000}/>
    </div>
  );
}

export default App;
