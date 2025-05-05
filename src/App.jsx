/**
 * Nome do arquivo: App.jsx
 * Data de criação: 02/05/2025
 * Autor: Jean Caetano
 * Matrícula: 01735073
 *
 * Descrição:
 * Este componente React implementa um dashboard de cartas do Pokémon TCG.
 * Funcionalidades:
 * - Campo de busca por código de card
 * - Exibição detalhada do card pesquisado
 * - Persistência e exibição de cartas salvas no localStorage
 * - Estilização com Bootstrap
 */

import { useState } from 'react';
import CardInfo from './components/CardInfo';

function App() {
  const [codigoCarta, setCodigoCarta] = useState('');
  const [carta, setCarta] = useState(null);

  const buscarCarta = async () => {
    try {
      const resposta = await fetch(`https://api.pokemontcg.io/v2/cards/${codigoCarta}`);
      const dados = await resposta.json();
      setCarta(dados.data);
    } catch (erro) {
      console.error('Erro ao buscar a carta:', erro);
      setCarta(null);
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h1 className="mb-4 fw-bold">Buscar Carta Pokémon</h1>
      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control w-25"
          value={codigoCarta}
          onChange={(e) => setCodigoCarta(e.target.value)}
          placeholder="Ex: xy7-54"
        />
        <button className="btn btn-dark" onClick={buscarCarta}>
          Buscar
        </button>
      </div>

      {carta && <CardInfo carta={carta} />}
    </div>
  );
}

export default App;


