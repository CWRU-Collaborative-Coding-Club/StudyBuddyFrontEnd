// ====================================================================
// FILE: components/study/FindBuddyScreen.js
// ====================================================================

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Plus, Search, User as UserIcon, Clock, Users } from 'lucide-react-native';

export default function FindBuddyScreen({ studyRequests, currentUser, setActiveScreen }) {
  const studyTypes = [
    { value: 'learn-together', label: 'Learn Together' },
    { value: 'work-independently', label: 'Work Independently' },
    { value: 'accountability', label: 'Accountability Buddy' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Study Buddy</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setActiveScreen('create-request')}
        >
          <Plus size={20} color="#ffffff" />
          <Text style={styles.createButtonText}>Create Study Request</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Study Sessions</Text>
          
          {studyRequests.length > 0 ? (
            studyRequests.map(req => (
              <View key={req.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardTitle}>{req.className}</Text>
                    <Text style={styles.cardSubtitle}>{req.topic}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{req.status}</Text>
                  </View>
                </View>

                <View style={styles.cardInfo}>
                  <View style={styles.infoRow}>
                    <UserIcon size={16} color="#6b7280" />
                    <Text style={styles.infoText}>{req.userName}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.infoText}>
                      {new Date(req.date).toLocaleDateString()} at {req.time} ({req.duration})
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Users size={16} color="#6b7280" />
                    <Text style={styles.infoText}>
                      {studyTypes.find(t => t.value === req.studyType)?.label}
                    </Text>
                  </View>
                </View>

                {req.userId !== currentUser.id && (
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join Session</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Search size={48} color="#9ca3af" />
              <Text style={styles.emptyText}>No study sessions available</Text>
              <Text style={styles.emptySubtext}>Be the first to create one!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  createButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#1e40af',
  },
  cardInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
  },
  joinButton: {
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
});
