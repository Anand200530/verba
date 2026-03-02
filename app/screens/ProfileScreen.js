import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { createProfile } from '../lib/supabase'

export default function ProfileScreen({ user, onComplete }) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [age, setAge] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)

  const handleComplete = async () => {
    if (!username || !displayName || !age || !bio) {
      Alert.alert('Missing fields', 'Please fill in all fields')
      return
    }

    if (parseInt(age) < 18) {
      Alert.alert('Age requirement', 'You must be 18+ to use Verba')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await createProfile(
        user.id,
        username,
        displayName,
        parseInt(age),
        bio,
        {},
        []
      )

      if (error) {
        Alert.alert('Error', error.message)
      } else {
        onComplete({ username, displayName, age, bio })
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Story</Text>
      <Text style={styles.subtitle}>Let words introduce you</Text>

      <View style={styles.form}>
        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>DISPLAY NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="What should we call you?"
          value={displayName}
          onChangeText={setDisplayName}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>AGE</Text>
        <TextInput
          style={styles.input}
          placeholder="Your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          maxLength={2}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>YOUR STORY</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Write something about yourself... Your story, your thoughts, what makes you unique. No photos needed - let your words speak."
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleComplete}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'CREATING...' : 'CREATE PROFILE'}
          </Text>
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
  title: {
    fontFamily: 'Space Mono',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  form: {
    gap: 8,
  },
  label: {
    fontFamily: 'Space Mono',
    fontSize: 9,
    letterSpacing: 1,
    color: '#999',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  bioInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    letterSpacing: 3,
    color: '#fff',
  },
})
