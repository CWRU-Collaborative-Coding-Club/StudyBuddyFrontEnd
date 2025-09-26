/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// Firebase imports for Auth and Firestore
import { getAuth, signInWithCustomToken, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { initializeApp, FirebaseApp } from 'firebase/app';

// Define global variables expected from the execution environment
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

const StudyBuddyHome: React.FC = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState("Connecting to Firebase...");
  const [groupName, setGroupName] = useState('');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dbInstance, setDbInstance] = useState<any>(null); // Use 'any' for Firestore instance for simplicity

  // --- 1. FIREBASE INITIALIZATION AND AUTHENTICATION ---
  useEffect(() => {
    let app: FirebaseApp;
    let auth: any;
    
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    
    // Get Firebase configuration
    const firebaseConfigString = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';
    let firebaseConfig: Record<string, any> = {};

    try {
      firebaseConfig = JSON.parse(firebaseConfigString);
    } catch (e) {
      setMessage("Error parsing Firebase configuration.");
      return;
    }

    if (Object.keys(firebaseConfig).length === 0) {
      setMessage("Firebase config not found.");
      return;
    }

    try {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      const db = getFirestore(app);
      setDbInstance(db); // Save instance for later use

      // Listener for Authentication State Changes
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
          setMessage(`Authenticated. Your User ID: ${user.uid}`);
          
          // Set a basic profile document for the user
          await setDoc(doc(db, `artifacts/${appId}/users/${user.uid}/user_data/profile`), {
            lastLogin: new Date().toISOString()
          }, { merge: true });

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
            // Handle error, ensuring type safety for TypeScript
            if (error instanceof Error) {
              console.error("Authentication error: ", error.message);
              setMessage("Authentication failed. Check logs.");
            } else {
              console.error("Unknown authentication error.");
              setMessage("Authentication failed. Check logs.");
            }
          }
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe(); // Cleanup the listener
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Firebase initialization error: ", error.message);
        setMessage(`Initialization failed: ${error.message}`);
      } else {
        setMessage("Unknown initialization error.");
      }
    }
  }, []);

  // --- 2. STUDY GROUP CREATION LOGIC ---
  const createStudyGroup = async () => {
    if (!groupName || !subject || !userId || !dbInstance) {
      setMessage("Please fill out all fields and wait for connection.");
      return;
    }
    
    setIsLoading(true);

    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      
      // Save data to the public study_groups collection
      const docRef = await addDoc(collection(dbInstance, `artifacts/${appId}/public/data/study_groups`), {
        name: groupName,
        subject: subject,
        createdAt: new Date().toISOString(),
        createdBy: userId
      });

      setMessage(`✅ Group created! ID: ${docRef.id}`);
      setGroupName('');
      setSubject('');
    } catch (error: unknown) {
      console.error("Error adding document: ", error);
      setMessage("❌ Failed to create study group. Check console logs and security rules.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Study Buddy Creator</Text>
        <Text style={styles.message}>{message}</Text>
        
        {userId && <Text style={styles.userIdText}>Logged in: {userId}</Text>}
        
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Study Group Name (e.g., Final Exam Review)"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Subject (e.g., Organic Chemistry)"
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={[styles.button, (isLoading || !isAuthReady) && styles.buttonDisabled]}
            onPress={createStudyGroup}
            disabled={isLoading || !isAuthReady}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Study Group</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StudyBuddyHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937', 
    marginBottom: 10,
  },
  message: {
    color: '#4b5563', 
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
  },
  userIdText: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 15,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    gap: 15,
  },
  input: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#3b82f6', 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd', 
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
