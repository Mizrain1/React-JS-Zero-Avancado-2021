//"localStorage" armazena dados no browser que permanecem mesmo que ele seja fechado
//"sessionStorage" armazena dados no browser, porem ao fechá-lo são perdidos

//"setItem" para salvar alguma coisa, precisa passar nome(key) e o valor(value)
localStorage.setItem("chave", "valor")

//"getItem" para pegar o dado salvo passando o nome da "chave"
//vai retornar "valor"
localStorage.getItem("chave")

//"removeItem" serve para remover o dado salvo, passando o nome da chave que vc quer remover
localStorage.removeItem("chave")