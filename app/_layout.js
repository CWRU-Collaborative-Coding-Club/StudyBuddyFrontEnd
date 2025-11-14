// app/_layout.js
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from './context/AuthContext';

// This is the component that uses the context to decide the stack
function RootLayoutContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack>
      {isAuthenticated ? (
        // Main App Screens (e.g., Tabs, Home)
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        // Auth Screens
        <>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </>
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

// This is the exported layout component that provides the context
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}