import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native'

export default function SettingsScreen({ userData, settings, onSettingsChange, onBack, onSignOut }) {
  const [ghostMode, setGhostMode] = useState(settings?.ghostMode ?? true)

  const handleGhostModeChange = (value) => {
    setGhostMode(value)
    onSettingsChange({ ...settings, ghostMode: value })
  }

  const handleSignOut = () => {
    Alert.alert(
      'Start Over',
      'This will reset your profile and start fresh. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Over', style: 'destructive', onPress: onSignOut },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>-</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>V</Text>
        </View>
        <Text style={styles.profileName}>{userData?.name || 'User'}</Text>
        <Text style={styles.profileStatus}>Photos hidden</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PRIVACY</Text>
        
        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Ghost Mode</Text>
            <Text style={styles.settingDesc}>Hide online status and last seen</Text>
          </View>
          <Switch
            value={ghostMode}
            onValueChange={handleGhostModeChange}
            trackColor={{ false: '#ddd', true: '#1a1a1a' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFILE</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Story</Text>
          <Text style={styles.menuArrow}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Interests</Text>
          <Text style={styles.menuArrow}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Photo Settings</Text>
          <Text style={styles.menuArrow}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>How It Works</Text>
          <Text style={styles.menuArrow}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Text style={styles.menuArrow}>-</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Start Over</Text>
      </TouchableOpacity>

      <Text style={styles.version}>VERBA v1.0.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7', paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { fontSize: 24, color: '#1a1a1a' },
  title: { fontFamily: 'Space Mono', fontSize: 14, fontWeight: 'bold' },
  placeholder: { width: 24 },
  profileCard: { backgroundColor: '#fff', alignItems: 'center', paddingVertical: 30, borderBottomWidth: 8, borderBottomColor: '#f8f8f8' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontFamily: 'Space Mono', fontSize: 32, color: '#fff', fontWeight: 'bold' },
  profileName: { fontFamily: 'Space Mono', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  profileStatus: { fontFamily: 'Space Mono', fontSize: 10, color: '#999' },
  section: { padding: 20, borderBottomWidth: 8, borderBottomColor: '#f8f8f8', backgroundColor: '#fff' },
  sectionTitle: { fontFamily: 'Space Mono', fontSize: 9, letterSpacing: 1, color: '#999', marginBottom: 16 },
  setting: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 16, marginBottom: 4 },
  settingDesc: { fontSize: 12, color: '#666' },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuText: { fontSize: 15 },
  menuArrow: { fontSize: 14, color: '#999' },
  signOutButton: { margin: 20, padding: 16, backgroundColor: '#fee', borderRadius: 8, alignItems: 'center' },
  signOutText: { color: '#ff4444', fontFamily: 'Space Mono', fontSize: 12, letterSpacing: 1 },
  version: { textAlign: 'center', color: '#bbb', fontFamily: 'Space Mono', fontSize: 10, marginTop: 10 },
})
