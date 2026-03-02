import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const quizQuestions = [
  {
    id: 1,
    question: "How do you prefer to communicate?",
    options: [
      { text: "Written messages", value: "written" },
      { text: "Voice notes", value: "voice" },
      { text: "Video calls", value: "video" },
      { text: "In person", value: "person" },
    ]
  },
  {
    id: 2,
    question: "What's your ideal first date?",
    options: [
      { text: "Coffee shop chat", value: "coffee" },
      { text: "Long walk", value: "walk" },
      { text: "Activity together", value: "activity" },
      { text: "Virtual movie", value: "virtual" },
    ]
  },
  {
    id: 3,
    question: "How do you feel about photos?",
    options: [
      { text: "I'd rather not share", value: "private" },
      { text: "I'll share eventually", value: "gradual" },
      { text: "No problem sharing", value: "open" },
      { text: "Only if they do first", value: "mutual" },
    ]
  },
  {
    id: 4,
    question: "How many conversations at once?",
    options: [
      { text: "One at a time - quality over quantity", value: "one" },
      { text: "A few is fine", value: "few" },
      { text: "Keep it open", value: "open" },
    ]
  },
  {
    id: 5,
    question: "What matters most in a match?",
    options: [
      { text: "Their words/story", value: "words" },
      { text: "Their interests", value: "interests" },
      { text: "Their values", value: "values" },
      { text: "The conversation flow", value: "flow" },
    ]
  },
]

export default function QuizScreen({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value }
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz complete
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
          Question {currentQuestion + 1} of {quizQuestions.length}
        </Text>
        
        <Text style={styles.question}>
          {quizQuestions[currentQuestion].question}
        </Text>

        <View style={styles.options}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option.value)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
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
    backgroundColor: '#fff',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#eee',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6B4EFF',
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  questionNumber: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
  },
  options: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
})
