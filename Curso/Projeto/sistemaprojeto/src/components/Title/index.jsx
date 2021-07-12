import './title.css';

//ta recendo o filho(children) e a propriedade name
//"children" representa o que esta dentro da tag <Title/>
function Title({children, name}){
  return(
    <div className="title">
      {children}
      <span>{name}</span>
    </div>
  )
}

export default Title