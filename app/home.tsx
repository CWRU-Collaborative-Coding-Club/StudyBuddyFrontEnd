import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
// Removed all Firebase imports
import { AuthContext } from './_layout';

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  createdAt: string;
  createdBy: string;
}

// Initial mock data
const initialMockGroups: StudyGroup[] = [
  { id: '1', name: 'Organic Chemistry Midterm Review', subject: 'CHEM 340', createdAt: new Date(Date.now() - 86400000).toISOString(), createdBy: 'MOCK_ADMIN' },
  { id: '2', name: 'Intro to Algorithms HW 5', subject: 'CS 201', createdAt: new Date(Date.now() - 3600000).toISOString(), createdBy: 'MOCK_ADMIN' },
];

export default function HomePage() {
  // Removed dbInstance from useContext
  const { userId } = useContext(AuthContext);

  const [groupName, setGroupName] = useState('');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(initialMockGroups);

  // --- MOCK LOAD STUDY GROUPS (not strictly necessary but keeps the structure) ---
  const loadStudyGroups = async () => {
    // Already loaded with initialMockGroups, just sort to simulate orderBy
    const sortedGroups = [...studyGroups].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setStudyGroups(sortedGroups);
  };

  // Load study groups on mount (now just sorts mock data)
  useEffect(() => {
    // No need to check for userId or dbInstance, just run the load function
    loadStudyGroups();
  }, []);

  // --- MOCK CREATE STUDY GROUP ---
  const createStudyGroup = async () => {
    if (!groupName.trim() || !subject.trim()) {
      setMessage("⚠️ Please fill in both fields");
      return;
    }

    if (!userId) {
      // Should not happen if redirected correctly, but good for safety
      setMessage("⚠️ User not authenticated.");
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Simulate adding a document and getting an ID
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call delay
      const mockId = Math.random().toString(36).substring(2, 10);
      
      const newGroup: StudyGroup = {
        id: mockId,
        name: groupName.trim(),
        subject: subject.trim(),
        createdAt: new Date().toISOString(),
        createdBy: userId
      };

      // Add new group to the list and sort (descending order)
      setStudyGroups(prevGroups => [newGroup, ...prevGroups].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

      setMessage(`✅ Study group created! ID: ${mockId}...`);
      setGroupName('');
      setSubject('');
      
    } catch (error: any) {
      // Mock error handling
      console.error("Error creating group:", error);
      setMessage(`❌ Failed to create group: Simulation Error`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📚 Study Buddy</Text>
          <Text style={styles.subtitle}>Create and join study groups</Text>
          {userId && (
            <Text style={styles.userIdText}>
              Logged in: {userId.substring(0, 8)}... (Mock ID)
            </Text>
          )}
        </View>

        {/* Create Group Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create New Study Group</Text>

          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Group Name (e.g., Final Exam Review)"
            placeholderTextColor="#9ca3af"
          />

          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Subject (e.g., Organic Chemistry)"
            placeholderTextColor="#9ca3af"
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={createStudyGroup}
            disabled={isLoading || !userId}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Study Group</Text>
            )}
          </TouchableOpacity>

          {message ? (
            <Text style={styles.message}>{message}</Text>
          ) : null}
        </View>

        {/* Study Groups List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Study Groups ({studyGroups.length}) (Mock Data)</Text>

          {studyGroups.length === 0 ? (
            <Text style={styles.emptyText}>
              No study groups yet. Create the first one! 🎯
            </Text>
          ) : (
            studyGroups.map((group) => (
              <View key={group.id} style={styles.groupItem}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupSubject}>{group.subject}</Text>
                <Text style={styles.groupDate}>
                  Created: {new Date(group.createdAt).toLocaleDateString()}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Instructions replaced with presentation info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>✅ Presentation Ready Mockup:</Text>
          <Text style={styles.infoText}>
            This page now uses local state and mock data to demonstrate the Create and List functionality without requiring a live Firebase connection.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 20,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 10,
  },
  userIdText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  message: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
    color: '#4b5563',
  },
  groupItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  groupSubject: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  groupDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 14,
    paddingVertical: 20,
  },
  infoCard: {
    backgroundColor: '#d1fae5', // Light green for success
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#34d399', // Green border
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065f46', // Dark green text
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#065f46', // Dark green text
    lineHeight: 20,
  },
});