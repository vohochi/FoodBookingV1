// AuthHandler.tsx
'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { login } from '@/_lib/auth';
import { useAuth } from '@/context/AuthContext';

const AuthHandler = () => {
  const { status } = useSession();
  const { setAuthReady } = useAuth();

  useEffect(() => {
    const handleLogin = async () => {
      console.log(status);
      if (status === 'authenticated') {
        try {
          const result = await login({
            email: 'chivo241023icloud@gmail.com',
            password: 'vohochi',
          });
          console.log('Login result:', result);
          setAuthReady(true); // Set auth as ready after successful login
        } catch (error) {
          console.error('Login error:', error);
          setAuthReady(true); // Set auth as ready even if there's an error
        }
      } else if (status === 'unauthenticated') {
        setAuthReady(true); // Set auth as ready if user is not authenticated
      }
    };

    handleLogin();
  }, [status, setAuthReady]);

  return null;
};

export default AuthHandler;
