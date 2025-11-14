// ====================================================================
// FILE: components/home/HomeScreen.js
// ====================================================================

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Plus, BookOpen, Users, MessageSquare } from 'lucide-react-native';

export default function HomeScreen({ 
  userClasses, 
  matches, 
  currentUser, 
  setSelectedClass, 
  setSelectedMatch, 
  setActiveScreen,
  setShowAddClass 
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Study Buddy</Text>
        <Text style={styles.headerSubtitle}>Find your perfect study partner</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Classes</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddClass(true)}
            >
              <Plus size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {userClasses.map(cls => (
            <TouchableOpacity 
              key={cls.id}
              style={styles.card}
              onPress={() => { 
                setSelectedClass(cls); 
                setActiveScreen('class-detail'); 
              }}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardLeft}>
                  <Text style={styles.cardTitle}>{cls.code}</Text>
                  <Text style={styles.cardSubtitle}>{cls.name}</Text>
                  <Text style={styles.cardMeta}>Section {cls.section}</Text>
                </View>
                <BookOpen size={24} color="#2563eb" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Study Groups</Text>
          {matches.length > 0 ? (
            matches.map(match => (
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
                    <Text style={styles.cardTitle}>{match.className}</Text>
                    <Text style={styles.cardSubtitle}>
                      with {match.participantNames.filter(name => name !== currentUser.name).join(', ')}
                    </Text>
                    {match.messages.length > 0 && (
                      <Text style={styles.cardMeta} numberOfLines={1}>
                        {match.messages[match.messages.length - 1].text}
                      </Text>
                    )}
                  </View>
                  <MessageSquare size={24} color="#2563eb" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Users size={48} color="#9ca3af" />
              <Text style={styles.emptyText}>No study groups yet</Text>
              <TouchableOpacity onPress={() => setActiveScreen('find-buddy')}>
                <Text style={styles.link}>Find a Study Buddy</Text>
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
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#2563eb',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'flex-start',
  },
  cardLeft: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 12,
    color: '#6b7280',
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