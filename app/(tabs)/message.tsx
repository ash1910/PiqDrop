import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar } from 'react-native';
import { router } from 'expo-router';
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

const HEADER_HEIGHT = 120;

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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
      timestamp: '2025-01-02T10:00:00',
      sentByMe: true,
      avatar: require('@/assets/images/profile_pic_1.jpg'),
    },
    {
      id: '2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
      timestamp: '2025-01-02T10:01:00',
      sentByMe: false,
      avatar: require('@/assets/images/profile_pic.jpg'),
    },
    {
      id: '3',
      text: 'Lorem ipsum dolor sit amet, consectetur',
      timestamp: '2025-01-02T10:00:00',
      sentByMe: true,
      avatar: require('@/assets/images/profile_pic.jpg'),
    },
    {
      id: '4',
      text: 'Lorem ipsum dolor sit amet, consectetur',
      timestamp: '2025-01-02T10:01:00',
      sentByMe: false,
      avatar: require('@/assets/images/profile_pic.jpg'),
    },
    {
      id: '5',
      text: 'Lorem ipsum',
      timestamp: '2025-01-02T10:01:00',
      sentByMe: false,
      avatar: require('@/assets/images/profile_pic.jpg'),
    },
  ]);
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

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: input.trim(),
        timestamp: new Date().toISOString(),
        sentByMe: true,
        avatar: require('@/assets/images/profile_pic_1.jpg'),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: isKeyboardVisible ? 0 : 86 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
            <LeftArrowIcon size={44} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Mr. Smith</Text>
          <TouchableOpacity style={styles.callIcon} onPress={() => router.push('/(tabs)/calling')}>
            <CallIcon size={44} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.contentContainer}>
          {/* Date Separator */}
          <View style={styles.dateSeparatorWrapper}>
            <View style={styles.dateSeparatorLine} />
            <Text style={styles.dateSeparatorText}>Today, 20:08 pm</Text>
            <View style={styles.dateSeparatorLine} />
          </View>
          {/* Messages */}
          {messages.map((msg, idx) => (
            <View
              key={msg.id}
              style={msg.sentByMe ? styles.sentMsgWrapper : styles.receivedMsgWrapper}
            >
              {!msg.sentByMe && (
                <Image source={msg.avatar} style={styles.avatar} />
              )}
              <View style={msg.sentByMe ? styles.sentBubble : styles.receivedBubble}>
                <Text style={msg.sentByMe ? styles.sentText : styles.receivedText}>{msg.text}</Text>
                <Text style={msg.sentByMe ? styles.sentTimestamp : styles.receivedTimestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} am • {new Date(msg.timestamp).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
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
            <TouchableOpacity>
              <MicrophoneIcon size={20}  />
            </TouchableOpacity>
            <TouchableOpacity>
              <CameraIcon size={20} />
            </TouchableOpacity>
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
