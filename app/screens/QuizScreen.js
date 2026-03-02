import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const quizQuestions = [
  {
    id: 1,
    question: "How do you prefer to communicate?",
    options: ["Written messages", "Voice notes", "Video calls", "In person"]
  },
  {
    id: 2,
    question: "What's your ideal first date?",
    options: ["Coffee shop chat", "Long walk", "Activity together", "Virtual movie"]
  },
  {
    id: 3,
    question: "How do you feel about photos?",
    options: ["I'd rather not share", "I'll share eventually", "No problem sharing", "Only if they do first"]
  },
  {
    id: 4,
    question: "How many conversations at once?",
    options: ["One at a time", "A few is fine", "Keep it open"]
  },
  {
    id: 5,
    question: "What matters most in a match?",
    options: ["Their words/story", "Their interests", "Their values", "The conversation flow"]
  },
]

export default function QuizScreen({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [currentQuestion]: option }
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.questionNumber}>
          {currentQuestion + 1} / {quizQuestions.length}
        </Text>
        
        <Text style={styles.question}>
          {quizQuestions[currentQuestion].question}
        </Text>

        <View style={styles.options}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
  },
  progressContainer: {
    height: 3,
    backgroundColor: '#eee',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 30,
    paddingTop: 50,
  },
  questionNumber: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#999',
    letterSpacing: 2,
    marginBottom: 8,
  },
  question: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 26,
    fontStyle: 'italic',
    marginBottom: 40,
    color: '#1a1a1a',
    lineHeight: 36,
  },
  options: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 18,
    textAlign: 'center',
    color: '#1a1a1a',
  },
})
