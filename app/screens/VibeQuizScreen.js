import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const vibeQuestions = [
  {
    id: 1,
    question: "Night in or night out?",
    options: [
      { text: "Night in", value: "introvert" },
      { text: "Night out", value: "extrovert" },
      { text: "Depends on mood", value: "balanced" },
    ]
  },
  {
    id: 2,
    question: "Your ideal conversation style?",
    options: [
      { text: "Deep & meaningful", value: "deep" },
      { text: "Fun & playful", value: "fun" },
      { text: "Mixed", value: "balanced" },
    ]
  },
  {
    id: 3,
    question: "Date vibe?",
    options: [
      { text: "Planned & thoughtful", value: "planned" },
      { text: "Spontaneous", value: "spontaneous" },
      { text: "Whatever feels right", value: "balanced" },
    ]
  },
]

export default function VibeQuizScreen({ onComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [currentQuestion]: option.value }
    setAnswers(newAnswers)
    
    if (currentQuestion < vibeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const currentQ = vibeQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / vibeQuestions.length) * 100

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.back}>-</Text></TouchableOpacity>
        <Text style={styles.title}>VIBE CHECK</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.questionNumber}>Question {currentQuestion + 1} of {vibeQuestions.length}</Text>
        
        <Text style={styles.question}>{currentQ.question}</Text>

        <View style={styles.options}>
          {currentQ.options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.skipButton} onPress={onBack}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { fontSize: 24, color: '#1a1a1a' },
  title: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold', color: '#1a1a1a' },
  placeholder: { width: 24 },
  progressContainer: { height: 4, backgroundColor: '#eee' },
  progressBar: { height: '100%', backgroundColor: '#1a1a1a' },
  content: { padding: 30 },
  questionNumber: { fontFamily: 'Space Mono', fontSize: 11, color: '#999', letterSpacing: 1, marginBottom: 16 },
  question: { fontFamily: 'Cormorant Garamond', fontSize: 28, fontStyle: 'italic', color: '#1a1a1a', marginBottom: 40, lineHeight: 38 },
  options: { gap: 16 },
  optionButton: { backgroundColor: '#fff', borderRadius: 16, padding: 24, borderWidth: 2, borderColor: '#eee' },
  optionText: { fontFamily: 'Space Mono', fontSize: 14, textAlign: 'center', color: '#1a1a1a' },
  skipButton: { marginTop: 30, alignItems: 'center' },
  skipText: { fontFamily: 'Space Mono', fontSize: 12, color: '#999' },
})
