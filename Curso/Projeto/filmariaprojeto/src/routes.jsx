import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos';
import Erro from './pages/Error';

const Routes = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/filme/:id" component={Filme}></Route>
                <Route exact path="/favoritos" component={Favoritos}></Route>
                <Route path="*" component={Erro}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes