import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const demoProfiles = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    bio: "I believe in slow mornings, handwritten letters, and conversations that go deep. Coffee enthusiast. Book lover.",
    writingStyle: 'thoughtful',
    interests: ['books', 'coffee', 'writing'],
    promptAnswers: {
      0: "Warm coffee on a rainy morning, the smell of old books, and quiet moments with good music.",
      1: "Harper Lee - her perspective on humanity changed how I see the world."
    }
  },
  {
    id: '2',
    name: 'James',
    age: 31,
    bio: "Writer by night, architect by day. Looking for someone who understands the beauty in quiet moments.",
    writingStyle: 'friendly',
    interests: ['writing', 'architecture', 'walking']
  },
  {
    id: '3',
    name: 'Elena',
    age: 26,
    bio: "Music lover. Believer in meaningful conversations over small talk.",
    writingStyle: 'casual',
    interests: ['music', 'cats', 'reading']
  }
]

const HeartIcon = ({ size = 30, color = '#fff' }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: size, height: size, position: 'relative' }}>
      <View style={{ position: 'absolute', width: size / 2, height: size / 2, backgroundColor: color, borderRadius: size / 4, left: 0, bottom: size / 4 }} />
      <View style={{ position: 'absolute', width: size / 2, height: size / 2, backgroundColor: color, borderRadius: size / 4, right: 0, bottom: size / 4 }} />
      <View style={{ position: 'absolute', width: 0, height: 0, borderLeftWidth: size / 4, borderRightWidth: size / 4, borderBottomWidth: size / 3, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: color, bottom: 0, left: size / 4 }} />
    </View>
  </View>
)

const XIcon = ({ size = 26 }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: size * 0.7, height: 3, backgroundColor: '#999', borderRadius: 2, transform: [{ rotate: '45deg' }], position: 'absolute' }} />
    <View style={{ width: size * 0.7, height: 3, backgroundColor: '#999', borderRadius: 2, transform: [{ rotate: '-45deg' }], position: 'absolute' }} />
  </View>
)

const GearIcon = ({ size = 18 }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, borderWidth: 2.5, borderColor: '#888', backgroundColor: '#f0f0f0' }} />
    <View style={{ width: size * 0.18, height: size * 0.18, borderRadius: size * 0.09, backgroundColor: '#888', position: 'absolute' }} />
  </View>
)

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
          <View style={styles.cardContent}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
              <View style={styles.styleBadge}>
                <Text style={styles.styleBadgeText}>{getWritingStyleLabel(currentProfile.writingStyle)}</Text>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>STORY</Text>
              <Text style={styles.bio}>{currentProfile.bio}</Text>
            </View>

            {currentProfile.promptAnswers && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>QUICK Q</Text>
                {Object.values(currentProfile.promptAnswers).slice(0, 2).map((answer, i) => (
                  <Text key={i} style={styles.promptAnswer}>{answer}</Text>
                ))}
              </View>
            )}

            {currentProfile.interests && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>INTERESTS</Text>
                <View style={styles.tags}>
                  {currentProfile.interests.map((tag, i) => (
                    <View key={i} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.passBtn} onPress={handlePass}>
                <XIcon size={26} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.likeBtn} onPress={handleLike}>
                <HeartIcon size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.queueInfo}>
          <Text style={styles.queueText}>+{demoProfiles.length - currentIndex - 1} more</Text>
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
            <GearIcon size={18} />
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
  cardContent: { padding: 24 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  name: { fontSize: 28, fontWeight: '600' },
  styleBadge: { backgroundColor: '#f0f0f0', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  styleBadgeText: { fontFamily: 'Space Mono', fontSize: 9, color: '#666' },
  section: { marginBottom: 20 },
  sectionLabel: { fontFamily: 'Space Mono', fontSize: 9, letterSpacing: 1, color: '#999', marginBottom: 8 },
  bio: { fontFamily: 'Cormorant Garamond', fontSize: 17, fontStyle: 'italic', lineHeight: 26, color: '#333' },
  promptAnswer: { fontFamily: 'Cormorant Garamond', fontSize: 15, fontStyle: 'italic', color: '#444', marginBottom: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#1a1a1a', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  tagText: { fontFamily: 'Space Mono', fontSize: 10, color: '#fff' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 20 },
  passBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#e0e0e0' },
  likeBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  queueInfo: { alignItems: 'center', marginTop: 20 },
  queueText: { fontFamily: 'Space Mono', fontSize: 10, color: '#999' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  navItem: { alignItems: 'center' },
  navIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  navIconActive: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  navIconTextActive: { fontFamily: 'Space Mono', fontSize: 14, color: '#fff', fontWeight: 'bold' },
  navLabelActive: { fontFamily: 'Space Mono', fontSize: 9, color: '#1a1a1a', fontWeight: 'bold' },
  navLabel: { fontFamily: 'Space Mono', fontSize: 9, color: '#bbb' },
})
