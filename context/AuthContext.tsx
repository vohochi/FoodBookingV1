// AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  isAuthReady: boolean;
  setAuthReady: (ready: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthReady, setAuthReady] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthReady, setAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
