import React from 'react';
import Mixer from './components/Mixer';
import Teleprompter from './components/Teleprompter';
import './style.css';

function App() {
  return (
    <div className="app min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-cyan-400">Edronet Studio</h1>
        <p className="text-gray-400">Estúdio virtual para podcasts e videocasts</p>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="mixer-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Mesa de Som</h2>
            <Mixer />
          </div>
          <div className="teleprompter-section">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Teleprompter</h2>
            <Teleprompter />
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 p-4 mt-8">
        <p className="text-center text-gray-400">
          Desenvolvido por Edronet para edvaldo.tech
        </p>
      </footer>
    </div>
  );
}

export default App;