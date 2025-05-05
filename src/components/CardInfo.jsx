/**
 * Nome do arquivo: CardInfo.jsx
 * Data de criação: 05/05/2025
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

function CardInfo({ carta }) {
    return (
      <div className="card text-dark" style={{ width: '18rem' }}>
        <img src={carta.images.large} className="card-img-top" alt={carta.name} />
        <div className="card-body">
          <h5 className="card-title">{carta.name}</h5>
          <p className="card-text">Tipo: {carta.types?.join(', ') || 'Desconhecido'}</p>
          <p className="card-text">Raridade: {carta.rarity || 'Desconhecida'}</p>
        </div>
      </div>
    );
  }
  
  export default CardInfo;
  