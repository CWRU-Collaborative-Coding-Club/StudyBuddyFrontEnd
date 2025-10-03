/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// Assuming _layout.tsx holds the AuthContext
import { AuthContext } from "../../app/_layout";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Get the initialized Firebase App instance from context
  const { app } = useContext(AuthContext);

  const handleSignUp = async () => {
    // 1. Client-side Validation Checks (unchanged)
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // 2. Firebase Sign Up Logic
    setIsLoading(true);
    setError("");

    try {
      // *** FIX ***: Safely check for the initialized app instance
      if (!app) {
        throw new Error(
          "Firebase App is not initialized. Please check your _layout.tsx file."
        );
      }

      // *** FIX ***: Get the auth service using the initialized app instance
      const auth = getAuth(app);

      await createUserWithEmailAndPassword(auth, email, password);

      // On successful sign-up, redirection is handled
      router.replace("/home");
    } catch (e: unknown) {
      setIsLoading(false);
      let errorMessage = "An unknown error occurred during sign-up.";

      if (e instanceof Error) {
        // Logging the full error object for detailed debugging in the terminal
        console.error("Authentication error:", e);

        // Parse common Firebase errors for friendlier messages
        if ("code" in e && typeof e.code === "string") {
          if (e.code === "auth/invalid-email") {
            errorMessage = "The email address is not valid.";
          } else if (e.code === "auth/email-already-in-use") {
            errorMessage = "This email is already registered.";
          } else if (e.code === "auth/operation-not-allowed") {
            errorMessage =
              "Account creation is currently disabled. Check Firebase settings.";
          } else if (e.code === "auth/network-request-failed") {
            errorMessage = "Network error or firewall blocked the request.";
          } else {
            errorMessage = e.message;
          }
        }
      }
      setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password (min 6 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account? </Text>
        <Link href="/auth/login" style={styles.link}>
          Log In
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#0f172a",
  },
  input: {
    height: 50,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: "#93c5fd",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "500",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: "#475569",
  },
  link: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "bold",
  },
});
