import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

export default function ProfileScreen({ userData, onComplete }) {
  const [bio, setBio] = useState('')
  const [interests, setInterests] = useState('')

  const handleComplete = () => {
    const profileData = {
      bio: bio,
      interests: interests.split(',').map(i => i.trim()).filter(i => i)
    }
    onComplete(profileData)
  }

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
          <Text style={styles.inputHint}>Write something about yourself...</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="I believe in slow mornings, handwritten letters, and conversations that go deep..."
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
          style={styles.button}
          onPress={handleComplete}
        >
          <Text style={styles.buttonText}>CONTINUE TO QUIZ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
  },
  content: {
    padding: 30,
    paddingTop: 50,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontFamily: 'Space Mono',
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 28,
    fontStyle: 'italic',
    color: '#1a1a1a',
  },
  subtitle: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    fontFamily: 'Space Mono',
    fontSize: 9,
    letterSpacing: 1,
    color: '#999',
    marginBottom: 8,
  },
  inputHint: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#bbb',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    fontFamily: 'Space Mono',
    fontSize: 14,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#eee',
  },
  bioInput: {
    height: 150,
    textAlignVertical: 'top',
    fontFamily: 'Cormorant Garamond',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    letterSpacing: 3,
    color: '#fff',
    fontWeight: 'bold',
  },
})
