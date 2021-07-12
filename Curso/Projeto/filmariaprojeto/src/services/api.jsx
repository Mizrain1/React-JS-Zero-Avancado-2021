/* "axios" Cliente HTTP baseado em promessa para o navegador e node.js

Características:

- Faça XMLHttpRequests a partir do navegador
- Faça solicitações http de node.js
- Suporta a API Promise
- Interceptar solicitação e resposta
- Transforme os dados de solicitação e resposta
- Cancelar requisições
- Transformações automáticas para dados JSON
- Suporte do lado do cliente para proteção contra XSRF
*/
import axios from 'axios';

//https://sujeitoprogramador.com/r-api/?api=filmes/

//Base URL > https://sujeitoprogramador.com/  (nunca vai mudar)
// r-api/?api=filmes/ (ROTA de TODOS OS FILMES)
// r-api/?api=filmes/123 (FILME COM ID 123)

const api = axios.create({
    baseURL: 'https://sujeitoprogramador.com/'
})

export default api