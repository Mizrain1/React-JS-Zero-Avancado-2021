import React, { Component } from 'react';

//importando o componente "Membro"
import Membro from './components/Membro/Membro';

class AppMembro extends Component {

    render() {
        return (
            <div>
               <Membro nome="Visitante"></Membro>
            </div>
        )
    }

}

export default AppMembro
