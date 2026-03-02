import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { sendMessage, getMessages, getProfile } from '../lib/supabase'

export default function ChatScreen({ match, profile, onBack }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Demo messages for now
  const demoMessages = [
    { id: '1', content: 'Hey! I loved your story about growing up in the mountains.', sender: 'them', created_at: new Date(Date.now() - 3600000) },
    { id: '2', content: 'Thanks! Your poem was beautiful too. When did you start writing?', sender: 'me', created_at: new Date(Date.now() - 1800000) },
    { id: '3', content: 'Been writing since I was a teenager. It helps me process things.', sender: 'them', created_at: new Date(Date.now() - 900000) },
  ]

  const handleSend = async () => {
    if (!newMessage.trim()) return
    
    const msg = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'me',
      created_at: new Date()
    }
    
    setMessages([...messages, msg])
    setNewMessage('')
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Chat</Text>
          <Text style={styles.headerStatus}>Photos hidden • Ghost mode on</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.revealButton}>🎭</Text>
        </View>
      </View>

      <View style={styles.photoReminder}>
        <Text>📸 Photos are hidden. Reveal when both agree!</Text>
      </View>

      <FlatList
        data={[...demoMessages, ...messages]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.message,
            item.sender === 'me' ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
          placeholderTextColor="#999"
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendText}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    fontSize: 28,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerStatus: {
    fontSize: 12,
    color: '#666',
  },
  headerRight: {
    padding: 8,
  },
  revealButton: {
    fontSize: 24,
  },
  photoReminder: {
    backgroundColor: '#f0f0ff',
    padding: 8,
    alignItems: 'center',
  },
  messageList: {
    padding: 16,
  },
  message: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6B4EFF',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendText: {
    color: '#fff',
    fontSize: 20,
  },
})
