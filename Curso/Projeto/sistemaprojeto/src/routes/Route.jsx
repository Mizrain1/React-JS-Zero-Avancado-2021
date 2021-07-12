//"Redirect" qd se quer mandar o usuario para alguma página que agt queira
import { Route, Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from '../contexts/auth';

//Recebendo 3 propriedades
function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {

    //"signed e loading" sendo pegos de "AuthContext"
    //o padrão inicia sera falso do user logado
    const { signed, loading } = useContext(AuthContext)

    //se o "loading" for true vai entrar nesse if
    if(loading) {
        return (
            <div></div>
        )
    }

    //Se ele NÃO ESTA LOGADO e a rota que esta tentando acessar e privada?
    //Então vai ser redirecionado para a tela de Login("/")
    if(!signed && isPrivate) {
        return <Redirect to="/"/>
    }

    //Se o user esta LOGADO e tentou acessar uma rota que não e privada
    //Etão vai ser retornado para ele a tela de Painel("/dashboard")
    if(signed && !isPrivate) {
        return <Redirect to="/dashboard"/>
    }

    //"...rest" repassando para o Routes tds as propriedades que ele tem
    //"render" o componente que sera renderizado, passando as props e retornando o "Component" com tds suas props
    //esse component que sera renderizado
    return (
        <Route {...rest} render={ props => (
            <Component {...props}/>
        )}/>
    )
}

export default RouteWrapper