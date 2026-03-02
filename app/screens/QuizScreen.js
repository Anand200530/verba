import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native'

const { width } = Dimensions.get('window')

const quizQuestions = [
  { id: 1, question: "What's your ideal first date?", options: ["Coffee shop chat", "Long walk", "Activity together", "Virtual movie"] },
  { id: 2, question: "How many conversations at once?", options: ["One at a time", "A few is fine", "Keep it open"] },
  { id: 3, question: "What matters most in a match?", options: ["Their words/story", "Their interests", "Their values", "The conversation flow"] },
]

export default function QuizScreen({ userData, onComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const scrollX = new Animated.Value(0)

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [currentQuestion]: option }
    setAnswers(newAnswers)
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const handleSkip = () => {
    onComplete({ skipped: true })
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (onBack) {
      onBack()
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}><Text style={styles.backText}>-</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>QUIZ</Text>
        <TouchableOpacity onPress={handleSkip}><Text style={styles.skipText}>SKIP</Text></TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      
      <Animated.ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEventThrottle={16} onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } }], { useNativeDriver: true })} style={styles.questionScroll}>
        {quizQuestions.map((q, index) => (
          <View key={q.id} style={styles.questionSlide}>
            <Text style={styles.questionNumber}>{index + 1} / {quizQuestions.length}</Text>
            <Text style={styles.question}>{q.question}</Text>
            <View style={styles.options}>
              {q.options.map((option, optIndex) => (
                <TouchableOpacity key={optIndex} style={styles.optionButton} onPress={() => handleAnswer(option)}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.dotsContainer}>
        {quizQuestions.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
          const scale = scrollX.interpolate({ inputRange, outputRange: [0.8, 1.2, 0.8], extrapolate: 'clamp' })
          return <Animated.View key={index} style={[styles.dot, { transform: [{ scale }] }]} />
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backText: { fontSize: 24, color: '#1a1a1a' },
  headerTitle: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold', color: '#1a1a1a' },
  skipText: { fontFamily: 'Space Mono', fontSize: 11, color: '#999', letterSpacing: 1 },
  progressContainer: { height: 3, backgroundColor: '#eee', marginHorizontal: 20, borderRadius: 2 },
  progressBar: { height: '100%', backgroundColor: '#1a1a1a', borderRadius: 2 },
  questionScroll: { flex: 1 },
  questionSlide: { width, paddingHorizontal: 30, paddingTop: 30 },
  questionNumber: { fontFamily: 'Space Mono', fontSize: 11, color: '#999', letterSpacing: 2, marginBottom: 8 },
  question: { fontFamily: 'Cormorant Garamond', fontSize: 26, fontStyle: 'italic', marginBottom: 30, color: '#1a1a1a', lineHeight: 36 },
  options: { gap: 12 },
  optionButton: { backgroundColor: '#fff', borderRadius: 12, padding: 20, borderWidth: 1, borderColor: '#eee' },
  optionText: { fontFamily: 'Cormorant Garamond', fontSize: 18, textAlign: 'center', color: '#1a1a1a' },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1a1a1a', marginHorizontal: 3 },
})
