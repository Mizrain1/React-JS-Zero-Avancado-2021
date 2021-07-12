import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebaseConnection';
//"date-fns" biblioteca de formatação de datas
import { format } from 'date-fns';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import './dashboard.css';


//criando uma cons para armazenar esse comando grande "listRef"
//Vai la no banco, em "chamados" e vai trazer na ordem de criação(created) na ordem decrescente(desc)
const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

function Dashboard(){
  const [chamados, setChamados] = useState([])
  const [loading, setLoading] = useState(true);
  //"loadingMore" useState que ira controlar a ação de buscar mais chamados
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  //"showPostModal" tiver "true" vai mostrar o modal
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(()=> {

    //função que ira buscar os chamados
    async function loadChamados(){
      //limite de 5 chamados que ira buscar
      await listRef.limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot)
      })
      .catch((err)=>{
        console.log('Deu algum erro: ', err);
        setLoadingMore(false);
      })
  
      setLoading(false);
  
    }

    loadChamados();

    return () => {

    }
  }, []);

  async function updateState(snapshot){
    //vai conferir se minha colec esta vazia
    const isCollectionEmpty = snapshot.size === 0;

    //Se não estiver vazio, vai percorrer a lista
    if(!isCollectionEmpty){
      let lista = [];

      snapshot.forEach((doc)=>{
        //vai montar a lista
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          //"createdFormated" data formatada com a biblioteca (date-fns) utilizando a propriedade dela "format"
          //(dd/MM/yyyy) = Dia, Mês, Ano
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento
        })
      })

      //Pegando o ultimo documento buscado, util para a listagem e n duplicar
      const lastDoc = snapshot.docs[snapshot.docs.length -1]; 

      //vai pegar os chamados ja existentes, e se forem add mais, então vai pegar e ACRESCENTAR na lista aos que ja estavam
      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true);
    }

    setLoadingMore(false);

  }

  //função do btn que ira carregar mais chamados(se tiver)
  async function handleMore(){
    setLoadingMore(true);
    //"startAfter" começa DEPOIS do "lastDocs"
    await listRef.startAfter(lastDocs).limit(5)
    .get()
    .then((snapshot)=>{
      updateState(snapshot)
    })
  }

  //função que ira abrir o modal apos o click no btn
  function togglePostModal(item){
    setShowPostModal(!showPostModal) //trocando de true pra false
    setDetail(item);
  }

  //enquanto estiver no "loading" vai mostrar isso aqui
  if(loading){
    return(
      <div>
        <Header/>

        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25} />
          </Title>  

          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>

        </div>      
      </div>
    )
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {/* qd "chamados" for igual a 0 n tiver nenhum então vai exibir essa div / se tiver vai exibir a div de baixo */}
        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        )  : (
          <>
          {/* <> esta tag e fragment, n tem css */}
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                {/* "scope" especifica se e col ou row */}
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((item, index)=>{
                  return(
                    <tr key={index}>
                      <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormated}</td>
                      <td data-label="#">
                        <button className="action" style={{backgroundColor: '#3583f6' }} onClick={ () => togglePostModal(item) }>
                          <FiSearch color="#FFF" size={17} />
                        </button>
                        <Link className="action" style={{backgroundColor: '#F6a935' }} to={`/new/${item.id}`} >
                          <FiEdit2 color="#FFF" size={17} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Se não tiver "carregando" e a lista n estiver "vazia" então vai mostrar o botão */}
            {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}
            { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button> }

          </>
        )}

      </div>

      {showPostModal && (
        <Modal
          conteudo={detail}
          close={togglePostModal}
        />
      )}

    </div>
  )
}

export default Dashboard