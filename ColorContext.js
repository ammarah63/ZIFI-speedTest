import React, { createContext, useState, useContext } from "react";


const ColorContext = createContext();


export const useTextColor = () => useContext(ColorContext);


export const ColorProvider = ({ children }) => {
  const [textColor, setTextColor] = useState("#ffffff"); 

  const changeTextColor = (color) => {
    setTextColor(color);
  };

  return (
    <ColorContext.Provider value={{ textColor, changeTextColor }}>
      {children}
    </ColorContext.Provider>
  );
};
