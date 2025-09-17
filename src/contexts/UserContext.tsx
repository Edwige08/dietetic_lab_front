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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('user_data');
        localStorage.removeItem('access_token');
      }
    }
    setLoading(false);
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
      // localStorage.setItem('user_data', JSON.stringify(data.user));
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
      localStorage.removeItem('user_data');
      setUser(null);
    }, 1000);
  };

  const logoutToSignInPage = (): void => {
    router.push("/signin")
    setTimeout(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_data');
      setUser(null);
    }, 1000);
  };

  const value: UserContextType = {
    user,
    login,
    logout,
    logoutToSignInPage,
    loading,
    isAuthenticated: !!user
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