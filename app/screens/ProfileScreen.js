import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const writingPrompts = [
  {
    id: 1,
    prompt: "What's a small thing that makes you happy?",
    placeholder: "Warm coffee on a rainy day..."
  },
  {
    id: 2,
    prompt: "If you could have dinner with anyone, who would it be?",
    placeholder: "A historical figure, celebrity, or someone from your life..."
  },
  {
    id: 3,
    prompt: "What's something you're passionate about?",
    placeholder: "It could be anything - a hobby, cause, or idea..."
  },
]

export default function ProfileScreen({ userData, onComplete }) {
  const [screen, setScreen] = useState('bio') // 'bio' | 'prompts'
  const [bio, setBio] = useState('')
  const [interests, setInterests] = useState('')
  const [promptAnswers, setPromptAnswers] = useState({})
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)

  // Analyze writing style based on bio length
  const analyzeWritingStyle = (text) => {
    const words = text.trim().split(/\s+/).length
    if (words < 20) return 'casual'
    if (words < 50) return 'friendly'
    return 'thoughtful'
  }

  const handleBioComplete = () => {
    if (!bio.trim()) return
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
      interests: interests.split(',').map(i => i.trim()).filter(i => i),
      writingStyle,
      promptAnswers,
    }
    onComplete(profileData)
  }

  // Writing Prompts Screen
  if (screen === 'prompts') {
    const currentPrompt = writingPrompts[currentPromptIndex]
    const currentAnswer = promptAnswers[currentPromptIndex] || ''

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Now for the fun part! 🎭</Text>
          <Text style={styles.title}>Answer a few prompts</Text>
          <Text style={styles.subtitle}>These help your matches know the real you</Text>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.promptNumber}>
            {currentPromptIndex + 1} of {writingPrompts.length}
          </Text>
          <Text style={styles.promptText}>{currentPrompt.prompt}</Text>
          
          <TextInput
            style={styles.promptInput}
            placeholder={currentPrompt.placeholder}
            placeholderTextColor="#bbb"
            value={currentAnswer}
            onChangeText={(text) => handlePromptAnswer(text)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.promptActions}>
          <TouchableOpacity 
            style={styles.skipBtn}
            onPress={handleSkipPrompt}
          >
            <Text style={styles.skipBtnText}>Skip this one</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.nextPromptBtn}
            onPress={currentAnswer.trim() ? handleFinish : handleSkipPrompt}
          >
            <Text style={styles.nextPromptBtnText}>
              {currentPromptIndex === writingPrompts.length - 1 
                ? (currentAnswer.trim() ? 'Finish' : 'Skip All') 
                : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.promptDots}>
          {writingPrompts.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.promptDot,
                i === currentPromptIndex && styles.promptDotActive,
                promptAnswers[i] && styles.promptDotAnswered
              ]} 
            />
          ))}
        </View>
      </ScrollView>
    )
  }

  // Bio Screen
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey {userData?.name}! 👋</Text>
        <Text style={styles.title}>Tell us your story</Text>
        <Text style={styles.subtitle}>What makes you unique?</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>YOUR STORY</Text>
          <Text style={styles.inputHint}>Write naturally - we'll analyze your writing style</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="I believe in slow mornings, handwritten letters, and conversations that go deep. Coffee enthusiast. Book lover..."
            placeholderTextColor="#bbb"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>INTERESTS</Text>
          <Text style={styles.inputHint}>Separate with commas</Text>
          <TextInput
            style={styles.input}
            placeholder="books, coffee, writing, walking..."
            placeholderTextColor="#bbb"
            value={interests}
            onChangeText={setInterests}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, !bio.trim() && styles.buttonDisabled]}
          onPress={handleBioComplete}
          disabled={!bio.trim()}
        >
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
  greeting: { fontFamily: 'Space Mono', fontSize: 12, color: '#999', marginBottom: 8 },
  title: { fontFamily: 'Cormorant Garamond', fontSize: 28, fontStyle: 'italic', color: '#1a1a1a' },
  subtitle: { fontFamily: 'Space Mono', fontSize: 11, color: '#999', marginTop: 4 },
  
  form: { gap: 20 },
  inputGroup: { marginBottom: 8 },
  inputLabel: { fontFamily: 'Space Mono', fontSize: 9, letterSpacing: 1, color: '#999', marginBottom: 8 },
  inputHint: { fontFamily: 'Space Mono', fontSize: 10, color: '#bbb', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 16, fontFamily: 'Space Mono', fontSize: 14, color: '#1a1a1a', borderWidth: 1, borderColor: '#eee' },
  bioInput: { height: 150, textAlignVertical: 'top', fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', lineHeight: 24 },
  button: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 20 },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { fontFamily: 'Space Mono', fontSize: 11, letterSpacing: 3, color: '#fff', fontWeight: 'bold' },

  // Prompt Styles
  promptCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, marginBottom: 20 },
  promptNumber: { fontFamily: 'Space Mono', fontSize: 10, color: '#999', letterSpacing: 2, marginBottom: 12 },
  promptText: { fontFamily: 'Cormorant Garamond', fontSize: 22, fontStyle: 'italic', color: '#1a1a1a', marginBottom: 16, lineHeight: 30 },
  promptInput: { backgroundColor: '#faf9f7', borderRadius: 10, padding: 16, fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', color: '#1a1a1a', height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#eee' },
  
  promptActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  skipBtn: { padding: 10 },
  skipBtnText: { fontFamily: 'Space Mono', fontSize: 11, color: '#999' },
  nextPromptBtn: { backgroundColor: '#1a1a1a', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  nextPromptBtnText: { fontFamily: 'Space Mono', fontSize: 10, letterSpacing: 2, color: '#fff', fontWeight: 'bold' },
  
  promptDots: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  promptDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#eee' },
  promptDotActive: { backgroundColor: '#1a1a1a' },
  promptDotAnswered: { backgroundColor: '#1a1a1a' },
})
