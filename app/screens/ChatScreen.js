// VERBA - Chat Screen
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

// Mock messages
const initialMessages = [
  { id: 1, text: 'Hey! Nice to match with you', sender: 'them' },
  { id: 2, text: 'Hi! Your story sounded really interesting', sender: 'them' },
];

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: inputText, sender: 'me' }]);
    setInputText('');
  };

  const requestPhotoReveal = () => {
    alert('Photo reveal request sent! They will see it when they agree.');
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.message, item.sender === 'me' && styles.myMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Alex</Text>
          <Text style={styles.photoStatus}>Photos hidden</Text>
        </View>
        <TouchableOpacity onPress={requestPhotoReveal}>
          <Text style={styles.revealBtn}>Reveal</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesList}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  back: {
    fontSize: 24,
    color: '#111',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  photoStatus: {
    fontSize: 12,
    color: '#999',
  },
  revealBtn: {
    fontSize: 14,
    color: '#111',
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 16,
  },
  message: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#111',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#111',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 12,
  },
  sendBtn: {
    backgroundColor: '#111',
    borderRadius: 24,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
