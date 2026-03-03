import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert, ScrollView } from 'react-native'

export default function SettingsScreen({ userData, settings, onSettingsChange, onBack, onSignOut, onEditProfile, onOpenThoughts }) {
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
        <Text style={styles.title}>SETTINGS</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userData?.name?.[0] || 'V'}</Text>
          </View>
          <Text style={styles.profileName}>{userData?.name || 'User'}</Text>
          <Text style={styles.profileStatus}>{userData?.age || '--'} years old</Text>
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
          
          <TouchableOpacity style={styles.menuItem} onPress={onEditProfile}>
            <Text style={styles.menuText}>Edit Story</Text>
            <Text style={styles.menuArrow}>{'->'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Interests</Text>
            <Text style={styles.menuArrow}>{'->'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Writing Prompts</Text>
            <Text style={styles.menuArrow}>{'->'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPLORE</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={onOpenThoughts}>
            <Text style={styles.menuText}>Thoughts Feed</Text>
            <Text style={styles.menuArrow}>{'->'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>How It Works</Text>
            <Text style={styles.menuArrow}>{'->'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Text style={styles.menuArrow}>{'->'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>START OVER</Text>
        </TouchableOpacity>

        <Text style={styles.version}>VERBA v1.0.0</Text>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <View style={styles.navIcon}><Text style={styles.navIconText}>V</Text></View>
          <Text style={styles.navLabel}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onOpenThoughts}>
          <View style={styles.navIcon}><Text style={styles.navIconText}>T</Text></View>
          <Text style={styles.navLabel}>Thoughts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <View style={styles.navIcon}><Text style={styles.navIconText}>C</Text></View>
          <Text style={styles.navLabel}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}><View style={styles.settingsIconActive}><View style={styles.settingsCircleActive} /></View></View>
          <Text style={styles.navLabelActive}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f7' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  back: { fontSize: 24, color: '#1a1a1a' },
  title: { fontFamily: 'Space Mono', fontSize: 14, fontWeight: 'bold' },
  placeholder: { width: 24 },
  content: { paddingBottom: 100 },
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
  version: { textAlign: 'center', color: '#bbb', fontFamily: 'Space Mono', fontSize: 10, marginTop: 10, marginBottom: 20 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  navItem: { alignItems: 'center' },
  navIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  navIconText: { fontFamily: 'Space Mono', fontSize: 14, color: '#bbb', fontWeight: 'bold' },
  navIconActive: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  settingsIconActive: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#fff' },
  settingsCircleActive: { position: 'absolute', width: 4, height: 4, borderRadius: 2, backgroundColor: '#fff', top: 5, left: 5 },
  navLabel: { fontFamily: 'Space Mono', fontSize: 9, color: '#bbb' },
  navLabelActive: { fontFamily: 'Space Mono', fontSize: 9, color: '#1a1a1a', fontWeight: 'bold' },
})
