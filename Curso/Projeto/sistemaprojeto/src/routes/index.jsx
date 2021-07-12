//"Switch" um componente por página
import { Switch } from 'react-router-dom';

import Route from './Route'; //configurações das rotas da app
import SignIn from '../pages/Signin'; //tela de login
import SignUp from '../pages/SignUp'; //tela de cadastro
import Dashboard from '../pages/Dashboard'; //tela inicial do user
import Profile from '../pages/Profile'; //pag de perfil
import Customers from '../pages/Customers'; //pag de clientes
import New from '../pages/New'; //pag novo chamado

function Routes() {
    return (
        <Switch>
            {/* Quando user entrar na nossa app vai mostrar a tela de Login */}
            <Route exact path="/" component={SignIn}/>
            {/* Quando acessar o "/register" vai entrar no component de cadastro etc */}
            <Route exact path="/register" component={SignUp}/>
            {/* Passando a prop "isPrivate" para que apenas pessoas logadas possam visualizar (verificação feita em "Route.jsx") */}
            <Route exact path="/dashboard" component={Dashboard} isPrivate/>
            <Route exact path="/profile" component={Profile} isPrivate/>
            <Route exact path="/customers" component={Customers} isPrivate/>
            {/* rota do novo chamado */}
            <Route exact path="/new" component={New} isPrivate/>
            {/* rota que vai acessar o chamado para Editar pelo id */}
            <Route exact path="/new/:id" component={New} isPrivate/>
        </Switch>
    )
}

export default Routes