import { useState, useEffect } from 'react'
import './App.css'
import data from './data.json'

function App() {
  const [cards, setCards] = useState(data)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length)
    }, 150)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }, 150)
  }

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="container">
      <header className="header">
        <h1>Cybersecurity Flashcards</h1>
        <p>Course 20940 - Open University</p>
      </header>

      <div className="main">
        <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="card-inner">
            <div className="card-front">
              <div className="card-content">
                <span className="term-label">TERM</span>
                <h2 className="term-title">{currentCard.term}</h2>
                <p className="full-name">{currentCard.fullName}</p>
                <button className="reveal-btn" onClick={(e) => { e.stopPropagation(); handleFlip(); }}>
                  Show definition
                </button>
              </div>
            </div>
            <div className="card-back" dir="rtl">
              <div className="card-content">
                <span className="term-label">DEFINITION</span>
                <p className="definition-text">{currentCard.definition}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="controls">
          <button className="secondary-btn" onClick={handlePrev}>Previous</button>
          <span className="counter">{currentIndex + 1} / {cards.length}</span>
          <button className="secondary-btn" onClick={handleNext}>Next</button>
        </div>

        <div className="actions">
          <button className="tertiary-btn" onClick={handleShuffle}>Shuffle Deck</button>
        </div>
      </div>

      <footer className="footer">
        <p>Flashcards Created By <a href="https://www.linkedin.com/in/menachem-mendel-kalish-95b184249?utm_source=share&utm_campaign=share_via&utm_content=profile" target="_blank" rel="noopener noreferrer">Menachem Mendel Kalish</a></p>
      </footer>
    </div>
  )
}

export default App