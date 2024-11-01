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

export default signGoogle;
