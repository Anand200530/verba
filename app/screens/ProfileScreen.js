// VERBA - Profile Screen
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [story, setStory] = useState('');

  const handleSubmit = () => {
    if (!name || !age || !story) {
      Alert.alert('Please fill all fields');
      return;
    }
    navigation.replace('Discover');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create Profile</Text>
      
      <View style={styles.field}>
        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Your Story</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write something about yourself..."
          value={story}
          onChangeText={setStory}
          multiline
          numberOfLines={6}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 30,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
