// VERBA - Match Screen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MatchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>♥</Text>
      <Text style={styles.title}>It's a Match!</Text>
      <Text style={styles.subtitle}>You and Alex liked each other</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.replace('Chat')}
      >
        <Text style={styles.buttonText}>SEND A MESSAGE</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.replace('Discover')}
      >
        <Text style={styles.secondaryText}>KEEP SWIPING</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  secondaryButton: {
    paddingVertical: 18,
    paddingHorizontal: 48,
  },
  secondaryText: {
    color: '#999',
    fontSize: 14,
  },
});
