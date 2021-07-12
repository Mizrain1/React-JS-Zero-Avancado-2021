import React, { Component } from 'react';

class AppRenderizazaoCondicional extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: false 
        }

        //sempre dar o bind para acessar a função
        this.sair = this.sair.bind(this)
        this.entrar = this.entrar.bind(this)
    }

    sair() {
        this.setState({status: false})
    }

    entrar() {
        this.setState({status: true})
    }

    //se for "true" vai exibir a 1 div se for "false" vai exibir a outra
    render() {
        return (
            <div>
              {this.state.status ? 
              <div>
                  <h2>Bem-vindo ao sistema</h2>
                  <button onClick={this.sair}>Sair do sistema</button>
              </div> : 
              <div>
                  <h2>Olá visitante, faça o login!</h2>
                  <button onClick={this.entrar}>Entrar no sistema</button>
                </div>
                }
            </div>
        )
    }

}

export default AppRenderizazaoCondicional
