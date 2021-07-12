import React, { Component } from 'react';

class AppExemplo4 extends Component {

    //aqui o construtor do componente
    constructor(props) {
        super(props)
        //"state" dentro aqui vms colocar tds os estados relacionados a esse componente que serão usados aqui
        //As "props" que serão usadas nesse componente 
        this.state = {
            nome: 'Matheus',
            contador: 0
        }

        //Precisa dar um "bind" para a função ser acessada
        this.aumentar = this.aumentar.bind(this)
        this.diminuir = this.diminuir.bind(this)
    }

    //Aqui a função que sera chamada no "onClick" do render
    aumentar() {
        let state = this.state        
        state.contador += 1 //vai aumentar 1
        state.nome = 'Jose'
        this.setState(state)
    }

    diminuir() {
        let state = this.state

        if(state.contador === 0) {
            alert('Opa chegou a zero!')
            return
        }

        state.contador -= 1 //vai diminuir 1
        this.setState(state)
    }

    render() {
        return (
            <div>
                <h1> {this.state.nome} </h1>
                <hr/>

                <h1>Contador</h1>
                {this.state.nome}
                <h3>
                    <button onClick={this.diminuir}>-</button>
                    {this.state.contador}
                    <button onClick={this.aumentar}>+</button>
                </h3>
            </div>
        )
    }

}

export default AppExemplo4