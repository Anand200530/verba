import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'

export default function MatchScreen({ matchData, onSendMessage, onKeepSwiping }) {
  const [scaleAnim] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start()
  }, [])

  const commonInterests = matchData?.sharedInterests || []
  const compatibility = matchData?.compatibility || 85

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.matchBadge, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.matchText}>IT'S A MATCH</Text>
        </Animated.View>

        <Text style={styles.title}>You and {matchData?.name || 'someone'}</Text>
        <Text style={styles.subtitle}>both want to get to know each other</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{compatibility}%</Text>
            <Text style={styles.statLabel}>COMPATIBILITY</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{commonInterests.length}</Text>
            <Text style={styles.statLabel}>SHARED INTERESTS</Text>
          </View>
        </View>

        {commonInterests.length > 0 && (
          <View style={styles.interests}>
            <Text style={styles.interestsLabel}>You both like</Text>
            <View style={styles.interestTags}>
              {commonInterests.map((interest, i) => (
                <View key={i} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.quickReplies}>
          <Text style={styles.quickLabel}>Send a quick message</Text>
          {[
            "Hey! Nice to match with you",
            "Hi! Your profile sounds interesting",
            "Hey there! Let's chat"
          ].map((msg, i) => (
            <TouchableOpacity key={i} style={styles.quickButton} onPress={onSendMessage}>
              <Text style={styles.quickText}>{msg}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.keepSwiping} onPress={onKeepSwiping}>
          <Text style={styles.keepSwipingText}>Keep Swiping</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendMessage} onPress={onSendMessage}>
          <Text style={styles.sendMessageText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  content: { flex: 1, padding: 24, paddingTop: 60, alignItems: 'center' },
  matchBadge: { backgroundColor: '#1a1a1a', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 30, marginBottom: 24 },
  matchText: { fontFamily: 'Space Mono', fontSize: 14, fontWeight: 'bold', color: '#fff', letterSpacing: 2 },
  title: { fontFamily: 'Cormorant Garamond', fontSize: 32, fontStyle: 'italic', color: '#1a1a1a', marginBottom: 8 },
  subtitle: { fontFamily: 'Space Mono', fontSize: 12, color: '#666', marginBottom: 30 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  stat: { alignItems: 'center', paddingHorizontal: 30 },
  statValue: { fontFamily: 'Space Mono', fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' },
  statLabel: { fontFamily: 'Space Mono', fontSize: 9, color: '#999', marginTop: 4, letterSpacing: 1 },
  divider: { width: 1, height: 40, backgroundColor: '#ddd' },
  interests: { alignItems: 'center', marginBottom: 30 },
  interestsLabel: { fontFamily: 'Space Mono', fontSize: 10, color: '#999', marginBottom: 12 },
  interestTags: { flexDirection: 'row', gap: 8 },
  interestTag: { backgroundColor: '#1a1a1a', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  interestText: { fontFamily: 'Space Mono', fontSize: 11, color: '#fff' },
  quickReplies: { width: '100%' },
  quickLabel: { fontFamily: 'Space Mono', fontSize: 10, color: '#999', marginBottom: 12, textAlign: 'center' },
  quickButton: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  quickText: { fontFamily: 'Cormorant Garamond', fontSize: 15, fontStyle: 'italic', color: '#333', textAlign: 'center' },
  actions: { padding: 24, paddingBottom: 40, gap: 12 },
  keepSwiping: { backgroundColor: '#fff', borderRadius: 12, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  keepSwipingText: { fontFamily: 'Space Mono', fontSize: 12, color: '#666', letterSpacing: 1 },
  sendMessage: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 18, alignItems: 'center' },
  sendMessageText: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
})
