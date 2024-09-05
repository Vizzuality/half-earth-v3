import React, { createContext, useState } from 'react'

const LightModeContext = createContext();

function LightModeProvider(props) {
  const [lightMode, setLightMode] = useState(false);
  const toggleLightMode = () => {
    setLightMode(!lightMode);
  }

  return (
    <div>
      <LightModeContext.Provider value={{lightMode, toggleLightMode}}>
        {props.children}
      </LightModeContext.Provider>
    </div>
  )
}

export {LightModeContext, LightModeProvider};
