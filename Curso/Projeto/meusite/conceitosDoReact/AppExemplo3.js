import React, { Component } from 'react'; //Vms criar componentes

//Criando componente "Equipe"
class Equipe extends Component {

    //Precisa ter obrigatoriamente o "render" onde ficara o código
    render() {
        return (
            <div>
                <Sobre nome={this.props.nome} cargo={this.props.cargo} idade={this.props.idade}></Sobre>                
                <hr/>
            </div>
        )
    }

}

class Sobre extends Component {
    render() {
        return (
            <div>
                <h2>Ola sou o(a) {this.props.nome} </h2>
                <h3>Cargo: {this.props.cargo} </h3>
                <h3>Idade: {this.props.idade} anos</h3>
            </div>
        )
    }
}

function AppExemplo3() {
    return (
        <div>
            <h1>Conheça nossa equipe:</h1>
            <Equipe nome="Matheus" cargo="Programador" idade="24"></Equipe>            
        </div>
    )
}

export default AppExemplo3