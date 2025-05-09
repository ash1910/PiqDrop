import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { LeftArrowIcon } from '@/components/icons/LeftArrowIcon';

const initialMessages = [
  {
    id: '1',
    text: 'Hello, Good morning',
    sender: 'support',
    time: '10:08 am',
    date: 'Jan 02, 2025',
  },
  {
    id: '2',
    text: `i'am a Customer service, is there a problem? so i can help you solve it.`,
    sender: 'support',
    time: '10:01 am',
    date: 'Jan 02, 2025',
  },
  {
    id: '3',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    sender: 'user',
    time: '10:00 am',
    date: 'Jan 02, 2025',
  },
  {
    id: '4',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    sender: 'support',
    time: '10:01 am',
    date: 'Jan 02, 2025',
  },
  {
    id: '5',
    text: 'Lorem ipsum dolor sit amet, consectetur',
    sender: 'user',
    time: '10:00 am',
    date: 'Jan 02, 2025',
  },
];

export default function SupportService() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    setMessages([
      ...messages,
      {
        id: (messages.length + 1).toString(),
        text: input,
        sender: 'user',
        time,
        date,
      },
    ]);
    setInput('');
  };

  const renderMessage = ({ item }: any) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.supportMessage]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.supportText]}>{item.text}</Text>
        <Text style={styles.messageMeta}>{`${item.date} • ${item.time}`}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <LeftArrowIcon size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support Service</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatArea}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingTop: Platform.OS === 'ios' ? 56 : 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  chatArea: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    maxWidth: '80%',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#4CB686',
    alignSelf: 'flex-end',
  },
  supportMessage: {
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  userText: {
    color: '#fff',
  },
  supportText: {
    color: '#222',
  },
  messageMeta: {
    fontSize: 12,
    color: '#BDBDBD',
    alignSelf: 'flex-end',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#4CB686',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 