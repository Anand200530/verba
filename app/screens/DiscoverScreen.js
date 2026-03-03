import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

const demoProfiles = [
  { id: '1', name: 'Sarah', age: 28, bio: "I believe in slow mornings, handwritten letters, and conversations that go deep.", writingStyle: 'thoughtful', interests: ['books', 'coffee', 'writing'], promptAnswers: { 0: "Warm coffee on a rainy morning...", 1: "Harper Lee..." } },
  { id: '2', name: 'James', age: 31, bio: "Writer by night, architect by day.", writingStyle: 'friendly', interests: ['writing', 'architecture', 'walking'] },
  { id: '3', name: 'Elena', age: 26, bio: "Music lover. Believer in meaningful conversations.", writingStyle: 'casual', interests: ['music', 'cats', 'reading'] }
]

export default function DiscoverScreen({ userData, onMatch, onOpenSettings, onOpenChats }) {
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

  const handleLike = () => { onMatch(currentProfile) }
  const handlePass = () => { setCurrentIndex((currentIndex + 1) % demoProfiles.length) }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DISCOVER</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
              <View style={styles.styleBadge}><Text style={styles.styleBadgeText}>{getWritingStyleLabel(currentProfile.writingStyle)}</Text></View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>STORY</Text>
              <Text style={styles.bio}>{currentProfile.bio}</Text>
            </View>
            {currentProfile.interests && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>INTERESTS</Text>
                <View style={styles.tags}>
                  {currentProfile.interests.map((tag, i) => (
                    <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                  ))}
                </View>
              </View>
            )}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.passBtn} onPress={handlePass}><Text style={styles.passIcon}>x</Text></TouchableOpacity>
              <TouchableOpacity style={styles.likeBtn} onPress={handleLike}><Text style={styles.likeIcon}>♥</Text></TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.queueInfo}><Text style={styles.queueText}>+{demoProfiles.length - currentIndex - 1} more</Text></View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}><Text style={styles.navIconTextActive}>V</Text></View>
          <Text style={styles.navLabelActive}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onOpenChats}>
          <View style={styles.navIcon}><Text style={styles.navIconText}>C</Text></View>
          <Text style={styles.navLabel}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onOpenSettings}>
          <View style={styles.navIcon}><View style={styles.settingsIcon}><View style={styles.settingsCircle} /></View></View>
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontFamily: 'Space Mono', fontSize: 14, fontWeight: 'bold', color: '#1a1a1a' },
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
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: '#1a1a1a', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  tagText: { fontFamily: 'Space Mono', fontSize: 10, color: '#fff' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 20 },
  passBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#e0e0e0' },
  passIcon: { fontSize: 24, color: '#ccc', fontWeight: '300' },
  likeBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  likeIcon: { fontSize: 32, color: '#fff' },
  queueInfo: { alignItems: 'center', marginTop: 20 },
  queueText: { fontFamily: 'Space Mono', fontSize: 10, color: '#999' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  navItem: { alignItems: 'center' },
  navIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  navIconText: { fontFamily: 'Space Mono', fontSize: 14, color: '#bbb', fontWeight: 'bold' },
  navIconActive: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  navIconTextActive: { fontFamily: 'Space Mono', fontSize: 14, color: '#fff', fontWeight: 'bold' },
  settingsIcon: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#888' },
  settingsCircle: { position: 'absolute', width: 4, height: 4, borderRadius: 2, backgroundColor: '#888', top: 5, left: 5 },
  navLabel: { fontFamily: 'Space Mono', fontSize: 9, color: '#bbb' },
  navLabelActive: { fontFamily: 'Space Mono', fontSize: 9, color: '#1a1a1a', fontWeight: 'bold' },
})
