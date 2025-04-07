import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Teleprompter = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setScrollPosition(prev => {
          const newPosition = prev + 1;
          if (containerRef.current && newPosition >= containerRef.current.scrollHeight) {
            setIsPlaying(false);
            return 0;
          }
          return newPosition;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, scrollSpeed]);

  const handleSpeedChange = (delta) => {
    setScrollSpeed(prev => Math.max(10, Math.min(100, prev + delta)));
  };

  return (
    <div className="teleprompter-container bg-gray-900 p-4 rounded-lg">
      <div className="controls flex justify-between items-center mb-4">
        <div className="speed-controls flex items-center gap-4">
          <button
            onClick={() => handleSpeedChange(-10)}
            className="p-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            <FaArrowDown />
          </button>
          <span className="text-cyan-400">{scrollSpeed}</span>
          <button
            onClick={() => handleSpeedChange(10)}
            className="p-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            <FaArrowUp />
          </button>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-cyan-500 rounded hover:bg-cyan-600"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <div
        ref={containerRef}
        className="teleprompter-text bg-gray-800 p-4 rounded-lg h-64 overflow-hidden"
        style={{ transform: `translateY(-${scrollPosition}px)` }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full bg-transparent text-white resize-none focus:outline-none"
          placeholder="Digite seu texto aqui..."
        />
      </div>
    </div>
  );
};

export default Teleprompter; 