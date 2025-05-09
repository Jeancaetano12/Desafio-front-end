/**
 * Nome do arquivo: SavedCards.jsx
 * Data de criação: 06/05/2025
 * Autor: Jean Caetano
 * Matrícula: 01735073
 *
 * Descrição:
 * Este componente React implementa a função de persistencia de cartas do Pokémon TCG no LocalStorage.
 * Funcionalidades:
 * - Persistência e exibição de cartas salvas no localStorage
 */
import { useState, useEffect } from 'react';
function SavedCards({ cards, onCardClick, onRemove }) {
  
  const [hoveredCardId, setHoveredCardId] = useState(null);

    // 2. Reseta o ID da carta "tremendo" sempre que a lista de cartas mudar
  useEffect(() => {
    setHoveredCardId(null);
  }, [cards]); // Executa toda vez que cards for atualizado (nova carta salva ou removida)
  
  return (
    <div className="saved-cards-section">
      <h5 className="deck-title">Seu deck</h5>
      {cards.length === 0 ? (
        <p>Nenhuma carta salva.</p>
      ) : (
        <div className="cards-grid">
          {cards.map(card => (
            <div key={card.id} className="saved-card-container">
              <img 
                src={card.images.small}
                alt={card.name}
                onClick={() => onCardClick(card)}
                className={`saved-card-img ${hoveredCardId === card.id ? 'shake' : ''}`}
              />
              <button
                onClick={() => onRemove(card.id)} 
                className="remove-btn"
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedCards;
