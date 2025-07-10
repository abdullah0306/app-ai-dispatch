import React, { createContext, useContext, useState } from 'react';

const ScrapedDataContext = createContext();

export const useScrapedData = () => useContext(ScrapedDataContext);

export const ScrapedDataProvider = ({ children }) => {
  const [scrapedData, setScrapedData] = useState(null);
  return (
    <ScrapedDataContext.Provider value={{ scrapedData, setScrapedData }}>
      {children}
    </ScrapedDataContext.Provider>
  );
}; 