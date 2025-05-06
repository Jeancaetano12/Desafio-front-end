/**
 * Nome do arquivo: CardDetails.jsx
 * Data de criação: 05/05/2025
 * Autor: Jean Caetano
 * Matrícula: 01735073
 *
 * Descrição:
 * Este componente React implementa a função para mostrar as cartas do Pokémon TCG.
 * Funcionalidades:
 * - Exibição detalhada do card pesquisado
 */

function CardDetails({ card, onSave, isSaved }) {
  return (
    <div className="card-details mt-4 p-4 border rounded">
      <div className="row">
        {/* Coluna da Imagem */}
        <div className="col-md-5">
          <img 
            src={card.images.large} 
            alt={card.name} 
            className="img-fluid mb-3"
          />
          <button 
            className={`btn w-100 ${isSaved ? 'btn-secondary' : 'btn-success'}`}
            onClick={onSave}
            disabled={isSaved}
          >
            {isSaved ? '✓ Carta Salva' : 'Salvar Carta'}
          </button>
        </div>

        {/* Coluna dos Detalhes */}
        <div className="col-md-7">
          <h2 className="mb-3">{card.name}</h2>
          
          {/* Informações Básicas */}
          <div className="mb-3">
            <p><strong>Tipo Principal:</strong> {card.supertype}</p>
            {card.subtypes && (
              <p><strong>Subtipos:</strong> {card.subtypes.join(', ')}</p>
            )}
            {card.hp && <p><strong>HP:</strong> {card.hp}</p>}
          </div>

          {/* Ataques */}
          {card.attacks && (
            <div className="mb-3">
              <h4>⛨ Ataques</h4>
              <div className="list-group">
                {card.attacks.map((attack, index) => (
                  <div key={index} className="list-group-item">
                    <h5>{attack.name}</h5>
                    <p><strong>Custo:</strong> {attack.cost?.join(' ') || 'Nenhum'}</p>
                    <p><strong>Dano:</strong> {attack.damage || '0'}</p>
                    <p>{attack.text || 'Sem descrição'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fraquezas/Resistências */}
          <div className="row">
            {card.weaknesses && (
              <div className="col-md-6">
                <h4>⚠ Fraquezas</h4>
                <ul>
                  {card.weaknesses.map((weakness, index) => (
                    <li key={index}>
                      {weakness.type}: {weakness.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {card.resistances && (
              <div className="col-md-6">
                <h4>🛡 Resistências</h4>
                <ul>
                  {card.resistances.map((resistance, index) => (
                    <li key={index}>
                      {resistance.type}: {resistance.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Informações do Set */}
          <div className="mt-3">
            <h4>📦 Informações do Conjunto</h4>
            <p><strong>Nome:</strong> {card.set.name}</p>
            <p><strong>Série:</strong> {card.set.series}</p>
            <p><strong>Lançamento:</strong> {card.set.releaseDate}</p>
            <p><strong>Número:</strong> {card.number}/{card.set.printedTotal || '??'}</p>
            <p><strong>Raridade:</strong> {card.rarity}</p>
            <p><strong>Artista:</strong> {card.artist}</p>
          </div>

          {/* Preço de Mercado (se disponível) */}
          {card.tcgplayer?.prices?.holofoil?.market && (
            <p className="mt-3 text-success">
              <strong>💰 Preço Médio:</strong> ${card.tcgplayer.prices.holofoil.market}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardDetails