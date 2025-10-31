import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { AuthContext } from "../_layout";
import { useRouter } from "expo-router"; // <--- NEW IMPORT

export default function LoginScreen() {
  const { mockSignIn, userId } = useContext(AuthContext); // <--- userId needed for useEffect
  const router = useRouter(); // <--- Initialize router

  // --- NEW: Watch for userId change and navigate ---
  useEffect(() => {
    // If the userId is set (meaning mockSignIn was successful)
    if (userId) {
      // Use replace to navigate and remove the login screen from the history stack
      router.replace("/home");
    }
  }, [userId, router]); // Re-run this effect whenever userId changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Study Buddy</Text>
      <Text style={styles.subtitle}>Sign in to find your study group</Text>

      {/* Mock login fields */}
      <TextInput
        style={styles.input}
        placeholder="Email (Ignored for demo)"
        keyboardType="email-address"
        placeholderTextColor="#9ca3af"
      />
      <TextInput
        style={styles.input}
        placeholder="Password (Ignored for demo)"
        secureTextEntry
        placeholderTextColor="#9ca3af"
      />

      {/* The button that performs the mock sign-in */}
      <TouchableOpacity
        style={styles.button}
        onPress={mockSignIn} // Still calls the mock sign-in
      >
        <Text style={styles.buttonText}>Sign In / Register (DEMO)</Text>
      </TouchableOpacity>

      <Text style={styles.message}>
        ⚠️ This is a mock screen for the presentation. Pressing the button
        immediately authenticates you.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1f2937",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  message: {
    marginTop: 40,
    fontSize: 12,
    textAlign: "center",
    color: "#dc2626",
    paddingHorizontal: 10,
  },
});
