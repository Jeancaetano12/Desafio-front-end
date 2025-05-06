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

function SavedCards({ cards, onCardClick }) {
  return (
    <div className="saved-cards-section">
      <h3>Suas Cartas Salvas</h3>
      {cards.length === 0 ? (
        <p>Nenhuma carta salva ainda.</p>
      ) : (
        <div className="cards-grid">
          {cards.map(card => (
            <img 
              key={card.id}
              src={card.images.small} 
              alt={card.name}
              onClick={() => onCardClick(card)}
              className="saved-card"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedCards;
