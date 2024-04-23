// src/hooks/useVisualMode.js
import React, { useState } from 'react';

const useVisualMode = (initialMode) => {
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode) => {
    setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;