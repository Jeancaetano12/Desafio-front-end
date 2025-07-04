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

import { useState, useEffect } from 'react'
// importa recursos do bootstrap instalado
import 'bootstrap/dist/css/bootstrap.min.css'
import SavedCards from './components/SavedCards'
import SearchBar from './components/SearchBar'
import CardDetails from './components/CardDetails'
import './styles.css'

function App() {
  const [savedCards, setSavedCards] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Carrega cartas salvas do localStorage ao iniciar
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('pokemonCards')) || []
    setSavedCards(saved)
  }, [])

  // Função para salvar carta atual
  const saveCard = () => {
    if (!currentCard || savedCards.some(card => card.id === currentCard.id)) return
    
    const updatedCards = [...savedCards, currentCard]
    setSavedCards(updatedCards)
    localStorage.setItem('pokemonCards', JSON.stringify(updatedCards))
  }

  // Função para remover cartas salvas
  const removeCard = (id) => {
  const updatedCards = savedCards.filter(card => card.id !== id)
  setSavedCards(updatedCards)
  localStorage.setItem('pokemonCards', JSON.stringify(updatedCards))
}

  return (
    <div className="container mt-4 dark-theme">
      <h3 className="dashboard-title">Dashboard Pokémon TCG</h3>
      <SavedCards 
        cards={savedCards} 
        onCardClick={setCurrentCard}
        onRemove={removeCard}
      />
      <SearchBar 
        onSearch={setCurrentCard} 
        setLoading={setLoading} 
        setError={setError} 
      />
      
      {loading && <div className="text-center mt-4">Carregando...</div>}
      {error && <div className="error-message">{error} <span className="error-icon">⚠️</span></div>}
      
      {currentCard && (
        <CardDetails 
          card={currentCard} 
          onSave={saveCard} 
          isSaved={savedCards.some(card => card.id === currentCard.id)}
        />
      )}
    </div>
  )
}

export default App


