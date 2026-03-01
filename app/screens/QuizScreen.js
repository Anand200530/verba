// VERBA - Quiz Screen (Personality Questions)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const questions = [
  {
    id: 1,
    question: "How do you prefer to communicate?",
    options: ["Long conversations", "Short messages", "Voice calls", "Video calls"],
  },
  {
    id: 2,
    question: "What's your ideal first date?",
    options: ["Coffee shop", "Walk in park", "Food festival", "Movie"],
  },
  {
    id: 3,
    question: "How would friends describe you?",
    options: ["Good listener", "Funny", "Adventurous", "Thoughtful"],
  },
  {
    id: 4,
    question: "What do you value most in a partner?",
    options: ["Honesty", "Humor", "Ambition", "Kindness"],
  },
  {
    id: 5,
    question: "Your introversion level?",
    options: ["Very introverted", "Somewhat introverted", "Balanced", "Sometimes extroverted"],
  },
];

export default function QuizScreen({ navigation }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQ]: answer });
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      navigation.replace('Profile');
    }
  };

  const q = questions[currentQ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>{currentQ + 1}/{questions.length}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{q.question}</Text>

        <View style={styles.options}>
          {q.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  progress: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 24,
    color: '#111',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  options: {
    gap: 12,
  },
  option: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
});
