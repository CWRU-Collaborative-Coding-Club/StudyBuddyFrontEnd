// ====================================================================
// FILE: components/study/CreateRequestScreen.js
// ====================================================================

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

export default function CreateRequestScreen({ 
  userClasses, 
  studyRequest, 
  setStudyRequest, 
  handleSubmitStudyRequest, 
  setActiveScreen 
}) {
  const studyTypes = [
    { value: 'learn-together', label: 'Learn Together', description: 'Actively teach and learn from each other' },
    { value: 'work-independently', label: 'Work Independently', description: 'Work on same topic, available for questions' },
    { value: 'accountability', label: 'Accountability Buddy', description: 'Work on different things, keep each other focused' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setActiveScreen('find-buddy')} style={styles.backButton}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Study Request</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Class</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={studyRequest.classId}
                onValueChange={(value) => setStudyRequest({...studyRequest, classId: value})}
                style={styles.picker}
              >
                <Picker.Item label="Select a class" value="" />
                {userClasses.map(cls => (
                  <Picker.Item key={cls.id} label={`${cls.code} - ${cls.name}`} value={cls.id} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>What do you want to study?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Chapter 5, Midterm Review, Problem Set 3"
              value={studyRequest.topic}
              onChangeText={(text) => setStudyRequest({...studyRequest, topic: text})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Study Type</Text>
            {studyTypes.map(type => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.radioOption,
                  studyRequest.studyType === type.value && styles.radioOptionSelected
                ]}
                onPress={() => setStudyRequest({...studyRequest, studyType: type.value})}
              >
                <View style={styles.radio}>
                  {studyRequest.studyType === type.value && <View style={styles.radioInner} />}
                </View>
                <View style={styles.radioText}>
                  <Text style={styles.radioLabel}>{type.label}</Text>
                  <Text style={styles.radioDescription}>{type.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={studyRequest.date}
                onChangeText={(text) => setStudyRequest({...studyRequest, date: text})}
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={studyRequest.time}
                onChangeText={(text) => setStudyRequest({...studyRequest, time: text})}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Duration</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={studyRequest.duration}
                onValueChange={(value) => setStudyRequest({...studyRequest, duration: value})}
                style={styles.picker}
              >
                <Picker.Item label="30 minutes" value="0.5" />
                <Picker.Item label="1 hour" value="1" />
                <Picker.Item label="1.5 hours" value="1.5" />
                <Picker.Item label="2 hours" value="2" />
                <Picker.Item label="3 hours" value="3" />
                <Picker.Item label="4 hours" value="4" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitStudyRequest}>
            <Text style={styles.submitButtonText}>Post Study Request</Text>
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
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 48,
  },
  radioOption: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#ffffff',
  },
  radioOptionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },
  radioText: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  radioDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});