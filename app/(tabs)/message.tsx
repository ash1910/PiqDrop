import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar, RefreshControl, Linking } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { LeftArrowIcon } from '@/components/icons/LeftArrowIcon';
import { SentBtnIcon } from '@/components/icons/SentBtnIcon';
import { CallIcon } from '@/components/icons/CallIcon';
import { CameraIcon } from '@/components/icons/CameraIcon';
import { MicrophoneIcon } from '@/components/icons/MicrophoneIcon';
import api from '@/services/api';
import { useTranslation } from 'react-i18next';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
  updated_at: string;
}

const HEADER_HEIGHT = 80;

const COLORS = {
  primary: '#55B086',
  background: '#FFFFFF',
  backgroundWrapper: '#F5F5F5',
  text: '#212121',
  textSecondary: '#424242',
  buttonText: '#FFFFFF',
  subtitle: '#616161',
};

export default function MessageScreen() {
  const { t } = useTranslation();
  const { userId = '1', userName = 'Support Service', userImage = '', userMobile = '' } = useLocalSearchParams();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottomPosition = useSharedValue(86);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMessages();
    }, [userId])
  );

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/messages/${userId}`);
      if (response.data.status === 'success') {
        let fetchedMessages = response.data.messages;
        
        // Add support messages at the beginning if userId is 1
        if (userId === '1') {
          const supportMessages = [
            {
              id: -1, // Using negative IDs to avoid conflicts with real messages
              sender_id: 1,
              receiver_id: 1,
              message: t('supportService.customerService.greeting'),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: -2,
              sender_id: 1,
              receiver_id: 1,
              message: t('supportService.customerService.intro'),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ];
          fetchedMessages = [...supportMessages, ...fetchedMessages];
        }
        
        setMessages(fetchedMessages);
        // Scroll to bottom after messages are loaded
        setTimeout(() => {
          scrollRef.current?.scrollToEnd({ animated: false });
        }, 100);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add effect to scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        bottomPosition.value = withTiming(0, { duration: 250 });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        bottomPosition.value = withTiming(86, { duration: 250 });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const inputBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: bottomPosition.value,
    };
  });

  const handleSendMessage = async () => {
    if (input.trim()) {
      try {
        const response = await api.post('/messages', {
          receiver_id: userId,
          message: input.trim()
        });

        if (response.data.status === 'success') {
          setMessages(prevMessages => [...prevMessages, response.data.message]);
          setInput('');
          
          // Scroll to bottom after sending message
          setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <Animated.View style={[styles.header]}>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
            <LeftArrowIcon size={44} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>{userName}</Text>
          {userMobile && (
            <TouchableOpacity style={styles.callIcon} onPress={() => Linking.openURL(`tel:${userMobile}`)}>
              <CallIcon size={44} />
            </TouchableOpacity>
          )}
        </Animated.View>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: isKeyboardVisible ? 0 : 86 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={COLORS.primary}
            onRefresh={fetchMessages}
            refreshing={false}
          />
        }
        >
        <View style={styles.contentContainer}>
          {/* Date Separator */}
          <View style={styles.dateSeparatorWrapper}>
            <View style={styles.dateSeparatorLine} />
            <Text style={styles.dateSeparatorText}>Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <View style={styles.dateSeparatorLine} />
          </View>
          {/* Messages */}
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={msg.sender_id === parseInt(userId as string) ? styles.receivedMsgWrapper : styles.sentMsgWrapper}
            >
              {msg.sender_id === parseInt(userId as string) && (
                <>
                {msg.sender_id === 1 ? (
                  <Image source={require('@/assets/icons/robot.png')} style={styles.avatar} />
                ) : userImage ? (
                  <Image source={{ uri: `${(api.defaults.baseURL || '').replace('/api', '')}/${userImage}` }} style={styles.avatar} />
                ) : (
                  <Image source={require('@/assets/img/profile-blank.png')} style={styles.avatar} />
                )}
                </>
              )}
              <View style={msg.sender_id === parseInt(userId as string) ? styles.receivedBubble : styles.sentBubble}>
                <Text style={msg.sender_id === parseInt(userId as string) ? styles.receivedText : styles.sentText}>{msg.message}</Text>
                <Text style={msg.sender_id === parseInt(userId as string) ? styles.receivedTimestamp : styles.sentTimestamp}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
        {/* Message Input Bar */}
        <Animated.View style={[styles.inputBarWrapper, inputBarAnimatedStyle]}>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={input}
              onChangeText={setInput}
            />
            {/* <TouchableOpacity>
              <MicrophoneIcon size={20}  />
            </TouchableOpacity>
            <TouchableOpacity>
              <CameraIcon size={20} />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
            <SentBtnIcon size={44} />
          </TouchableOpacity>
        </Animated.View>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  leftArrow: {
    width: 44,
    height: 44,
  },
  callIcon: {
    width: 44,
    height: 44,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    color: COLORS.background,
    letterSpacing: 0.2,
    lineHeight: 25,
    flex: 1,
    marginLeft: 14,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: COLORS.backgroundWrapper,
  },
  dateSeparatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  dateSeparatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DADADA',
    marginHorizontal: 8,
  },
  dateSeparatorText: {
    color: '#919191',
    fontSize: 12,
    fontFamily: 'nunito-semibold',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  sentMsgWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  receivedMsgWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  sentBubble: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  receivedBubble: {
    backgroundColor: COLORS.background,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sentText: {
    color: COLORS.background,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontFamily: 'nunito-semibold',
    marginBottom: 8,
    textAlign: 'right',
  },
  receivedText: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontFamily: 'nunito-semibold',
    marginBottom: 8,
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.2,
    fontFamily: 'nunito-medium',
    alignSelf: 'flex-start',
  },
  receivedTimestamp: {
    color: '#919191',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.2,
    fontFamily: 'nunito-medium',
    alignSelf: 'flex-end',
  },
  inputBarWrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 14,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    gap: 10,
    flex: 1,
  },
  input: {
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'nunito-medium',
    height: 44,
    flex: 1,
  },
  sendBtn: {

  },
});
