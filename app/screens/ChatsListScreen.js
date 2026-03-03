import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

const initialChats = [
  { id: '1', name: 'Sarah', age: 28, lastMessage: "I've always been drawn to places with meaning...", time: '2m ago', unread: true },
  { id: '2', name: 'James', age: 31, lastMessage: "That sounds amazing!", time: '1h ago', unread: false },
  { id: '3', name: 'Elena', age: 26, lastMessage: "Would love to chat more!", time: '3h ago', unread: false },
]

export default function ChatsListScreen({ onOpenChat, onOpenDiscover, onOpenSettings, onOpenThoughts, hasUnread = false }) {
  const [chats] = useState(initialChats)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CHATS</Text>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem} onPress={() => onOpenChat(item)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}, {item.age}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <Text style={[styles.chatPreview, item.unread && styles.chatPreviewUnread]} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            {item.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onOpenDiscover}>
          <View style={styles.navIcon}><Text style={styles.navIconText}>V</Text></View>
          <Text style={styles.navLabel}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={onOpenThoughts}>
          <View style={styles.navIcon}><Text style={styles.navIconText}>T</Text></View>
          <Text style={styles.navLabel}>Thoughts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}>
            <Text style={styles.navIconTextActive}>C</Text>
            {hasUnread && <View style={styles.badge} />}
          </View>
          <Text style={styles.navLabelActive}>Chats</Text>
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
  list: { paddingBottom: 100 },
  chatItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontFamily: 'Space Mono', fontSize: 18, fontWeight: 'bold', color: '#fff' },
  chatInfo: { flex: 1, marginLeft: 12 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  chatName: { fontSize: 16, fontWeight: '600' },
  chatTime: { fontFamily: 'Space Mono', fontSize: 10, color: '#999' },
  chatPreview: { fontFamily: 'Cormorant Garamond', fontSize: 14, color: '#666', fontStyle: 'italic' },
  chatPreviewUnread: { color: '#1a1a1a', fontWeight: '500' },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1a1a1a' },
  badge: { position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff4444', borderWidth: 2, borderColor: '#fff' },
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
