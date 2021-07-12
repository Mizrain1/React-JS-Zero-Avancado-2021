import { useState, createContext } from "react";

export const UserContext = createContext({})

function UserProvider({children}) {

    const [alunos, setAlunos] = useState('sujeito programador')
    const [qtdAlunos, setQtdAlunos] = useState(85)

    return(
        //provider que vai espalhar os components que estiverem aqui dentro
        <UserContext.Provider value={{ alunos, setAlunos, qtdAlunos }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider