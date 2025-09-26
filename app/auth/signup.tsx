/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Update the import path to match your actual layout file location
import { AuthContext } from "../_layout"; // Import AuthContext from the parent layout

const SignupScreen: React.FC = () => {
  const { app } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!app || !email || !password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      // Auth state listener in layout.tsx handles setting the userId and navigation
    } catch (e: any) {
      console.error("Sign-up Error: ", e);
      if (e.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (e.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password (min 6 characters)"
        secureTextEntry
        placeholderTextColor="#888"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
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
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    fontSize: 16,
    color: "#1f2937",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#93c5fd",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 18,
  },
  errorText: {
    color: "#ef4444",
    marginBottom: 15,
    fontSize: 14,
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  linkText: {
    color: "#4b5563",
    fontSize: 16,
  },
  link: {
    color: "#3b82f6",
    fontWeight: "600",
    fontSize: 16,
  },
});
