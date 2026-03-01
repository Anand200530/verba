// VERBA - Discover Screen (Browse Profiles)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Mock profiles (without photos)
const profiles = [
  {
    id: 1,
    name: 'Alex',
    age: 26,
    story: 'Coffee enthusiast. Love reading on rainy days. Looking for someone to explore bookstores with.',
  },
  {
    id: 2,
    name: 'Jordan',
    age: 24,
    story: 'Software developer by day, amateur chef by night. Would love to cook for someone special.',
  },
  {
    id: 3,
    name: 'Sam',
    age: 28,
    story: 'Introvert who loves hiking. Looking for genuine connection over small talk.',
  },
];

export default function DiscoverScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePass = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLike = () => {
    // In real app: send like to backend
    navigation.navigate('Match');
  };

  const profile = profiles[currentIndex];

  if (!profile) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No more profiles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>V</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        {/* Photo placeholder - blurred/hidden */}
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoText}>Photo hidden</Text>
          <Text style={styles.photoSubtext}>Chat first to reveal</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          <Text style={styles.story}>{profile.story}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.passBtn} onPress={handlePass}>
          <Text style={styles.passText}>✕</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.likeBtn} onPress={handleLike}>
          <Text style={styles.likeText}>♥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  settingsIcon: {
    fontSize: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },
  card: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    height: 250,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 18,
    color: '#999',
  },
  photoSubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8,
  },
  info: {
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 12,
  },
  story: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingBottom: 40,
  },
  passBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eee',
  },
  passText: {
    fontSize: 30,
    color: '#999',
  },
  likeBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 30,
    color: '#fff',
  },
  empty: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
});
