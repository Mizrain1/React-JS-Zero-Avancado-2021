//arquivo para configurar as ROTAS do sistema

//importando a extensão de rotas
//"Switch" serve para renderizar apenas uma página e não tds ao mesmo tempo
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//importando o componente das paginas 
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Error from './pages/Error';
import Produto from './pages/Produto';

//Como o Header devera aparecer em tds as paginas ele fica fora do "Switch"
import Header from './components/Header';

//"exact" essa página sera acessada qd o path for EXATAMENTE igual ao definido
const Routes = () => {
    return (
        <BrowserRouter>
            <Header></Header>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/sobre" component={Sobre}></Route>    
                <Route exact path="/contato" component={Contato}></Route>  
                {/* "/:id" para receber o id dinamico da pagina */}
                <Route path="/produto/:id" component={Produto}></Route>
                {/* "path="*" esta rota ira renderizar a pagina "not found" qd ela não existe */}
                {/* ela tem que ser sempre a ULTIMA rota */}
                <Route path="*" component={Error}></Route>          
            </Switch>
        </BrowserRouter>
    )
}

export default Routes