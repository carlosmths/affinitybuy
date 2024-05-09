'use client';

import React from 'react';

interface GlobalContextProps {
  isTouchDevice: boolean;
}

const GlobalContext = React.createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};

export const GlobalContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [isTouchDevice, setIsTouchDevice] = React.useState<boolean>(false);

  React.useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: coarse)');

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    setIsTouchDevice(pointerQuery.matches);
    pointerQuery.addEventListener('change', handlePointerChange);

    return () => {
      pointerQuery.removeEventListener('change', handlePointerChange);
    };
  }, []);

  const contextValue: GlobalContextProps = {
    isTouchDevice,
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
