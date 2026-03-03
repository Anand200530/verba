import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native'

const icebreakers = [
  "What's your favorite book?",
  "Coffee or tea?",
  "Ideal weekend?",
  "Last thing that made you laugh?",
  "Dream travel destination?",
  "Favorite movie?",
]

export default function ChatScreen({ userData, onBack }) {
  const [messages, setMessages] = useState([
    { id: '1', content: "Hey! I loved your story about the mountains. Very evocative.", sender: 'them' },
    { id: '2', content: "Thanks! Your writing has a really gentle quality to it.", sender: 'me' },
    { id: '3', content: "I've always been drawn to places with meaning. You?", sender: 'them' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (!newMessage.trim()) return
    const msg = { id: Date.now().toString(), content: newMessage, sender: 'me' }
    setMessages([...messages, msg])
    setNewMessage('')
  }

  const handleIcebreaker = (icebreaker) => {
    const msg = { id: Date.now().toString(), content: icebreaker, sender: 'me' }
    setMessages([...messages, msg])
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.back}>-</Text></TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Sarah, 28</Text>
          <Text style={styles.headerStatus}>Ghost mode on - Photos hidden</Text>
        </View>
        <TouchableOpacity><Text style={styles.reveal}>REVEAL</Text></TouchableOpacity>
      </View>

      <View style={styles.icebreakers}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={icebreakers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.icebreakerChip} onPress={() => handleIcebreaker(item)}>
              <Text style={styles.icebreakerText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.sender === 'me' ? styles.myMessage : styles.theirMessage]}>
            <Text style={[styles.messageText, item.sender === 'me' && styles.myMessageText]}>{item.content}</Text>
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
        <TouchableOpacity style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]} onPress={handleSend} disabled={!newMessage.trim()}>
          <Text style={styles.sendText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { fontSize: 24, color: '#1a1a1a', marginRight: 12 },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 16, fontWeight: '600' },
  headerStatus: { fontFamily: 'Space Mono', fontSize: 10, color: '#999' },
  reveal: { fontFamily: 'Space Mono', fontSize: 10, fontWeight: 'bold', color: '#1a1a1a' },
  icebreakers: { backgroundColor: '#fff', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  icebreakerChip: { backgroundColor: '#f0f0f0', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16, marginHorizontal: 6 },
  icebreakerText: { fontFamily: 'Space Mono', fontSize: 10, color: '#333' },
  messageList: { padding: 20 },
  message: { maxWidth: '80%', padding: 14, borderRadius: 16, marginBottom: 12 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#1a1a1a' },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  messageText: { fontSize: 15, lineHeight: 22, color: '#1a1a1a' },
  myMessageText: { color: '#fff' },
  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, backgroundColor: '#f8f8f8', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, maxHeight: 100 },
  sendButton: { backgroundColor: '#1a1a1a', borderRadius: 20, paddingHorizontal: 16, justifyContent: 'center', marginLeft: 8 },
  sendButtonDisabled: { opacity: 0.4 },
  sendText: { fontFamily: 'Space Mono', fontSize: 10, fontWeight: 'bold', color: '#fff' },
})
