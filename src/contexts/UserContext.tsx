'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginResponse, LoginResult } from '@/types/users';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  logoutToSignInPage: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  refreshToken: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const refreshToken = async (): Promise<boolean> => {
    try {
      const currentToken = localStorage.getItem('access_token');
      if (!currentToken) {
        return false;
      }
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/auth/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Réponse du serveur:', response.status, errorData);
        console.error('Headers de la réponse:', Object.fromEntries(response.headers.entries()));
        throw new Error(`Échec du rafraîchissement du token: ${response.status} ${errorData}`);
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      return true;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      logoutToSignInPage();
      return false;
    }
  };

  // Automatic refresh
  useEffect(() => {
    if (user && !refreshTimer) {
      const timer = setInterval(() => {
        refreshToken();
      }, 30 * 60 * 1000);   // Refresh every 30 min
      setRefreshTimer(timer);
    }

    return () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
        setRefreshTimer(null);
      }
    };
  }, [user]);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        // On vérifie simplement si le token est encore valide
        const isValid = await refreshToken();
        if (!isValid) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail: email,
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Échec de la connexion');
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      setUser(data.user);
      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  };

  const logout = (): void => {
    router.push("/")
    setTimeout(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    }, 1000);
  };

  const logoutToSignInPage = (): void => {
    router.push("/signin")
    setTimeout(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    }, 1000);
  };

  const value: UserContextType = {
    user,
    login,
    logout,
    logoutToSignInPage,
    loading,
    isAuthenticated: !!user,
    refreshToken
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
}