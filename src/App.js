import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api.js';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  
  async function handSearch(){
    if(input === ''){
      alert('Preencha algum CEP!')
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    }catch{
      alert('Ops erro na busca');
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
          type="text" 
          placeholder="Insira o CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <button className="buttonSearch" onClick={handSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>

      </main>
      )}
      

    </div>
  );
}

export default App;
