import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'

export default function MatchScreen({ matchData, onSendMessage, onKeepSwiping }) {
  const [message, setMessage] = useState('')

  const sharedInterests = matchData?.sharedInterests || ['books', 'coffee']
  const compatibilityScore = matchData?.compatibility || 85

  const handleSend = () => {
    const msg = message.trim() || getDefaultMessage()
    onSendMessage(msg)
  }

  const getDefaultMessage = () => {
    const messages = [
      `Hey ${matchData?.name}, loved your story!`,
      `Hi ${matchData?.name}! Your answers are so interesting.`,
      `Hey ${matchData?.name}, we seem to have a lot in common!`,
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.itsAMatch}>It's a Match</Text>
        <Text style={styles.subtitle}>You and {matchData?.name} liked each other</Text>
      </View>

      <View style={styles.compatibilitySection}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{compatibilityScore}%</Text>
        </View>
        <Text style={styles.scoreLabel}>Compatibility</Text>
      </View>

      {sharedInterests.length > 0 && (
        <View style={styles.interestsSection}>
          <Text style={styles.interestsLabel}>SHARED INTERESTS</Text>
          <View style={styles.interestTags}>
            {sharedInterests.map((interest, i) => (
              <View key={i} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.messageSection}>
        <Text style={styles.messageLabel}>SEND A MESSAGE</Text>
        <View style={styles.messageBox}>
          <Text style={styles.messageInput} onPress={() => setMessage(getDefaultMessage())}>
            {message || getDefaultMessage()}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>SEND</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={onKeepSwiping}>
          <Text style={styles.skipButtonText}>Keep Swiping</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  itsAMatch: {
    fontFamily: 'Space Mono',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 8,
  },
  compatibilitySection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontFamily: 'Space Mono',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreLabel: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#999',
    marginTop: 8,
    letterSpacing: 1,
  },
  interestsSection: {
    marginBottom: 30,
  },
  interestsLabel: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#999',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  interestText: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    color: '#fff',
  },
  messageSection: {
    marginBottom: 30,
  },
  messageLabel: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#999',
    letterSpacing: 1,
    marginBottom: 12,
  },
  messageBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageInput: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
  },
  actions: {
    gap: 12,
  },
  sendButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  sendButtonText: {
    fontFamily: 'Space Mono',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  skipButton: {
    padding: 16,
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'Space Mono',
    fontSize: 11,
    color: '#999',
  },
})
