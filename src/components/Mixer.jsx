import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaMusic, FaVolumeUp, FaVolumeMute, FaHeadphones } from 'react-icons/fa';

const Mixer = () => {
  const [tracks, setTracks] = useState([
    { id: 1, name: 'VOZ', type: 'mic', volume: 1, muted: false, solo: false },
    { id: 2, name: 'TRILHA', type: 'music', volume: 0.5, muted: false, solo: false },
    { id: 3, name: 'EFEITO 1', type: 'effect', volume: 0.5, muted: false, solo: false }
  ]);

  const audioContext = useRef(null);
  const analysers = useRef([]);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const handleVolumeChange = (id, value) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, volume: value } : track
    ));
  };

  const toggleMute = (id) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, muted: !track.muted } : track
    ));
  };

  const toggleSolo = (id) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, solo: !track.solo } : track
    ));
  };

  return (
    <div className="mixer-container p-4 bg-gray-900 rounded-lg">
      <div className="tracks-grid grid grid-cols-3 gap-4">
        {tracks.map(track => (
          <div key={track.id} className="track-channel bg-gray-800 p-4 rounded-lg">
            <div className="track-header flex items-center justify-between mb-4">
              <div className="track-name text-cyan-400 font-bold">{track.name}</div>
              <div className="track-controls flex gap-2">
                <button 
                  onClick={() => toggleMute(track.id)}
                  className={`p-2 rounded ${track.muted ? 'bg-red-500' : 'bg-gray-700'}`}
                >
                  <FaVolumeMute />
                </button>
                <button 
                  onClick={() => toggleSolo(track.id)}
                  className={`p-2 rounded ${track.solo ? 'bg-yellow-500' : 'bg-gray-700'}`}
                >
                  <FaHeadphones />
                </button>
              </div>
            </div>
            <div className="vu-meter h-32 w-4 bg-gray-700 rounded mb-4">
              {/* VU Meter será implementado com Canvas */}
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={track.volume}
              onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mixer; 