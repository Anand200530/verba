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

export default function ProfileScreen({ userData, onComplete }) {
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
    if (currentPromptIndex < writingPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1)
    }
  }

  const handleSkipPrompt = () => {
    if (currentPromptIndex < writingPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1)
    }
  }

  const handleFinish = () => {
    const writingStyle = analyzeWritingStyle(bio)
    const profileData = {
      bio: bio,
      interests: selectedInterests,
      writingStyle,
      promptAnswers,
    }
    onComplete(profileData)
  }

  // Prompts Screen
  if (screen === 'prompts') {
    const currentPrompt = writingPrompts[currentPromptIndex]
    const currentAnswer = promptAnswers[currentPromptIndex] || ''

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>One more step</Text>
          <Text style={styles.title}>Answer prompts</Text>
          <Text style={styles.subtitle}>These help your matches know you better</Text>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.promptNumber}>{currentPromptIndex + 1} / {writingPrompts.length}</Text>
          <Text style={styles.promptText}>{currentPrompt.prompt}</Text>
          <TextInput style={styles.promptInput} placeholder="Write your answer..." placeholderTextColor="#bbb" value={currentAnswer} onChangeText={(text) => handlePromptAnswer(text)} multiline numberOfLines={4} textAlignVertical="top" />
        </View>

        <View style={styles.promptActions}>
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkipPrompt}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextPromptBtn} onPress={currentAnswer.trim() ? handleFinish : handleSkipPrompt}>
            <Text style={styles.nextPromptBtnText}>{currentPromptIndex === writingPrompts.length - 1 ? (currentAnswer.trim() ? 'Finish' : 'Skip All') : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

  // Interests Screen
  if (screen === 'interests') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Select your interests</Text>
          <Text style={styles.title}>What do you like?</Text>
          <Text style={styles.subtitle}>Choose up to 5</Text>
        </View>

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
    )
  }

  // Bio Screen
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey {userData?.name}</Text>
        <Text style={styles.title}>Tell us your story</Text>
        <Text style={styles.subtitle}>What makes you unique?</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>YOUR STORY</Text>
          <TextInput style={[styles.input, styles.bioInput]} placeholder="Write something about yourself..." placeholderTextColor="#bbb" value={bio} onChangeText={setBio} multiline numberOfLines={6} textAlignVertical="top" />
        </View>

        <TouchableOpacity style={[styles.button, !bio.trim() && styles.buttonDisabled]} onPress={handleBioComplete} disabled={!bio.trim()}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  content: { padding: 30, paddingTop: 50 },
  header: { marginBottom: 30 },
  greeting: { fontFamily: 'Space Mono', fontSize: 14, color: '#999', marginBottom: 8 },
  title: { fontFamily: 'Cormorant Garamond', fontSize: 32, fontStyle: 'italic', color: '#1a1a1a' },
  subtitle: { fontFamily: 'Space Mono', fontSize: 14, color: '#666', marginTop: 4 },
  form: { gap: 20 },
  inputGroup: { marginBottom: 8 },
  inputLabel: { fontFamily: 'Space Mono', fontSize: 11, letterSpacing: 1, color: '#999', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 16, fontFamily: 'Space Mono', fontSize: 16, color: '#1a1a1a', borderWidth: 1, borderColor: '#eee' },
  bioInput: { height: 150, textAlignVertical: 'top', fontFamily: 'Cormorant Garamond', fontSize: 18, fontStyle: 'italic', lineHeight: 28 },
  button: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 20 },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { fontFamily: 'Space Mono', fontSize: 12, letterSpacing: 3, color: '#fff', fontWeight: 'bold' },
  interestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  interestChip: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 20, borderWidth: 2, borderColor: '#eee' },
  interestChipSelected: { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  interestText: { fontFamily: 'Space Mono', fontSize: 13, color: '#333' },
  interestTextSelected: { color: '#fff' },
  promptCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, marginBottom: 20 },
  promptNumber: { fontFamily: 'Space Mono', fontSize: 12, color: '#999', letterSpacing: 2, marginBottom: 12 },
  promptText: { fontFamily: 'Cormorant Garamond', fontSize: 22, fontStyle: 'italic', color: '#1a1a1a', marginBottom: 16, lineHeight: 30 },
  promptInput: { backgroundColor: '#faf9f7', borderRadius: 10, padding: 16, fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', color: '#1a1a1a', height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#eee' },
  promptActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  skipBtn: { padding: 10 },
  skipBtnText: { fontFamily: 'Space Mono', fontSize: 12, color: '#999' },
  nextPromptBtn: { backgroundColor: '#1a1a1a', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  nextPromptBtnText: { fontFamily: 'Space Mono', fontSize: 11, letterSpacing: 2, color: '#fff', fontWeight: 'bold' },
})
