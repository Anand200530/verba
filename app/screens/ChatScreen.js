import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Animated } from 'react-native'

const icebreakers = [
  { id: 1, text: "What's your favorite book?", category: "Books" },
  { id: 2, text: "Coffee or tea?", category: "Lifestyle" },
  { id: 3, text: "Ideal weekend?", category: "Lifestyle" },
  { id: 4, text: "Last thing that made you laugh?", category: "Fun" },
  { id: 5, text: "Dream travel destination?", category: "Travel" },
  { id: 6, text: "Favorite movie?", category: "Movies" },
  { id: 7, text: "What's something you're passionate about?", category: "Deep" },
  { id: 8, text: "Best advice you've ever received?", category: "Deep" },
]

const autoReplies = [
  "That's really interesting! Tell me more.",
  "I love that perspective. What made you think of that?",
  "That's so relatable! I feel the same way.",
  "I'd love to hear more about that.",
  "That's a wonderful way to look at it.",
  "Thanks for sharing that with me!",
]

export default function ChatScreen({ userData, chatData, onBack }) {
  const [messages, setMessages] = useState([
    { id: '1', content: "Hey! I loved your story about the mountains. Very evocative.", sender: 'them', read: true },
    { id: '2', content: "Thanks! Your writing has a really gentle quality to it.", sender: 'me', read: true },
    { id: '3', content: "I've always been drawn to places with meaning. You?", sender: 'them', read: true },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [chatStreak, setChatStreak] = useState(5)
  const [selectedTimer, setSelectedTimer] = useState(null)
  const recordingAnim = useRef(new Animated.Value(1)).current
  const recordingTimer = useRef(null)

  const chatName = chatData?.name || 'Chat'
  const chatAge = chatData?.age || ''

  const showTypingIndicator = () => {
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), 2000)
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingDuration(0)
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(recordingAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
        Animated.timing(recordingAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start()

    recordingTimer.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    recordingAnim.stopAnimation()
    recordingAnim.setValue(1)
    clearInterval(recordingTimer.current)
    
    if (recordingDuration > 0) {
      const msg = { id: Date.now().toString(), content: `Voice message (${recordingDuration}s)`, sender: 'me', read: false, isVoice: true, timer: selectedTimer }
      setMessages(prev => [...prev, msg])
      
      showTypingIndicator()
      setTimeout(() => {
        const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)]
        const replyMsg = { id: (Date.now() + 1).toString(), content: reply, sender: 'them', read: false }
        setMessages(prev => [...prev, replyMsg])
      }, 2000)
    }
  }

  const handleSend = () => {
    if (!newMessage.trim()) return
    
    const msg = { id: Date.now().toString(), content: newMessage, sender: 'me', read: false, timer: selectedTimer }
    setMessages(prev => [...prev, msg])
    setNewMessage('')
    setChatStreak(prev => prev + 1)
    
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m))
    }, 3000)
    
    showTypingIndicator()
    setTimeout(() => {
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)]
      const replyMsg = { id: (Date.now() + 1).toString(), content: reply, sender: 'them', read: false }
      setMessages(prev => [...prev, replyMsg])
    }, 2500)
  }

  const handleIcebreaker = (icebreaker) => {
    const msg = { id: Date.now().toString(), content: icebreaker.text, sender: 'me', read: false }
    setMessages(prev => [...prev, msg])
    
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m))
    }, 2000)
    
    showTypingIndicator()
    setTimeout(() => {
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)]
      const replyMsg = { id: (Date.now() + 1).toString(), content: reply, sender: 'them', read: false }
      setMessages(prev => [...prev, replyMsg])
    }, 2500)
  }

  const renderMessage = ({ item }) => (
    <View style={[styles.message, item.sender === 'me' ? styles.myMessage : styles.theirMessage]}>
      <Text style={[styles.messageText, item.sender === 'me' && styles.myMessageText]}>
        {item.isVoice ? '🎤 ' + item.content : item.content}
      </Text>
      {item.sender === 'me' && (
        <View style={styles.messageFooter}>
          {item.timer && <Text style={styles.timerText}>{item.timer}</Text>}
          <Text style={styles.readText}>{item.read ? 'Read' : 'Sent'}</Text>
        </View>
      )}
    </View>
  )

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.back}>-</Text></TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{chatName}{chatAge ? ', ' + chatAge : ''}</Text>
          <View style={styles.headerStatusRow}>
            {isTyping ? (
              <Text style={styles.typingText}>typing...</Text>
            ) : (
              <Text style={styles.headerStatus}>Online now</Text>
            )}
          </View>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>{chatStreak}🔥</Text>
        </View>
      </View>

      <View style={styles.icebreakers}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={icebreakers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.icebreakerChip} onPress={() => handleIcebreaker(item)}>
              <Text style={styles.icebreakerText}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />

      {isTyping && (
        <View style={styles.typingIndicator}>
          <View style={styles.typingDots}>
            <Animated.View style={[styles.typingDot, { opacity: 0.3 }]} />
            <Animated.View style={[styles.typingDot, { opacity: 0.5 }]} />
            <Animated.View style={[styles.typingDot, { opacity: 0.7 }]} />
          </View>
          <Text style={styles.typingLabel}>{chatName} is typing</Text>
        </View>
      )}

      {isRecording && (
        <View style={styles.recordingBar}>
          <Animated.View style={[styles.recordingDot, { transform: [{ scale: recordingAnim }] }]} />
          <Text style={styles.recordingText}>Recording... {recordingDuration}s</Text>
          <TouchableOpacity onPress={stopRecording}>
            <Text style={styles.stopRecording}>Stop</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.timerBar}>
        <Text style={styles.timerLabel}>Reply timer:</Text>
        <TouchableOpacity style={[styles.timerOption, selectedTimer === null && styles.timerOptionActive]} onPress={() => setSelectedTimer(null)}>
          <Text style={[styles.timerOptionText, selectedTimer === null && styles.timerOptionTextActive]}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.timerOption, selectedTimer === 1 && styles.timerOptionActive]} onPress={() => setSelectedTimer(1)}>
          <Text style={[styles.timerOptionText, selectedTimer === 1 && styles.timerOptionTextActive]}>1h</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.timerOption, selectedTimer === 24 && styles.timerOptionActive]} onPress={() => setSelectedTimer(24)}>
          <Text style={[styles.timerOptionText, selectedTimer === 24 && styles.timerOptionTextActive]}>24h</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.voiceButton} onPressIn={startRecording} onPressOut={stopRecording}>
          <Text style={styles.voiceIcon}>🎤</Text>
        </TouchableOpacity>
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
  headerStatusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  headerStatus: { fontFamily: 'Space Mono', fontSize: 10, color: '#4caf50' },
  typingText: { fontFamily: 'Space Mono', fontSize: 10, color: '#ff9800' },
  streakBadge: { backgroundColor: '#fff3e0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  streakText: { fontFamily: 'Space Mono', fontSize: 11, color: '#ff9800', fontWeight: 'bold' },
  icebreakers: { backgroundColor: '#fff', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  icebreakerChip: { backgroundColor: '#f0f0f0', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16, marginHorizontal: 6 },
  icebreakerText: { fontFamily: 'Space Mono', fontSize: 10, color: '#333', maxWidth: 180 },
  messageList: { padding: 20 },
  message: { maxWidth: '80%', padding: 14, borderRadius: 16, marginBottom: 12 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#1a1a1a' },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  messageText: { fontSize: 15, lineHeight: 22, color: '#1a1a1a' },
  myMessageText: { color: '#fff' },
  messageFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 4, gap: 8 },
  timerText: { fontSize: 8, color: '#888', fontFamily: 'Space Mono' },
  readText: { fontSize: 9, color: '#888', fontFamily: 'Space Mono' },
  typingIndicator: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  typingDots: { flexDirection: 'row', gap: 4, marginRight: 8 },
  typingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ff9800' },
  typingLabel: { fontFamily: 'Space Mono', fontSize: 10, color: '#ff9800' },
  recordingBar: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  recordingDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ff4444', marginRight: 8 },
  recordingText: { flex: 1, fontFamily: 'Space Mono', fontSize: 12, color: '#ff4444' },
  stopRecording: { fontFamily: 'Space Mono', fontSize: 12, color: '#1a1a1a', fontWeight: 'bold' },
  timerBar: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f8f8f8', gap: 8 },
  timerLabel: { fontFamily: 'Space Mono', fontSize: 10, color: '#666' },
  timerOption: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: '#fff' },
  timerOptionActive: { backgroundColor: '#1a1a1a' },
  timerOptionText: { fontFamily: 'Space Mono', fontSize: 10, color: '#666' },
  timerOptionTextActive: { color: '#fff' },
  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'flex-end' },
  voiceButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  voiceIcon: { fontSize: 18 },
  input: { flex: 1, backgroundColor: '#f8f8f8', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, maxHeight: 100 },
  sendButton: { backgroundColor: '#1a1a1a', borderRadius: 20, paddingHorizontal: 16, justifyContent: 'center', marginLeft: 8, height: 40 },
  sendButtonDisabled: { opacity: 0.4 },
  sendText: { fontFamily: 'Space Mono', fontSize: 10, fontWeight: 'bold', color: '#fff' },
})
