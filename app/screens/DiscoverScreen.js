import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native'

const allProfiles = [
  { id: '1', name: 'Sarah', age: 28, gender: 'Woman', bio: "I believe in slow mornings, handwritten letters, and conversations that go deep.", writingStyle: 'thoughtful', interests: ['books', 'coffee', 'writing', 'rain'], vibe: { introvert: true, deep: true, planned: true }, promptAnswers: { 0: "Warm coffee on a rainy morning...", 1: "Harper Lee - she understood people..." } },
  { id: '2', name: 'James', age: 31, gender: 'Man', bio: "Writer by night, architect by day.", writingStyle: 'friendly', interests: ['writing', 'architecture', 'walking', 'tea'], vibe: { balanced: true, fun: true, spontaneous: true } },
  { id: '3', name: 'Elena', age: 26, gender: 'Woman', bio: "Music lover.", writingStyle: 'casual', interests: ['music', 'cats', 'reading', 'travel'], vibe: { introvert: false, fun: true, balanced: true } },
  { id: '4', name: 'Michael', age: 29, gender: 'Man', bio: "Introvert who loves deep talks.", writingStyle: 'thoughtful', interests: ['tech', 'philosophy', 'photography', 'jazz'], vibe: { introvert: true, deep: true, balanced: true } },
  { id: '5', name: 'Priya', age: 27, gender: 'Woman', bio: "Bookworm with a wanderlust soul.", writingStyle: 'friendly', interests: ['books', 'travel', 'cooking', 'art'], vibe: { introvert: true, deep: true, planned: true } },
  { id: '6', name: 'David', age: 33, gender: 'Man', bio: "Gentle soul, deep thinker.", writingStyle: 'thoughtful', interests: ['music', 'nature', 'meditation', 'movies'], vibe: { introvert: true, deep: true, spontaneous: false } },
  { id: '7', name: 'Anna', age: 25, gender: 'Woman', bio: "Quiet observer.", writingStyle: 'casual', interests: ['reading', 'writing', 'cats', 'tea'], vibe: { introvert: true, balanced: true, planned: true } },
  { id: '8', name: 'Alex', age: 30, gender: 'Other', bio: "Non-binary artist.", writingStyle: 'friendly', interests: ['art', 'music', 'creativity', 'travel'], vibe: { balanced: true, fun: true, spontaneous: true } },
]

const userVibe = { introvert: true, deep: true, planned: true }

function calculateVibeMatch(profileVibe) {
  if (!profileVibe) return null
  let matches = 0
  if (profileVibe.introvert === userVibe.introvert) matches++
  if (profileVibe.deep === userVibe.deep) matches++
  if (profileVibe.planned === userVibe.planned) matches++
  return Math.round((matches / 3) * 100)
}

export default function DiscoverScreen({ userData, onMatch, onOpenSettings, onOpenChats, onOpenThoughts, onOpenVibeQuiz, onOpenDailyPrompt }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    minAge: 18,
    maxAge: 50,
    gender: 'All',
    interests: [],
  })

  // Apply filters
  const filteredProfiles = allProfiles.filter(p => {
    if (p.age < filters.minAge || p.age > filters.maxAge) return false
    if (filters.gender !== 'All' && p.gender !== filters.gender) return false
    return true
  })

  // Safe access to current profile
  const currentProfile = filteredProfiles.length > 0 ? filteredProfiles[currentIndex % filteredProfiles.length] : null
  const vibeMatch = currentProfile ? calculateVibeMatch(currentProfile.vibe) : null

  const getWritingStyleLabel = (style) => {
    switch(style) {
      case 'casual': return 'Casual'
      case 'friendly': return 'Friendly'
      case 'thoughtful': return 'Thoughtful'
      default: return 'Writer'
    }
  }

  const getVibeLabel = (score) => {
    if (score >= 80) return 'Great Vibe'
    if (score >= 60) return 'Good Vibe'
    return 'Different Vibe'
  }

  const handleLike = () => { 
    if (currentProfile) {
      onMatch(currentProfile) 
    }
    if (filteredProfiles.length > 1) {
      setCurrentIndex((currentIndex + 1) % filteredProfiles.length)
    }
  }
  
  const handlePass = () => { 
    if (filteredProfiles.length > 1) {
      setCurrentIndex((currentIndex + 1) % filteredProfiles.length)
    }
  }

  const toggleGender = (gender) => {
    setFilters({ ...filters, gender: filters.gender === gender ? 'All' : gender })
  }

  const resetFilters = () => {
    setFilters({ minAge: 18, maxAge: 50, gender: 'All', interests: [] })
    setCurrentIndex(0)
  }

  // No profiles found
  if (!currentProfile) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>DISCOVER</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={onOpenDailyPrompt}>
              <Text style={styles.dailyButton}>DAILY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenVibeQuiz}>
              <Text style={styles.vibeButton}>VIBE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No profiles match your filters</Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIconActive}><Text style={styles.navIconTextActive}>V</Text></View>
            <Text style={styles.navLabelActive}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={onOpenThoughts}>
            <View style={styles.navIcon}><Text style={styles.navIconText}>T</Text></View>
            <Text style={styles.navLabel}>Thoughts</Text>
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DISCOVER</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={onOpenDailyPrompt}>
            <Text style={styles.dailyButton}>DAILY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onOpenVibeQuiz}>
            <Text style={styles.vibeButton}>VIBE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowFilters(true)}>
            <Text style={styles.filterButton}>FILTER</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
              <View style={styles.styleBadge}><Text style={styles.styleBadgeText}>{getWritingStyleLabel(currentProfile.writingStyle)}</Text></View>
            </View>
            
            {vibeMatch !== null && (
              <View style={[styles.vibeBadge, vibeMatch >= 60 ? styles.vibeGood : styles.vibeBad]}>
                <Text style={[styles.vibeText, vibeMatch >= 60 ? styles.vibeTextGood : styles.vibeTextBad]}>{vibeMatch}% Vibe Match - {getVibeLabel(vibeMatch)}</Text>
              </View>
            )}

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
        <View style={styles.queueInfo}><Text style={styles.queueText}>{filteredProfiles.length} profiles in queue</Text></View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>FILTERS</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}><Text style={styles.modalClose}>x</Text></TouchableOpacity>
            </View>

            <Text style={styles.filterLabel}>Age Range</Text>
            <View style={styles.ageRow}>
              <Text style={styles.ageText}>{filters.minAge} - {filters.maxAge}</Text>
            </View>
            <View style={styles.ageButtons}>
              <TouchableOpacity style={styles.ageButton} onPress={() => setFilters({ ...filters, minAge: Math.max(18, filters.minAge - 5) })}><Text style={styles.ageButtonText}>-5</Text></TouchableOpacity>
              <TouchableOpacity style={styles.ageButton} onPress={() => setFilters({ ...filters, minAge: Math.min(filters.maxAge - 1, filters.minAge + 5) })}><Text style={styles.ageButtonText}>+5</Text></TouchableOpacity>
              <TouchableOpacity style={styles.ageButton} onPress={() => setFilters({ ...filters, maxAge: Math.max(filters.minAge + 1, filters.maxAge - 5) })}><Text style={styles.ageButtonText}>-5</Text></TouchableOpacity>
              <TouchableOpacity style={styles.ageButton} onPress={() => setFilters({ ...filters, maxAge: Math.min(60, filters.maxAge + 5) })}><Text style={styles.ageButtonText}>+5</Text></TouchableOpacity>
            </View>

            <Text style={styles.filterLabel}>Gender</Text>
            <View style={styles.genderRow}>
              {['All', 'Woman', 'Man', 'Other'].map(g => (
                <TouchableOpacity key={g} style={[styles.genderButton, filters.gender === g && styles.genderButtonActive]} onPress={() => toggleGender(g)}>
                  <Text style={[styles.genderButtonText, filters.gender === g && styles.genderButtonTextActive]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={() => { setCurrentIndex(0); setShowFilters(false); }}>
              <Text style={styles.applyText}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}><Text style={styles.navIconTextActive}>V</Text></View>
          <Text style={styles.navLabelActive}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onOpenThoughts}>
          <View style={styles.navIcon}><Text style={styles.navIconText}>T</Text></View>
          <Text style={styles.navLabel}>Thoughts</Text>
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
  header: { padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontFamily: 'Space Mono', fontSize: 14, fontWeight: 'bold', color: '#1a1a1a' },
  headerButtons: { flexDirection: 'row', gap: 8 },
  dailyButton: { fontFamily: 'Space Mono', fontSize: 9, fontWeight: 'bold', color: '#1a1a1a', backgroundColor: '#e8f5e9', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  vibeButton: { fontFamily: 'Space Mono', fontSize: 9, fontWeight: 'bold', color: '#1a1a1a', backgroundColor: '#f0f0f0', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  filterButton: { fontFamily: 'Space Mono', fontSize: 9, fontWeight: 'bold', color: '#1a1a1a', backgroundColor: '#f0f0f0', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  content: { padding: 16, paddingBottom: 100 },
  card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 20 },
  cardContent: { padding: 24 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  name: { fontSize: 28, fontWeight: '600' },
  styleBadge: { backgroundColor: '#f0f0f0', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  styleBadgeText: { fontFamily: 'Space Mono', fontSize: 9, color: '#666' },
  vibeBadge: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, marginBottom: 16 },
  vibeGood: { backgroundColor: '#e8f5e9' },
  vibeBad: { backgroundColor: '#fce4ec' },
  vibeText: { fontFamily: 'Space Mono', fontSize: 10, fontWeight: 'bold' },
  vibeTextGood: { color: '#2e7d32' },
  vibeTextBad: { color: '#c62828' },
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
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontFamily: 'Space Mono', fontSize: 14, color: '#666', marginBottom: 20 },
  resetButton: { backgroundColor: '#1a1a1a', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  resetText: { fontFamily: 'Space Mono', fontSize: 11, color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontFamily: 'Space Mono', fontSize: 14, fontWeight: 'bold' },
  modalClose: { fontSize: 20, color: '#999' },
  filterLabel: { fontFamily: 'Space Mono', fontSize: 11, color: '#999', marginBottom: 12, letterSpacing: 1 },
  ageRow: { alignItems: 'center', marginBottom: 12 },
  ageText: { fontFamily: 'Space Mono', fontSize: 20, fontWeight: 'bold' },
  ageButtons: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 24 },
  ageButton: { backgroundColor: '#f0f0f0', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  ageButtonText: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold' },
  genderRow: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  genderButton: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: '#f0f0f0', alignItems: 'center' },
  genderButtonActive: { backgroundColor: '#1a1a1a' },
  genderButtonText: { fontFamily: 'Space Mono', fontSize: 11, color: '#666' },
  genderButtonTextActive: { color: '#fff' },
  applyButton: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, alignItems: 'center' },
  applyText: { fontFamily: 'Space Mono', fontSize: 12, fontWeight: 'bold', color: '#fff', letterSpacing: 1 },
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
