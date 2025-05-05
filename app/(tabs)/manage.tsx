import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BellIcon } from '@/components/icons/BellIcon';
import { SocialShareIcon } from '@/components/icons/SocialShareIcon';

const HEADER_HEIGHT = 120;

const TABS = ['On going', 'Accepted', 'Completed', 'Canceled'];
const screenWidth = Dimensions.get('window').width;
const TAB_WIDTH = screenWidth / TABS.length;

const COLORS = {
  primary: '#55B086',
  background: '#FFFFFF',
  backgroundWrapper: '#F5F5F5',
  text: '#212121',
  textSecondary: '#424242',
  buttonText: '#FFFFFF',
  subtitle: '#616161',
};

export default function ManageScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);

  const handlePress = (index) => {
    setActiveTab(index);
    translateX.value = withTiming(index * TAB_WIDTH, { duration: 200 });
  };

  const animatedTabStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

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
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.pageTitle}>My Orders</Text>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.push('/(tabs)/notification')}>
            <BellIcon size={44} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
            <SocialShareIcon size={44} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.container}>
          {/* Tab Bar */}
          <View style={styles.tabBar}>
            <Animated.View style={[styles.animatedIndicator, animatedTabStyle]} />
            {TABS.map((label, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(index)}
                style={styles.tabButton}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.contentContainer}>
            {activeTab === 0 && (
              <Text style={styles.message}>You don’t have an order yet</Text>
            )}
            {activeTab === 1 && (
              <Text style={styles.message}>No accepted orders</Text>
            )}
            {activeTab === 2 && (
              <Text style={styles.message}>Completed orders will show here</Text>
            )}
            {activeTab === 3 && (
              <Text style={styles.message}>Canceled orders list empty</Text>
            )}
          </View>
        </View>
      </Animated.ScrollView>
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
    paddingBottom: 86,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    gap: 16,
  },
  leftArrow: {
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
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: COLORS.backgroundWrapper,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  animatedIndicator: {
    position: 'absolute',
    height: '100%',
    width: TAB_WIDTH,
    backgroundColor: '#55B281', // Green pill
    borderRadius: 25,
    zIndex: 0,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  tabText: {
    color: '#333',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
  },

});
