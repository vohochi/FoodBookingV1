// actions/signGoogle.ts
'use server';

import { signIn } from '@/_lib/auth';

const signGoogle = async () => {
  try {
    await signIn('google', {
      redirectTo: '/user',
      callbackUrl: '/user',
    });
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

const signFacebook = async () => {
  // Corrected the typo here
  try {
    await signIn('facebook', {
      redirectTo: '/user',
      callbackUrl: '/user',
    });
  } catch (error) {
    console.error('Đăng nhập trên Facebook:', error);
    throw error;
  }
};

// Use named exports instead of default exports
export { signGoogle, signFacebook };
