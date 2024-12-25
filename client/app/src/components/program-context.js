import React, { createContext, useState } from "react";

export const ProgramContext = createContext();

export const ProgramProvider = ({ children }) => {
  const [programData, setProgramData] = useState(null);

  return (
    <ProgramContext.Provider value={{ programData, setProgramData }}>
      {children}
    </ProgramContext.Provider>
  );
};