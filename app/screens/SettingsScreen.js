import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native'
import { updateProfile } from '../lib/supabase'

export default function SettingsScreen({ profile, onSignOut, onBack }) {
  const [ghostMode, setGhostMode] = useState(profile?.ghost_mode || false)

  const toggleGhostMode = async (value) => {
    setGhostMode(value)
    if (profile) {
      await updateProfile(profile.user_id, { ghost_mode: value })
    }
  }

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: onSignOut },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PRIVACY</Text>
        
        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>👻 Ghost Mode</Text>
            <Text style={styles.settingDesc}>Hide online status & last seen</Text>
          </View>
          <Switch
            value={ghostMode}
            onValueChange={toggleGhostMode}
            trackColor={{ false: '#ddd', true: '#1a1a1a' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFILE</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Story</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Interests</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Photo Settings</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>How It Works</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>VERBA v1.0.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  back: {
    fontSize: 24,
  },
  title: {
    fontFamily: 'Space Mono',
    fontSize: 14,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  section: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: '#f8f8f8',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontFamily: 'Space Mono',
    fontSize: 9,
    letterSpacing: 1,
    color: '#999',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 12,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 15,
  },
  menuArrow: {
    fontSize: 14,
    color: '#999',
  },
  signOutButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#fee',
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#ff4444',
    fontFamily: 'Space Mono',
    fontSize: 12,
    letterSpacing: 1,
  },
  version: {
    textAlign: 'center',
    color: '#bbb',
    fontFamily: 'Space Mono',
    fontSize: 10,
    marginTop: 10,
  },
})
