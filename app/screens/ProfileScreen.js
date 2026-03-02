import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const writingPrompts = [
  { id: 1, prompt: "What's a small thing that makes you happy?" },
  { id: 2, prompt: "If you could have dinner with anyone, who would it be?" },
  { id: 3, prompt: "What's something you're passionate about?" },
]

const presetInterests = [
  'Reading', 'Writing', 'Music', 'Movies', 'Travel', 'Cooking',
  'Fitness', 'Art', 'Photography', 'Gaming', 'Tech', 'Nature',
  'Coffee', 'Wine', 'Pets', 'Fashion', 'Science', 'History'
]

export default function ProfileScreen({ userData, onComplete, onBack }) {
  const [screen, setScreen] = useState('bio')
  const [bio, setBio] = useState('')
  const [selectedInterests, setSelectedInterests] = useState([])
  const [promptAnswers, setPromptAnswers] = useState({})
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest))
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const analyzeWritingStyle = (text) => {
    const words = text.trim().split(/\s+/).length
    if (words < 20) return 'casual'
    if (words < 50) return 'friendly'
    return 'thoughtful'
  }

  const handleBioComplete = () => {
    if (!bio.trim()) return
    setScreen('interests')
  }

  const handleInterestComplete = () => {
    setScreen('prompts')
  }

  const handlePromptAnswer = (answer) => {
    const newAnswers = { ...promptAnswers, [currentPromptIndex]: answer }
    setPromptAnswers(newAnswers)
  }

  const handleNextPrompt = () => {
    if (currentPromptIndex < writingPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1)
    }
  }

  const handleSkipAll = () => {
    // Skip all prompts - go directly to finish
    const writingStyle = analyzeWritingStyle(bio)
    const profileData = { bio, interests: selectedInterests, writingStyle, promptAnswers: {} }
    onComplete(profileData)
  }

  const handleFinish = () => {
    const writingStyle = analyzeWritingStyle(bio)
    const profileData = { bio, interests: selectedInterests, writingStyle, promptAnswers }
    onComplete(profileData)
  }

  const goBack = () => {
    if (screen === 'interests') setScreen('bio')
    else if (screen === 'prompts') setScreen('interests')
    else if (onBack) onBack()
  }

  // Prompts Screen
  if (screen === 'prompts') {
    const currentPrompt = writingPrompts[currentPromptIndex]
    const currentAnswer = promptAnswers[currentPromptIndex] || ''
    const isLastPrompt = currentPromptIndex === writingPrompts.length - 1

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleInterestComplete}><Text style={styles.backText}>-</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>PROMPTS</Text>
          <View style={styles.headerRight} />
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.promptCard}>
            <Text style={styles.promptNumber}>{currentPromptIndex + 1} / {writingPrompts.length}</Text>
            <Text style={styles.promptText}>{currentPrompt.prompt}</Text>
            <TextInput 
              style={styles.promptInput} 
              placeholder="Write your answer..." 
              placeholderTextColor="#bbb" 
              value={currentAnswer} 
              onChangeText={handlePromptAnswer} 
              multiline 
              numberOfLines={4} 
              textAlignVertical="top" 
            />
          </View>
          
          <View style={styles.promptActions}>
            <TouchableOpacity style={styles.skipBtn} onPress={handleSkipAll}>
              <Text style={styles.skipBtnText}>Skip All</Text>
            </TouchableOpacity>
            
            {isLastPrompt ? (
              <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
                <Text style={styles.finishBtnText}>Finish</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.nextPromptBtn} onPress={handleNextPrompt}>
                <Text style={styles.nextPromptBtnText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    )
  }

  // Interests Screen
  if (screen === 'interests') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}><Text style={styles.backText}>-</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>INTERESTS</Text>
          <View style={styles.headerRight} />
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.interestTitle}>Select up to 5</Text>
          <View style={styles.interestGrid}>
            {presetInterests.map((interest) => (
              <TouchableOpacity key={interest} style={[styles.interestChip, selectedInterests.includes(interest) && styles.interestChipSelected]} onPress={() => toggleInterest(interest)}>
                <Text style={[styles.interestText, selectedInterests.includes(interest) && styles.interestTextSelected]}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleInterestComplete}>
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  // Bio Screen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}><Text style={styles.backText}>-</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR STORY</Text>
        <View style={styles.headerRight} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>What makes you unique?</Text>
        <View style={styles.inputGroup}>
          <TextInput style={[styles.input, styles.bioInput]} placeholder="Write something about yourself..." placeholderTextColor="#bbb" value={bio} onChangeText={setBio} multiline numberOfLines={6} textAlignVertical="top" />
        </View>
        <TouchableOpacity style={[styles.button, !bio.trim() && styles.buttonDisabled]} onPress={handleBioComplete} disabled={!bio.trim()}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backText: { fontSize: 24, color: '#1a1a1a' },
  headerTitle: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold', color: '#1a1a1a' },
  headerRight: { width: 24 },
  content: { padding: 24, paddingTop: 30 },
  subtitle: { fontFamily: 'Cormorant Garamond', fontSize: 24, fontStyle: 'italic', color: '#1a1a1a', marginBottom: 24, textAlign: 'center' },
  inputGroup: { marginBottom: 20 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 16, fontFamily: 'Space Mono', fontSize: 16, color: '#1a1a1a', borderWidth: 1, borderColor: '#eee' },
  bioInput: { height: 180, textAlignVertical: 'top', fontFamily: 'Cormorant Garamond', fontSize: 18, fontStyle: 'italic', lineHeight: 28 },
  button: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 18, alignItems: 'center' },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { fontFamily: 'Space Mono', fontSize: 12, letterSpacing: 3, color: '#fff', fontWeight: 'bold' },
  interestTitle: { fontFamily: 'Space Mono', fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  interestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  interestChip: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 20, borderWidth: 2, borderColor: '#eee' },
  interestChipSelected: { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  interestText: { fontFamily: 'Space Mono', fontSize: 13, color: '#333' },
  interestTextSelected: { color: '#fff' },
  promptCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, marginBottom: 20 },
  promptNumber: { fontFamily: 'Space Mono', fontSize: 12, color: '#999', letterSpacing: 2, marginBottom: 12 },
  promptText: { fontFamily: 'Cormorant Garamond', fontSize: 22, fontStyle: 'italic', color: '#1a1a1a', marginBottom: 16, lineHeight: 30 },
  promptInput: { backgroundColor: '#faf9f7', borderRadius: 10, padding: 16, fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', color: '#1a1a1a', height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#eee' },
  promptActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skipBtn: { padding: 10 },
  skipBtnText: { fontFamily: 'Space Mono', fontSize: 12, color: '#999' },
  nextPromptBtn: { backgroundColor: '#1a1a1a', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  nextPromptBtnText: { fontFamily: 'Space Mono', fontSize: 11, letterSpacing: 2, color: '#fff', fontWeight: 'bold' },
  finishBtn: { backgroundColor: '#1a1a1a', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  finishBtnText: { fontFamily: 'Space Mono', fontSize: 11, letterSpacing: 2, color: '#fff', fontWeight: 'bold' },
})
