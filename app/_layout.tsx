/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

// Removed all Firebase imports

// Context to share auth status and DB instance across the app
interface AuthContextType {
  userId: string | null;
  // dbInstance: Firestore | null; // Removed
  // app: FirebaseApp | null;      // Removed
  mockSignIn: () => void; // Added mock sign-in function
}

// Initial value for the context
export const AuthContext = React.createContext<AuthContextType>({
  userId: null,
  mockSignIn: () => console.log('Mock Sign In'),
});

export default function RootLayout() {
  // Use a simple boolean or a mock user ID for state
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  // Removed dbInstance and appInstance states
  const [error, setError] = useState<string | null>(null);

  // --- MOCK INITIALIZATION ---
  // Simulate an app loading delay, replacing Firebase init
  useEffect(() => {
    console.log("Simulating app initialization...");
    const timeout = setTimeout(() => {
      // In a real scenario, you'd check storage for a token.
      // For the demo, we'll start unauthenticated.
      // Optionally, you can set a mock ID for a logged-in start: setUserId('MOCK_USER_ID_123');
      setIsReady(true);
      console.log("Mock initialization complete.");
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timeout);
  }, []);

  // --- MOCK SIGN IN FUNCTION ---
  const mockSignIn = () => {
    // In a real app, this would be a successful sign-in handler.
    // For the demo, we immediately set a mock user ID.
    const mockId = 'MOCK_USER_ID_123';
    console.log("Simulating sign-in, setting ID:", mockId);
    setUserId(mockId);
  };

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading Study Buddy...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorTitle}>⚠️ Error</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const isAuth = !!userId;

  return (
    <AuthContext.Provider value={{ userId, mockSignIn }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* The (auth) group will need a login.tsx inside it. We will handle the redirect here */}
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, presentation: 'modal' }}
          // Redirect to home if authenticated
          redirect={isAuth ? true : undefined}
        />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#6b7280',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});