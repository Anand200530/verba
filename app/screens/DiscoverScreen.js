import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

// Demo profiles
const demoProfiles = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    bio: "I believe in slow mornings, handwritten letters, and conversations that go deep. Coffee enthusiast. Book lover. Always curious about people's stories.",
    interests: ['books', 'coffee', 'writing']
  },
  {
    id: '2',
    name: 'James',
    age: 31,
    bio: "Writer by night, architect by day. Looking for someone who understands the beauty in quiet moments and long walks without a destination.",
    interests: ['writing', 'architecture', 'walking']
  },
  {
    id: '3',
    name: 'Elena',
    age: 26,
    bio: "Music lover. Cat person. Believer in meaningful conversations over small talk. Let's talk about dreams, books, and the universe.",
    interests: ['music', 'cats', 'reading']
  }
]

export default function DiscoverScreen({ userData, onOpenChat, onOpenSettings }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentProfile = demoProfiles[currentIndex]

  const handleLike = () => {
    onOpenChat({ id: currentProfile.id, name: currentProfile.name })
  }

  const handlePass = () => {
    setCurrentIndex((currentIndex + 1) % demoProfiles.length)
  }

  if (!currentProfile) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>VERBA</Text>
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No more profiles</Text>
          <Text style={styles.emptySubtext}>Check back later!</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>VERBA</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoEmoji}>🎭</Text>
            <Text style={styles.photoText}>Photos Hidden</Text>
            <Text style={styles.photoSubtext}>Reveal when both agree</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
            
            <View style={styles.prompt}>
              <Text style={styles.promptLabel}>HER STORY</Text>
              <Text style={styles.story}>{currentProfile.bio}</Text>
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
                <Text style={styles.passIcon}>✌️</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.likeBtn} onPress={handleLike}>
                <Text style={styles.likeIcon}>♥</Text>
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
          <Text style={styles.navIcon}>🔥</Text>
          <Text style={styles.navLabelActive}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onOpenSettings}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontFamily: 'Space Mono',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
  },
  photoPlaceholder: {
    height: 280,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  photoText: {
    fontFamily: 'Space Mono',
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  photoSubtext: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  cardContent: {
    padding: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 16,
  },
  prompt: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  promptLabel: {
    fontFamily: 'Space Mono',
    fontSize: 9,
    letterSpacing: 1,
    color: '#999',
    marginBottom: 8,
  },
  story: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 26,
    color: '#444',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  tagText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingTop: 8,
  },
  passBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  passIcon: {
    fontSize: 28,
  },
  likeBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeIcon: {
    fontSize: 28,
    color: '#fff',
  },
  queueInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  queueText: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#999',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Cormorant Garamond',
    fontSize: 20,
    fontStyle: 'italic',
    color: '#999',
  },
  emptySubtext: {
    fontFamily: 'Space Mono',
    fontSize: 10,
    color: '#bbb',
    marginTop: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  navLabelActive: {
    fontFamily: 'Space Mono',
    fontSize: 9,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  navLabel: {
    fontFamily: 'Space Mono',
    fontSize: 9,
    color: '#bbb',
  },
})
