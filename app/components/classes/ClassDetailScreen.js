// ====================================================================
// FILE: components/classes/ClassDetailScreen.js
// ====================================================================

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ChevronLeft, MessageSquare, BookOpen, Users as UsersIcon } from 'lucide-react-native';

export default function ClassDetailScreen({ 
  selectedClass, 
  matches, 
  currentUser, 
  setSelectedMatch, 
  setActiveScreen 
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setActiveScreen('home')} style={styles.backButton}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{selectedClass?.code}</Text>
          <Text style={styles.headerSubtitle}>{selectedClass?.name}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            const classMatch = matches.find(m => m.classId === selectedClass?.id);
            if (classMatch) {
              setSelectedMatch(classMatch);
              setActiveScreen('chat');
            }
          }}
        >
          <View style={styles.menuItemLeft}>
            <MessageSquare size={24} color="#2563eb" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>Class Chat</Text>
              <Text style={styles.menuItemSubtitle}>Message your study group</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <BookOpen size={24} color="#2563eb" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>Class Resources</Text>
              <Text style={styles.menuItemSubtitle}>Notes and study materials</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => setActiveScreen('create-request')}
        >
          <View style={styles.menuItemLeft}>
            <UsersIcon size={24} color="#2563eb" />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>Find Study Buddy</Text>
              <Text style={styles.menuItemSubtitle}>Create or join a study session</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Study Sessions</Text>
          {matches.filter(m => m.classId === selectedClass?.id).length > 0 ? (
            matches.filter(m => m.classId === selectedClass?.id).map(match => (
              <TouchableOpacity 
                key={match.id}
                style={styles.card}
                onPress={() => { 
                  setSelectedMatch(match); 
                  setActiveScreen('chat'); 
                }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardTitle}>
                      {match.participantNames.filter(name => name !== currentUser.name).join(', ')}
                    </Text>
                    {match.messages.length > 0 && (
                      <Text style={styles.cardSubtitle} numberOfLines={1}>
                        {match.messages[match.messages.length - 1].text}
                      </Text>
                    )}
                  </View>
                  <MessageSquare size={20} color="#2563eb" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <UsersIcon size={48} color="#9ca3af" />
              <Text style={styles.emptyText}>No active study sessions</Text>
              <TouchableOpacity onPress={() => setActiveScreen('create-request')}>
                <Text style={styles.link}>Create Study Session</Text>
              </TouchableOpacity>
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
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#bfdbfe',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  section: {
    padding: 16,
    marginTop: 8,
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
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
    marginBottom: 12,
  },
  link: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
});
