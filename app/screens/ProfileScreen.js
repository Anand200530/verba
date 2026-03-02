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
        {}, // quiz responses - we'll add later
        []  // interests - we'll add later
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
      <Text style={styles.title}>Create Your Profile</Text>
      <Text style={styles.subtitle}>This is your chance to shine with words</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Username *</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Display Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="What should we call you?"
          value={displayName}
          onChangeText={setDisplayName}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          maxLength={2}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Your Story *</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Write something about yourself... Your story, thoughts, what makes you, you. No photos needed."
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          placeholderTextColor="#999"
        />
        <Text style={styles.hint}>💡 This is what others will see. Make it count!</Text>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleComplete}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Complete Profile'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bioInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#6B4EFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
