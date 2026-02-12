"use client";

import React,{createContext , useState} from 'react'


export const ThemeContext = createContext();



const Theme = (props) => {

    const [dark , setDark] = useState("light");

    
  return (
    <div>
      <ThemeContext.Provider value={{dark , setDark}}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  )
}

export default Theme
