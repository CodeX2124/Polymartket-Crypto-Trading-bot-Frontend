"use client";

import { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextType {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <UserContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </UserContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}