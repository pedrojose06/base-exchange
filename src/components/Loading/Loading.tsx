import React from 'react'
import './Loading.css' // Import the CSS for the animation

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="coin">
        <div className="coin-front" />
        <div className="coin-back" />
      </div>
      <p>Carregando...</p>
    </div>
  )
}

export default Loading
