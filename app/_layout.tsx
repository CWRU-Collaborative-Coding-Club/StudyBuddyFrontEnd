/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
// NOTE: Added 'Text' import here for the loading screen
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'; 

// Firebase imports
import { getAuth, signInWithCustomToken, onAuthStateChanged, signInAnonymously, Auth } from 'firebase/auth';
// NOTE: Imported Firestore type for clean context
import { getFirestore, Firestore } from 'firebase/firestore'; 
import { initializeApp, FirebaseApp } from 'firebase/app';

// Define global variables expected from the execution environment
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

// Context to share auth status and DB instance across the app
interface AuthContextType {
  userId: string | null;
  // NOTE: Used Firestore type instead of 'any'
  dbInstance: Firestore | null; 
  app: FirebaseApp | null;
}
// NOTE: Updated initial context value to reflect null types
export const AuthContext = React.createContext<AuthContextType>({ userId: null, dbInstance: null, app: null });

export default function RootLayout() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  // NOTE: Used Firestore type instead of 'any'
  const [dbInstance, setDbInstance] = useState<Firestore | null>(null);
  const [appInstance, setAppInstance] = useState<FirebaseApp | null>(null);

  // --- FIREBASE INITIALIZATION AND AUTHENTICATION ---
  useEffect(() => {
    let app: FirebaseApp;
    let auth: Auth; // NOTE: Used Auth type
    
    const firebaseConfigString = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';
    // NOTE: Defined type for firebaseConfig
    let firebaseConfig: Record<string, unknown> = {}; 

    try {
      firebaseConfig = JSON.parse(firebaseConfigString);
    } catch (e) {
      console.error("Error parsing Firebase configuration.");
      // We still need to set isReady to true so the app doesn't hang on a blank screen
      setIsReady(true);
      return;
    }

    if (Object.keys(firebaseConfig).length === 0) {
      // If no config, just stop and show error later
      setIsReady(true); 
      return;
    }

    try {
      app = initializeApp(firebaseConfig as Record<string, string>); // Cast for initializeApp
      auth = getAuth(app);
      setAppInstance(app);
      setDbInstance(getFirestore(app));

      // Listener for Authentication State Changes
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          // Attempt custom token sign-in or anonymous sign-in if no user is found
          try {
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : '';
            if (initialAuthToken) {
              await signInWithCustomToken(auth, initialAuthToken);
            } else {
              await signInAnonymously(auth);
            }
          } catch (error: unknown) {
            console.error("Authentication failed during sign-in attempt.");
            setUserId(null); 
          }
        }
        setIsReady(true);
      });

      return () => unsubscribe(); // Cleanup the listener
    } catch (error: unknown) {
      console.error("Firebase initialization error: ", error);
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    // Show a loading/splash screen while we check auth status
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ marginTop: 10 }}>Loading Study Buddy...</Text>
      </View>
    );
  }

  // NOTE: We keep these for clarity, even if not strictly used in the return statement's Stack logic
  const isAuth = !!userId; 
  
  return (
    <AuthContext.Provider value={{ userId, dbInstance, app: appInstance }}>
      <Stack>
        {/* Hide the header on all screens for a clean look */}
        <Stack.Screen name="index" options={{ headerShown: false }} /> 
        
        {/* Group the auth screens and show them only if the user is NOT authenticated */}
        <Stack.Screen 
          name="(auth)" 
          options={{ headerShown: false, presentation: 'modal' }} 
          // The redirect logic handles navigation based on auth status
          // FIX: Changed 'index' to boolean 'isAuth' to match expected prop type
          redirect={isAuth} 
        />
        
        {/* If using the default template, you might have other routes like '(tabs)' */}
        {/* You may need to adapt this based on the exact files in your project's app/ directory */}
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
  }
});
