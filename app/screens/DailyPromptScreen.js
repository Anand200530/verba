import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native'

const dailyPrompts = [
  { id: 1, question: "What's a small thing that made you smile today?", date: "Today" },
  { id: 2, question: "If you could live anywhere for a year, where would it be?", date: "Yesterday" },
  { id: 3, question: "What's a skill you'd love to learn?", date: "Yesterday" },
  { id: 4, question: "What's your comfort food?", date: "Earlier" },
  { id: 5, question: "What's something you've been meaning to try?", date: "Earlier" },
]

const demoResponses = [
  { id: '1', author: 'Sarah', response: "The barista drew a little heart on my coffee cup this morning. Such a small thing but it brightened my whole day.", time: '2h ago', likes: 8 },
  { id: '2', author: 'James', response: "I'd love to spend a year in Kyoto. The mix of old and new, the seasons there seem incredible.", time: '4h ago', likes: 12 },
  { id: '3', author: 'Elena', response: "Pottery! There's something about working with clay that seems so meditative.", time: '6h ago', likes: 5 },
]

export default function DailyPromptScreen({ onBack, onClose }) {
  const [myResponse, setMyResponse] = useState('')
  const [responses, setResponses] = useState(demoResponses)
  const [hasResponded, setHasResponded] = useState(false)

  const currentPrompt = dailyPrompts[0]

  const handleSubmit = () => {
    if (!myResponse.trim()) return
    const newResponse = {
      id: Date.now().toString(),
      author: 'You',
      response: myResponse,
      time: 'Just now',
      likes: 0,
    }
    setResponses([newResponse, ...responses])
    setHasResponded(true)
  }

  const renderResponse = ({ item }) => (
    <View style={styles.responseCard}>
      <View style={styles.responseHeader}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{item.author[0]}</Text></View>
        <View>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.responseTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.responseText}>{item.response}</Text>
      <View style={styles.responseActions}>
        <TouchableOpacity style={styles.likeButton}>
          <Text style={styles.likeIcon}>♥</Text>
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.back}>-</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>DAILY PROMPT</Text>
        <TouchableOpacity onPress={onClose}><Text style={styles.close}>x</Text></TouchableOpacity>
      </View>

      <View style={styles.promptCard}>
        <Text style={styles.promptDate}>{currentPrompt.date}</Text>
        <Text style={styles.promptQuestion}>{currentPrompt.question}</Text>
      </View>

      {!hasResponded ? (
        <View style={styles.composer}>
          <TextInput
            style={styles.composerInput}
            placeholder="Share your thoughts..."
            placeholderTextColor="#999"
            value={myResponse}
            onChangeText={setMyResponse}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity style={[styles.submitButton, !myResponse.trim() && styles.submitDisabled]} onPress={handleSubmit} disabled={!myResponse.trim()}>
            <Text style={styles.submitText}>SHARE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.responded}>
          <Text style={styles.respondedText}>Thanks for sharing! Check back tomorrow for a new prompt.</Text>
        </View>
      )}

      <Text style={styles.responsesTitle}>RESPONSES</Text>

      <FlatList
        data={responses}
        keyExtractor={(item) => item.id}
        renderItem={renderResponse}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { fontSize: 24, color: '#1a1a1a' },
  headerTitle: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold' },
  close: { fontSize: 20, color: '#999' },
  promptCard: { backgroundColor: '#fff', padding: 24, margin: 16, borderRadius: 16 },
  promptDate: { fontFamily: 'Space Mono', fontSize: 10, color: '#999', marginBottom: 8 },
  promptQuestion: { fontFamily: 'Cormorant Garamond', fontSize: 22, fontStyle: 'italic', color: '#1a1a1a', lineHeight: 32 },
  composer: { padding: 16, backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16 },
  composerInput: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 14, fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', minHeight: 80, textAlignVertical: 'top' },
  submitButton: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  submitDisabled: { opacity: 0.4 },
  submitText: { fontFamily: 'Space Mono', fontSize: 11, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
  responded: { padding: 16, backgroundColor: '#e8f5e9', marginHorizontal: 16, borderRadius: 12 },
  respondedText: { fontFamily: 'Space Mono', fontSize: 11, color: '#2e7d32', textAlign: 'center' },
  responsesTitle: { fontFamily: 'Space Mono', fontSize: 10, letterSpacing: 1, color: '#999', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  responseCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12 },
  responseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatarText: { fontFamily: 'Space Mono', fontSize: 14, fontWeight: 'bold', color: '#fff' },
  authorName: { fontSize: 14, fontWeight: '600' },
  responseTime: { fontFamily: 'Space Mono', fontSize: 9, color: '#999' },
  responseText: { fontFamily: 'Cormorant Garamond', fontSize: 15, fontStyle: 'italic', lineHeight: 24, color: '#333' },
  responseActions: { marginTop: 12 },
  likeButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  likeIcon: { fontSize: 14 },
  likeCount: { fontFamily: 'Space Mono', fontSize: 11, color: '#666' },
})
