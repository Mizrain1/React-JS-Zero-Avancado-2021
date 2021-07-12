import React from 'react';

 //Criando um componente interno cuja tag para chamar sera "Bemvindo"
 //"props" são propriedades que vc pode passar para um componente e utilizá-los de maneiras diversas
 const Bemvindo = (props) => {
     return (
         <div>
             <h2>Bem-vindo(a) {props.nome}</h2>
             <h3>Tenho {props.anos} Anos</h3>
         </div>
     )
 }

 function AppExemplo1() {
     return (
         <div>
             <Bemvindo nome="Lucas" anos="24"></Bemvindo>
             <Bemvindo nome="Amanda" anos="17"></Bemvindo>
             <h1>Ola mundo</h1>
         </div>
     ) 
 }

 export default AppExemplo1