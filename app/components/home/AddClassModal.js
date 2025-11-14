// ====================================================================
// FILE: components/home/AddClassModal.js
// ====================================================================

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

export default function AddClassModal({ showAddClass, setShowAddClass, newClass, setNewClass, handleAddClass }) {
  return (
    <Modal
      visible={showAddClass}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowAddClass(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Class</Text>
            <TouchableOpacity onPress={() => setShowAddClass(false)}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Course Code (e.g., CSDS281)"
            value={newClass.code}
            onChangeText={(text) => setNewClass({...newClass, code: text.toUpperCase()})}
          />

          <TextInput
            style={styles.input}
            placeholder="Course Name"
            value={newClass.name}
            onChangeText={(text) => setNewClass({...newClass, name: text})}
          />

          <TextInput
            style={styles.input}
            placeholder="Section (optional)"
            value={newClass.section}
            onChangeText={(text) => setNewClass({...newClass, section: text})}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddClass}>
            <Text style={styles.buttonText}>Add Class</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
