import React, { createContext, useContext, useState } from 'react';
import { UserPersona } from '../types';

export interface UserModeContextType {
  persona: UserPersona;
  setPersona: (p: UserPersona) => void;
  togglePersona: () => void;
}

const UserModeContext = createContext<UserModeContextType>({
  persona: 'citizen',
  setPersona: () => {},
  togglePersona: () => {},
});

export const UserModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersona] = useState<UserPersona>(() => {
    const saved = localStorage.getItem('hima_persona');
    return (saved === 'authority' || saved === 'citizen') ? saved : 'citizen';
  });

  const handleSetPersona = (p: UserPersona) => {
    setPersona(p);
    localStorage.setItem('hima_persona', p);
  };

  const togglePersona = () => {
    const next = persona === 'citizen' ? 'authority' : 'citizen';
    handleSetPersona(next);
  };

  return (
    <UserModeContext.Provider value={{ persona, setPersona: handleSetPersona, togglePersona }}>
      {children}
    </UserModeContext.Provider>
  );
};

export const useUserMode = () => useContext(UserModeContext);
