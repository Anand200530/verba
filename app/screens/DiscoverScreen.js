import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const demoProfiles = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    gender: 'woman',
    bio: "I believe in slow mornings, handwritten letters, and conversations that go deep. Coffee enthusiast. Book lover. Always curious about people's stories.",
    writingStyle: 'thoughtful',
    interests: ['books', 'coffee', 'writing'],
    promptAnswers: {
      0: "Warm coffee on a rainy morning, the smell of old books, and quiet moments with good music.",
      1: "Harper Lee - her perspective on humanity changed how I see the world.",
      2: "Storytelling in all forms - writing, film, conversations that go deep into the night."
    }
  },
  {
    id: '2',
    name: 'James',
    age: 31,
    gender: 'man',
    bio: "Writer by night, architect by day. Looking for someone who understands the beauty in quiet moments and long walks without a destination.",
    writingStyle: 'friendly',
    interests: ['writing', 'architecture', 'walking']
  },
  {
    id: '3',
    name: 'Elena',
    age: 26,
    gender: 'woman',
    bio: "Music lover. Cat person. Believer in meaningful conversations over small talk. Let's talk about dreams, books, and the universe.",
    writingStyle: 'casual',
    interests: ['music', 'cats', 'reading']
  }
]

export default function DiscoverScreen({ userData, onOpenChat, onOpenSettings }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentProfile = demoProfiles[currentIndex]

  const getWritingStyleLabel = (style) => {
    switch(style) {
      case 'casual': return 'Casual'
      case 'friendly': return 'Friendly'
      case 'thoughtful': return 'Thoughtful'
      default: return 'Writer'
    }
  }

  const handleLike = () => {
    onOpenChat({ id: currentProfile.id, name: currentProfile.name })
  }

  const handlePass = () => {
    setCurrentIndex((currentIndex + 1) % demoProfiles.length)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>VERBA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.photoPlaceholder}>
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderText}>V</Text>
            </View>
            <Text style={styles.photoText}>Photos Hidden</Text>
            <Text style={styles.photoSubtext}>Reveal when both agree</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
              <View style={styles.styleBadge}>
                <Text style={styles.styleBadgeText}>{getWritingStyleLabel(currentProfile.writingStyle)}</Text>
              </View>
            </View>
            
            <View style={styles.promptSection}>
              <View style={styles.prompt}>
                <Text style={styles.promptLabel}>HER STORY</Text>
                <Text style={styles.story}>{currentProfile.bio}</Text>
              </View>

              {currentProfile.promptAnswers && (
                <View style={styles.prompt}>
                  <Text style={styles.promptLabel}>QUICK Q</Text>
                  {Object.values(currentProfile.promptAnswers).slice(0, 2).map((answer, i) => (
                    <Text key={i} style={styles.promptAnswer}>{answer}</Text>
                  ))}
                </View>
              )}
            </View>

            {currentProfile.interests && (
              <View style={styles.tags}>
                {currentProfile.interests.map((tag, i) => (
                  <View key={i} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.passBtn} onPress={handlePass}>
                <Text style={styles.passIcon}>NO</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.likeBtn} onPress={handleLike}>
                <Text style={styles.likeIcon}>LIKE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.queueInfo}>
          <Text style={styles.queueText}>+{demoProfiles.length - currentIndex - 1} more in queue</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}>
            <Text style={styles.navIconTextActive}>V</Text>
          </View>
          <Text style={styles.navLabelActive}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onOpenSettings}>
          <View style={styles.navIcon}>
            <Text style={styles.navIconText}>S</Text>
          </View>
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { padding: 20, paddingTop: 50, alignItems: 'center', backgroundColor: '#fff' },
  logo: { fontFamily: 'Space Mono', fontSize: 20, fontWeight: 'bold', letterSpacing: 2 },
  content: { padding: 16, paddingBottom: 100 },
  card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 20 },
  photoPlaceholder: { height: 280, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  placeholderIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  placeholderText: { fontFamily: 'Space Mono', fontSize: 24, color: '#fff', fontWeight: 'bold' },
  photoText: { fontFamily: 'Space Mono', fontSize: 14, color: '#fff', fontWeight: 'bold' },
  photoSubtext: { fontFamily: 'Space Mono', fontSize: 10, color: '#666', marginTop: 4 },
  cardContent: { padding: 24 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  name: { fontSize: 26, fontWeight: '600' },
  styleBadge: { backgroundColor: '#f0f0f0', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  styleBadgeText: { fontFamily: 'Space Mono', fontSize: 9, color: '#666' },
  promptSection: { marginBottom: 16 },
  prompt: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 14, marginBottom: 10 },
  promptLabel: { fontFamily: 'Space Mono', fontSize: 9, letterSpacing: 1, color: '#999', marginBottom: 8 },
  story: { fontFamily: 'Cormorant Garamond', fontSize: 15, fontStyle: 'italic', lineHeight: 24, color: '#444' },
  promptAnswer: { fontFamily: 'Cormorant Garamond', fontSize: 14, fontStyle: 'italic', color: '#444', marginBottom: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { backgroundColor: '#1a1a1a', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  tagText: { fontFamily: 'Space Mono', fontSize: 10, color: '#fff' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 24, paddingTop: 8 },
  passBtn: { width: 100, height: 50, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#e0e0e0' },
  passIcon: { fontFamily: 'Space Mono', fontSize: 12, color: '#999', fontWeight: 'bold' },
  likeBtn: { width: 100, height: 50, borderRadius: 25, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  likeIcon: { fontFamily: 'Space Mono', fontSize: 12, color: '#fff', fontWeight: 'bold' },
  queueInfo: { alignItems: 'center', marginTop: 16 },
  queueText: { fontFamily: 'Space Mono', fontSize: 10, color: '#999' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  navItem: { alignItems: 'center' },
  navIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  navIconText: { fontFamily: 'Space Mono', fontSize: 14, color: '#bbb', fontWeight: 'bold' },
  navIconActive: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  navIconTextActive: { fontFamily: 'Space Mono', fontSize: 14, color: '#fff', fontWeight: 'bold' },
  navLabelActive: { fontFamily: 'Space Mono', fontSize: 9, color: '#1a1a1a', fontWeight: 'bold' },
  navLabel: { fontFamily: 'Space Mono', fontSize: 9, color: '#bbb' },
})
