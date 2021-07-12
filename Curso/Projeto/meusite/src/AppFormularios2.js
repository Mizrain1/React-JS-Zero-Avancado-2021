import React, { Component } from 'react';

class AppFormularios2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //Crio um objeto "form" para armazenar tds os states do form
          form:{
              nome: '',
              email: '',
              senha: '',
              sexo: ''
          }
        }

        this.dadosForm = this.dadosForm.bind(this)

    }

    //essa função servira para tds os campos do form
    dadosForm(e) {
        let form = this.state.form
        //ta pegando tds os objs de "form" que tenham o atrib "name" e então pegando o valor
        form[e.target.name] = e.target.value 
        this.setState({form: form})
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                Nome:
                <input type="text" name="nome" value={this.state.form.nome} onChange={this.dadosForm} /><br/>
                Email:
                <input type="email" name="email" value={this.state.form.email} onChange={this.dadosForm}/><br/>
                Senha:
                <input type="password" name="senha" value={this.state.form.senha} onChange={this.dadosForm}/><br/>
                Sexo:
                <select name="sexo" value={this.state.form.sexo} onChange={this.dadosForm}>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                </select>
                <div>
                    <h3>{this.state.form.email}</h3>
                    <h3>{this.state.form.senha}</h3>
                    <h3>{this.state.form.sexo}</h3>
                </div>
            </div>
        )
    }

}

export default AppFormularios2
