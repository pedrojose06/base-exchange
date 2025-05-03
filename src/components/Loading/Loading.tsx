import React from 'react'

const Loading: React.FC = () => {
  return (
    <div
      data-cy="loading-indicator"
      className="flex h-full flex-col items-center justify-center"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
      </div>
      <p className="mt-5 animate-pulse text-gray-800 text-lg">Carregando...</p>
    </div>
  )
}

export default Loading
