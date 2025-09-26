/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Link, useSegments } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../_layout'; // Import AuthContext from the root layout

const LoginScreen: React.FC = () => {
  const { app } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!app || !email || !password) {
      setError("Please enter email and password.");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      // Auth state listener in layout.tsx handles setting the userId and navigation
    } catch (e: any) {
      console.error("Login Error: ", e);
      // Display a user-friendly error message
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found') {
        setError('Invalid email or password.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
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
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
      
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Don&apos;t have an account? </Text>
        <Link href="/auth/signup" style={styles.link}>
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 18,
  },
  errorText: {
    color: '#ef4444',
    marginBottom: 15,
    fontSize: 14,
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  linkText: {
    color: '#4b5563',
    fontSize: 16,
  },
  link: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 16,
  }
});