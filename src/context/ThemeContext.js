import React from "react"; 
export const ThemeContext = React.createContext(null); 
 
export const Theme = ({ children, value }) => { 
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>; 
}; 