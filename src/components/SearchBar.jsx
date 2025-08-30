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
import { useState, useEffect } from 'react';
import PokemonTCG from 'pokemontcgsdk';

function SearchBar({ onSearch, setLoading, setError }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false); // 👈 novo estado para foco

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setError(false);
        setLoading(true);
        const apiKey = import.meta.env.VITE_POKEMON_API_KEY;
        
        const url = `/api/v2/cards?q=name:${searchTerm.split(' ')[0]}*&pageSize=40`;

        const response = await fetch(url, {
          headers: {
            'X-Api-Key': apiKey
          }
        });
        
        if (!response.ok) {
          throw new Error('A resposta da rede não foi bem-sucedida');
        }

        const result = await response.json();
        const filtered = result.data.filter(card => 
          card.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log('Cartas puxadas:', filtered)
        setError(false);
        setSuggestions(filtered.slice(0, 30));
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar cartas, talvez você esteja usando um caracter especial?');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, setLoading, setError]);

  const handleSelect = (card) => {
    onSearch(card);
    setSuggestions([]);
    setSearchTerm('');
    setIsFocused(false);
  };

  return (
    <div className="search-bar mb-4 position-relative">
      <div className="search-wrapper">
        <input
          type="text"
          className="form-control"
          placeholder="Digite o nome de um pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)} // 👈 ativa sugestões
          onBlur={() => setTimeout(() => setIsFocused(false), 150)} // 👈 espera clique em sugestão
        />
      </div>

      {isFocused && suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100 z-index-1">
          {suggestions.map((card) => (
            <li
              key={card.id}
              className="list-group-item list-group-item-action d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelect(card)}
            >
              <img
                src={card.images.small}
                alt={card.name}
                style={{ width: '40px', marginRight: '10px' }}
              />
              <div>
                <strong>{card.name}</strong><br />
                <small>{card.set.name}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
