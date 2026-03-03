import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

const demoThoughts = [
  { id: '1', author: 'Sarah', age: 28, content: "There's something magical about rainy mornings. The sound, the smell, the excuse to slow down.", time: '2h ago', likes: 12, comments: 3 },
  { id: '2', author: 'James', age: 31, content: "I've been thinking about how strange it is that we judge books by their covers when we've always believed words matter more.", time: '4h ago', likes: 8, comments: 5 },
  { id: '3', author: 'Elena', age: 26, content: "Just finished a book that changed how I see patience. Sometimes the best things take time.", time: '6h ago', likes: 15, comments: 2 },
]

export default function ThoughtsScreen({ onBack, onOpenDiscover, onOpenSettings }) {
  const [thoughts, setThoughts] = useState(demoThoughts)
  const [newThought, setNewThought] = useState('')
  const [showComposer, setShowComposer] = useState(false)

  const handlePost = () => {
    if (!newThought.trim()) return
    const thought = {
      id: Date.now().toString(),
      author: 'You',
      age: 25,
      content: newThought,
      time: 'Just now',
      likes: 0,
      comments: 0,
    }
    setThoughts([thought, ...thoughts])
    setNewThought('')
    setShowComposer(false)
  }

  const handleLike = (id) => {
    setThoughts(thoughts.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t))
  }

  const renderThought = ({ item }) => (
    <View style={styles.thoughtCard}>
      <View style={styles.thoughtHeader}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{item.author[0]}</Text></View>
        <View style={styles.thoughtMeta}>
          <Text style={styles.authorName}>{item.author}, {item.age}</Text>
          <Text style={styles.thoughtTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.thoughtContent}>{item.content}</Text>
      <View style={styles.thoughtActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(item.id)}>
          <Text style={styles.actionIcon}>♥</Text>
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.back}>-</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>THOUGHTS</Text>
        <TouchableOpacity onPress={() => setShowComposer(true)}>
          <Text style={styles.newButton}>+ NEW</Text>
        </TouchableOpacity>
      </View>

      {showComposer && (
        <View style={styles.composer}>
          <TextInput
            style={styles.composerInput}
            placeholder="Share a thought..."
            placeholderTextColor="#999"
            value={newThought}
            onChangeText={setNewThought}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <View style={styles.composerActions}>
            <TouchableOpacity onPress={() => setShowComposer(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.postButton, !newThought.trim() && styles.postButtonDisabled]} onPress={handlePost} disabled={!newThought.trim()}>
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={thoughts}
        keyExtractor={(item) => item.id}
        renderItem={renderThought}
        contentContainerStyle={styles.list}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onOpenDiscover}>
          <View style={styles.navIcon}><Text style={styles.navIconText}>V</Text></View>
          <Text style={styles.navLabel}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}><Text style={styles.navIconTextActive}>T</Text></View>
          <Text style={styles.navLabelActive}>Thoughts</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { fontSize: 24, color: '#1a1a1a' },
  headerTitle: { fontFamily: 'Space Mono', fontSize: 14, fontWeight: 'bold', color: '#1a1a1a' },
  newButton: { fontFamily: 'Space Mono', fontSize: 11, fontWeight: 'bold', color: '#1a1a1a' },
  composer: { backgroundColor: '#fff', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  composerInput: { backgroundColor: '#f8f8f8', borderRadius: 12, padding: 14, fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', minHeight: 100, textAlignVertical: 'top' },
  composerActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  cancelText: { fontFamily: 'Space Mono', fontSize: 12, color: '#999' },
  postButton: { backgroundColor: '#1a1a1a', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  postButtonDisabled: { opacity: 0.4 },
  postText: { fontFamily: 'Space Mono', fontSize: 11, fontWeight: 'bold', color: '#fff' },
  list: { padding: 16, paddingBottom: 100 },
  thoughtCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16 },
  thoughtHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: 'Space Mono', fontSize: 16, fontWeight: 'bold', color: '#fff' },
  thoughtMeta: { marginLeft: 12 },
  authorName: { fontSize: 14, fontWeight: '600' },
  thoughtTime: { fontFamily: 'Space Mono', fontSize: 10, color: '#999' },
  thoughtContent: { fontFamily: 'Cormorant Garamond', fontSize: 16, fontStyle: 'italic', lineHeight: 26, color: '#333', marginBottom: 16 },
  thoughtActions: { flexDirection: 'row', gap: 24 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionIcon: { fontSize: 16 },
  actionText: { fontFamily: 'Space Mono', fontSize: 11, color: '#666' },
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
