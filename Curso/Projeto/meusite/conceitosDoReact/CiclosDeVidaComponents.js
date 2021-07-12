import React, { Component } from 'react';

//CICLO DE VIDA DE UM COMPONENTE

class CiclosDeVidaComponents extends Component {

    //O "constructor" é o primeiro a ser chamado pelo componente
    constructor(props) {
        super(props)
        this.state = {
            hora: '00:00:00'
        }
    }

    //aqui e executado dps que o componente e montado e sera executado uma única vez
    //só irá executar de novo qd o componente for montado na tela novamente (no caso de um F5)
    componentDidMount() {

        //vai starta o relógio
        setInterval(() => {
            this.setState({ hora: new Date().toLocaleTimeString()})
        }, 1000)

    }

    //"componentDidUpdate" serve para fazer algo td vez que algo em nosso componente for atualizado
    //no caso sempre que o state "hora" for atualizado a cada 1seg vai exec essa menssagem no console.log
    componentDidUpdate() {
        console.log('Atualizou!!!')
    }

    render() {
        return (
            <div>
               <h1>Meu Projeto {this.state.hora}</h1>
            </div>
        )
    }

}

export default CiclosDeVidaComponents

/*
    == Ciclos de vida dos Componentes ==
Então como vimos na aula nos ciclos de vida do componente temos:

-Inicialização
-Montagem
-Atualização
-Desmontagem

- Inicialização

Nesta fase, o componente React se prepara para sua inicialização, configurando os estados iniciais e props padrões se houverem.

- Montagem

Depois de preparar com todas as necessidades básicas, estado e props, o nosso Componente React está pronto para ser montado no DOM do navegador.

"componentWillMount()" É executado quando o componente estiver prestes a ser montado no DOM da página. Assim, após esse método ser executado o componente irá criar o nó no navegador. Todas as coisas que você deseja fazer antes do componente ser montado, devem ser definidas aqui.

"componentDidMount()" Este é o método que é executado depois que o componente foi montado no DOM

- Atualização

Esta fase começa quando o componente React já nasceu no navegador e cresce recebendo novas atualizações. O componente pode ser atualizado de duas maneiras, através do envio de novas props ou a atualização do seu estado.

"componentDidUpdate()" é chamado imediatamente após a atualização.

"componentWillUpdate()" É executado somente quando shouldComponentUpdatedevolver true.

- Desmontagem

Nesta fase, o componente não é mais necessário e será desmontado do DOM. O método que se chama nesta fase é o:

"componentWillUnmount()"
*/