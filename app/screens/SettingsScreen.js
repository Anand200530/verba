// VERBA - Settings Screen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [ghostMode, setGhostMode] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        
        <View style={styles.setting}>
          <View>
            <Text style={styles.settingLabel}>Ghost Mode</Text>
            <Text style={styles.settingDesc}>Hide online status</Text>
          </View>
          <Switch
            value={ghostMode}
            onValueChange={setGhostMode}
            trackColor={{ false: '#ddd', true: '#111' }}
          />
        </View>

        <View style={styles.setting}>
          <View>
            <Text style={styles.settingLabel}>Read Receipts</Text>
            <Text style={styles.settingDesc}>Let others know when you've read messages</Text>
          </View>
          <Switch value={false} trackColor={{ false: '#ddd', true: '#111' }} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Blocked Users</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.logout}
        onPress={() => navigation.replace('Onboarding')}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
  },
  back: {
    fontSize: 24,
    color: '#111',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
    letterSpacing: 1,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#111',
  },
  settingDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#111',
  },
  logout: {
    marginTop: 40,
    marginHorizontal: 20,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#999',
  },
});
