/**
 * Nome do arquivo: SearchBar.jsx
 * Data de criação: 06/05/2025
 * Autor: Jean Caetano
 * Matrícula: 01735073
 *
 * Descrição:
 * Este componente React implementa uma barra de pesquisa para cartas do Pokémon TCG.
 * Funcionalidades:
 * - Campo de busca por código de card
 */

/**
 * Arquivo: src/components/SearchBar.jsx
 * Implementa a busca de cartas Pokémon por código/nome
 */
import { useState } from 'react';
import PokemonTCG from 'pokemontcgsdk';

function SearchBar({ onSearch, setLoading, setError }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_POKEMON_API_KEY;
      PokemonTCG.configure({ apiKey });
      
      const card = await PokemonTCG.card.find(searchTerm);
      onSearch(card);
    } catch (err) {
      setError('Carta não encontrada');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar mb-4">
      <div className="d-flex">
        <input
          type="text"
          className="form-control"
          // Editando a força a forma da barra de pesquisa pra que ela fique com as duas bordas arredondadas
          style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}
          placeholder="Ex: base1-4 (Charizard) ou swsh9-175 (Pikachu VMAX)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          className="btn btn-primary ms-2 search-button" 
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;