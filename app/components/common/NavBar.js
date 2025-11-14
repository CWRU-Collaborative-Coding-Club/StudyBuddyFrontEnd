// ====================================================================
// FILE: components/common/NavBar.js
// ====================================================================

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Home, Search, Calendar, User } from 'lucide-react-native';

export default function NavBar({ activeScreen, setActiveScreen }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => setActiveScreen('home')}
      >
        <Home 
          size={24} 
          color={activeScreen === 'home' ? '#2563eb' : '#6b7280'} 
        />
        <Text style={[styles.label, activeScreen === 'home' && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => setActiveScreen('find-buddy')}
      >
        <Search 
          size={24} 
          color={activeScreen === 'find-buddy' ? '#2563eb' : '#6b7280'} 
        />
        <Text style={[styles.label, activeScreen === 'find-buddy' && styles.activeLabel]}>
          Find Buddy
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => setActiveScreen('calendar')}
      >
        <Calendar 
          size={24} 
          color={activeScreen === 'calendar' ? '#2563eb' : '#6b7280'} 
        />
        <Text style={[styles.label, activeScreen === 'calendar' && styles.activeLabel]}>
          Calendar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => setActiveScreen('profile')}
      >
        <User 
          size={24} 
          color={activeScreen === 'profile' ? '#2563eb' : '#6b7280'} 
        />
        <Text style={[styles.label, activeScreen === 'profile' && styles.activeLabel]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#6b7280',
  },
  activeLabel: {
    color: '#2563eb',
  },
});
