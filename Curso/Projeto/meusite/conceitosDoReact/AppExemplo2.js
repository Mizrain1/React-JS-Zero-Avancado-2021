import React from 'react';

//componente responsável para exibir a equipe
const Equipe = (props) => {
    return (
        <div>
            <Sobre username={props.nome} cargo={props.cargo} idade={props.idade}></Sobre>
            <Social fb={props.facebook}></Social>
            <hr/>
        </div>
    )
}

//componente responsável pelos atributos da equipe
const Sobre = (props) => {
    return (
        <div>
            <h2>Ola sou o(a) {props.username}</h2>
            <h3>Cargo: {props.cargo}</h3>
            <h3>Idade: {props.idade} anos</h3>
        </div>
    )
}

//componente responsável pelas midias sociais
const Social = (props) => {
    return (
        <div>
            <a href={props.fb}>Facebook</a>
            <button>Linkedin</button>
            <button>Youtube</button>
        </div>
    )
}

function AppExemplo2() {
    return (
        <div>
            <h1>Conheça nossa equipe:</h1>
            <Equipe nome="Lucas" cargo="Programador" idade="29" facebook="https://google.com"></Equipe>
            <Equipe nome="Matheus" cargo="Designer" idade="15" facebook="https://google.com"></Equipe>
        </div>
    )
}

export default AppExemplo2