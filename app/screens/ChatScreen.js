import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'

const icebreakers = [
  "What's your favorite book?",
  "Coffee or tea?",
  "Ideal weekend?",
  "Last thing that made you laugh?"
]

const demoMessages = [
  { id: '1', content: "Hey! I loved your story about the mountains. Very evocative.", sender: 'them', created_at: new Date(Date.now() - 3600000) },
  { id: '2', content: "Thanks! Your writing has a really gentle quality to it.", sender: 'me', created_at: new Date(Date.now() - 1800000) },
  { id: '3', content: "I've always been drawn to places with meaning. You?", sender: 'them', created_at: new Date(Date.now() - 900000) },
]

export default function ChatScreen({ match, profile, onBack }) {
  const [messages, setMessages] = useState(demoMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
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
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Sarah, 28</Text>
          <Text style={styles.userStatus}>Ghost mode on • Photos hidden</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.reveal}>REVEAL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.icebreakers}>
        {icebreakers.map((ice, i) => (
          <TouchableOpacity key={i} style={styles.icebreaker}>
            <Text style={styles.icebreakerText}>{ice}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={messages}
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
    backgroundColor: '#faf9f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  back: {
    fontSize: 22,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userStatus: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#999',
  },
  reveal: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    fontWeight: 'bold',
  },
  icebreakers: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    backgroundColor: '#fff',
    overflowX: 'auto',
  },
  icebreaker: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  icebreakerText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    whiteSpace: 'nowrap',
  },
  messageList: {
    padding: 20,
  },
  message: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1a1a1a',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#1a1a1a',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendText: {
    color: '#fff',
    fontSize: 20,
  },
})
