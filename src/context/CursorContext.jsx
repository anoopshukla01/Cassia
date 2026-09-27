import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext({
  cursorText: '',
  isHovered: false,
  setCursor: () => {},
  resetCursor: () => {}
});

export const CursorProvider = ({ children }) => {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const setCursor = (text = '') => {
    setCursorText(text);
    setIsHovered(true);
  };

  const resetCursor = () => {
    setCursorText('');
    setIsHovered(false);
  };

  return (
    <CursorContext.Provider value={{ cursorText, isHovered, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
