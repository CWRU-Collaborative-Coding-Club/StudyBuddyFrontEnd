// ====================================================================
// FILE: components/calendar/CalendarScreen.js
// ====================================================================

import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react-native';

export default function CalendarScreen({ studySessions }) {
  const getDaysInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { firstDay, daysInMonth, today: today.getDate(), month, year };
  };

  const { firstDay, daysInMonth, today, month, year } = getDaysInMonth();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getSessionsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return studySessions.filter(session => session.date === dateStr);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Study Calendar</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.calendar}>
          <Text style={styles.calendarTitle}>{monthNames[month]} {year}</Text>
          
          <View style={styles.dayNames}>
            {dayNames.map(day => (
              <Text key={day} style={styles.dayName}>{day}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {Array(firstDay).fill(null).map((_, i) => (
              <View key={`empty-${i}`} style={styles.dayCell} />
            ))}
            
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day = i + 1;
              const sessions = getSessionsForDate(day);
              const isToday = day === today;
              
              return (
                <View 
                  key={day} 
                  style={[
                    styles.dayCell,
                    styles.dayCellWithContent,
                    isToday && styles.todayCell
                  ]}
                >
                  <Text style={[styles.dayNumber, isToday && styles.todayNumber]}>
                    {day}
                  </Text>
                  {sessions.length > 0 && (
                    <View style={styles.dots}>
                      {sessions.slice(0, 3).map((session, idx) => (
                        <View 
                          key={idx} 
                          style={[
                            styles.dot,
                            session.type === 'buddy' ? styles.buddyDot : styles.soloDot
                          ]} 
                        />
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.buddyDot]} />
            <Text style={styles.legendText}>Study Buddy</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.soloDot]} />
            <Text style={styles.legendText}>Solo Study</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
          {studySessions
            .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
            .map(session => (
              <View key={session.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{session.title}</Text>
                  <View style={[
                    styles.badge,
                    session.type === 'buddy' ? styles.buddyBadge : styles.soloBadge
                  ]}>
                    <Text style={styles.badgeText}>
                      {session.type === 'buddy' ? 'Study Buddy' : 'Solo'}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.infoRow}>
                    <CalendarIcon size={16} color="#6b7280" />
                    <Text style={styles.infoText}>
                      {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.infoText}>
                      {session.time} ({session.duration})
                    </Text>
                  </View>
                  {session.participants.length > 0 && (
                    <View style={styles.infoRow}>
                      <Users size={16} color="#6b7280" />
                      <Text style={styles.infoText}>
                        {session.participants.join(', ')}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
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
  calendar: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111827',
  },
  dayNames: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    paddingVertical: 8,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    padding: 4,
  },
  dayCellWithContent: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayCell: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  dayNumber: {
    fontSize: 12,
    color: '#374151',
  },
  todayNumber: {
    fontWeight: 'bold',
    color: '#2563eb',
  },
  dots: {
    flexDirection: 'row',
    gap: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  buddyDot: {
    backgroundColor: '#16a34a',
  },
  soloDot: {
    backgroundColor: '#2563eb',
  },
  legend: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#374151',
  },
  section: {
    padding: 16,
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
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  buddyBadge: {
    backgroundColor: '#dcfce7',
  },
  soloBadge: {
    backgroundColor: '#dbeafe',
  },
  badgeText: {
    fontSize: 12,
    color: '#111827',
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
});
