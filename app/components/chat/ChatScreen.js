// ====================================================================
// FILE: components/chat/ChatScreen.js
// ====================================================================

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView } from 'react-native';
import { ChevronLeft, BookOpen, Upload, Send } from 'lucide-react-native';

export default function ChatScreen({ 
  selectedMatch, 
  currentUser, 
  newMessage, 
  setNewMessage, 
  handleSendMessage, 
  setActiveScreen 
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setActiveScreen('home')} style={styles.backButton}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{selectedMatch?.className}</Text>
          <Text style={styles.headerSubtitle}>
            {selectedMatch?.participantNames.filter(name => name !== currentUser.name).join(', ')}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
          {selectedMatch?.messages.map(msg => (
            <View 
              key={msg.id} 
              style={[
                styles.messageWrapper,
                msg.userId === currentUser.id ? styles.messageWrapperRight : styles.messageWrapperLeft
              ]}
            >
              <View 
                style={[
                  styles.messageBubble,
                  msg.userId === currentUser.id ? styles.messageBubbleSent : styles.messageBubbleReceived
                ]}
              >
                {msg.userId !== currentUser.id && (
                  <Text style={styles.messageSender}>{msg.userName}</Text>
                )}
                <Text style={[
                  styles.messageText,
                  msg.userId === currentUser.id ? styles.messageTextSent : styles.messageTextReceived
                ]}>
                  {msg.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  msg.userId === currentUser.id ? styles.messageTimeSent : styles.messageTimeReceived
                ]}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.resourcesSection}>
            <Text style={styles.resourcesTitle}>Shared Resources</Text>
            {selectedMatch?.notes.map(note => (
              <View key={note.id} style={styles.resource}>
                <BookOpen size={16} color="#2563eb" />
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceName}>{note.fileName}</Text>
                  <Text style={styles.resourceMeta}>by {note.uploadedBy}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.uploadButton}>
              <Upload size={16} color="#6b7280" />
              <Text style={styles.uploadButtonText}>Upload Resource</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Send size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#bfdbfe',
    marginTop: 2,
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageWrapperLeft: {
    alignItems: 'flex-start',
  },
  messageWrapperRight: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 12,
  },
  messageBubbleReceived: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageBubbleSent: {
    backgroundColor: '#2563eb',
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
  },
  messageTextReceived: {
    color: '#111827',
  },
  messageTextSent: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  messageTimeReceived: {
    color: '#9ca3af',
  },
  messageTimeSent: {
    color: '#bfdbfe',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
  },
  resourcesSection: {
    marginBottom: 12,
  },
  resourcesTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  resource: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  resourceInfo: {
    marginLeft: 8,
    flex: 1,
  },
  resourceName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  resourceMeta: {
    fontSize: 12,
    color: '#6b7280',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
