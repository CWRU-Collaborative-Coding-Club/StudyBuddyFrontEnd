// ====================================================================
// FILE: components/profile/ProfileScreen.js
// ====================================================================

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { LogOut } from 'lucide-react-native';

export default function ProfileScreen({ 
  currentUser, 
  userClasses, 
  setShowAddClass,
  onLogout 
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{currentUser.name}</Text>
            <Text style={styles.profilePronouns}>{currentUser.pronouns}</Text>
            <Text style={styles.profileEmail}>{currentUser.email}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>My Classes</Text>
            <TouchableOpacity onPress={() => setShowAddClass(true)}>
              <Text style={styles.link}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {userClasses.map(cls => (
            <View key={cls.id} style={styles.classList}>
              <View style={styles.classItem}>
                <Text style={styles.classCode}>{cls.code}</Text>
                <Text style={styles.className}>{cls.name}</Text>
              </View>
              <Text style={styles.classSection}>Section {cls.section}</Text>
            </View>
          ))}
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuTitle}>Study Statistics</Text>
              <Text style={styles.menuSubtitle}>View your study hours and progress</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuTitle}>Notifications</Text>
              <Text style={styles.menuSubtitle}>Manage your notification preferences</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View>
              <Text style={styles.menuTitle}>Settings</Text>
              <Text style={styles.menuSubtitle}>Account and app settings</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <View>
              <Text style={styles.logoutTitle}>Log Out</Text>
              <Text style={styles.logoutSubtitle}>Sign out of your account</Text>
            </View>
            <LogOut size={20} color="#dc2626" />
          </TouchableOpacity>
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
  profileCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  profilePronouns: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  link: {
    fontSize: 14,
    color: '#2563eb',
  },
  classList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  classItem: {
    flex: 1,
  },
  classCode: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  className: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  classSection: {
    fontSize: 12,
    color: '#9ca3af',
  },
  menuSection: {
    padding: 16,
    paddingTop: 0,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#dc2626',
  },
  logoutSubtitle: {
    fontSize: 14,
    color: '#dc2626',
    marginTop: 2,
  },
});