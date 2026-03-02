import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { discoverProfiles, createMatch, getProfile } from '../lib/supabase'

export default function DiscoverScreen({ user, profile, onOpenChat, onOpenSettings }) {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadProfiles = async () => {
    if (!user) return
    
    const { data, error } = await discoverProfiles(user.id)
    if (!error) {
      setProfiles(data)
    }
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    loadProfiles()
  }, [user])

  const onRefresh = () => {
    setRefreshing(true)
    loadProfiles()
  }

  const handleLike = async (likedProfile) => {
    // In a real app, this would check if the other person also liked
    // For now, we'll create a match
    const { data: ownProfile } = await getProfile(user.id)
    
    if (ownProfile) {
      // Simulate matching (in real app, this would be bidirectional)
      const { data: existingMatch } = await createMatch(ownProfile.id, likedProfile.id)
      
      if (existingMatch && existingMatch.length > 0) {
        onOpenChat(existingMatch[0])
      } else {
        // Remove from list and show "no match" for now
        setProfiles(profiles.filter(p => p.id !== likedProfile.id))
        alert(`You liked ${likedProfile.display_name}! They'll be notified.`)
      }
    }
  }

  const handlePass = (likedProfile) => {
    setProfiles(profiles.filter(p => p.id !== likedProfile.id))
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (profiles.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyTitle}>No more profiles</Text>
        <Text style={styles.emptySubtitle}>Check back later for new matches!</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Verba</Text>
        <TouchableOpacity onPress={onOpenSettings}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {profiles.slice(0, 1).map((p) => (
          <View key={p.id} style={styles.card}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoEmoji}>🎭</Text>
              <Text style={styles.photoText}>Photos hidden</Text>
              <Text style={styles.photoSubtext}>Reveal when both agree</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{p.display_name}, {p.age}</Text>
              <Text style={styles.bio} numberOfLines={4}>
                {p.bio || "No story yet..."}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.passButton}
                  onPress={() => handlePass(p)}
                >
                  <Text style={styles.passIcon}>✌️</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.likeButton}
                  onPress={() => handleLike(p)}
                >
                  <Text style={styles.likeIcon}>💜</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {profiles.length > 1 && (
          <Text style={styles.moreText}>
            +{profiles.length - 1} more profiles in queue
          </Text>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    height: 300,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  photoText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  photoSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  passButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eee',
  },
  passIcon: {
    fontSize: 28,
  },
  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeIcon: {
    fontSize: 28,
  },
  moreText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  refreshButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#6B4EFF',
    borderRadius: 20,
  },
  refreshText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
