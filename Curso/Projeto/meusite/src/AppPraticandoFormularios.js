import React, { Component } from 'react';

class AppPraticandoFormularios extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            email: '',
            senha: '',
            error: ''
        }

        this.cadastrar = this.cadastrar.bind(this)

    }

    cadastrar(event) {
        //aqui vai receber os valores em cada um desses states
        const {nome, email, senha} = this.state 

        //se "nome,email e senha" forem diferentes de vazio então vai executar este codigo
        if(nome !== '' && email !== '' && senha !== '') {
            alert(`Nome: ${nome} \nEmail: ${email} \nSenha: ${senha}`)
        } else {
            this.setState({ error: 'Ops! Deu errado'})
        }

        //Para não atualizar a página após o submit
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Novo usuario</h1>
                {this.state.error && <p style={{backgroundColor:'red', color: '#fff'}} >{this.state.error}</p>}
                <form onSubmit={this.cadastrar}>
                    <label>Nome:</label>
                    <input type="text" value={this.state.nome} 
                    onChange={ (e) => this.setState({ nome: e.target.value })} /><br/>
                    <label>Email:</label>
                    <input type="email" value={this.state.email} 
                    onChange={ (e) => this.setState({ email: e.target.value })} /><br/>
                    <label>Senha:</label>
                    <input type="password" value={this.state.senha} 
                    onChange={ (e) => this.setState({ senha: e.target.value })} /><br/>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }

}

export default AppPraticandoFormularios
