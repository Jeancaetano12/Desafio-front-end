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
// 

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

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard Pokémon TCG</h1>
      
      <SavedCards cards={savedCards} onCardClick={setCurrentCard} />
      <SearchBar 
        onSearch={setCurrentCard} 
        setLoading={setLoading} 
        setError={setError} 
      />
      
      {loading && <div className="text-center mt-4">Carregando...</div>}
      {error && <div className="alert alert-danger mt-4">{error}</div>}
      
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


