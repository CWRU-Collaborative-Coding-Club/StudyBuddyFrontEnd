import { Redirect } from 'expo-router';
import React, { useContext } from 'react';
import { AuthContext } from './_layout';

// This file is the true entry point of the application (the '/') route.
// Its only job is to immediately redirect the user based on their authentication status.
export default function RedirectIndex() {
  const { userId } = useContext(AuthContext);

  // If userId is available (user is authenticated), redirect to the main 'home' content.
  if (userId) {
    return <Redirect href="/home" />;
  }

  // If userId is NOT available (user is not authenticated), redirect to the login screen.
  // The (auth) group automatically makes 'login.tsx' the entry point for that group.
  return <Redirect href="/auth/login" />;
}
