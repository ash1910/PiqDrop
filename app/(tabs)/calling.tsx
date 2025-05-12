import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { LeftArrowIcon } from '@/components/icons/LeftArrowIcon';
import { CallingIcon } from '@/components/icons/CallingIcon';
import { CancelCallIcon } from '@/components/icons/CancelCallIcon';

const COLORS = {
  primary: '#55B086',
  background: '#FFFFFF',
  backgroundWrapper: '#F5F5F5',
  text: '#212121',
  buttonText: '#FFFFFF',
  subtitle: '#616161',
  inputBorder: '#EEEEEE',
  iconBackground: '#F0F0F0',
};

export default function SuccessScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

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
        <Animated.View style={styles.header}>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.push('/(tabs)/message')}>
            <LeftArrowIcon size={44} color={"#212121"} />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.form}>
          <Text style={styles.appName}>Incoming call</Text>
          <Image source={require('@/assets/images/profile_pic_2.jpg')} style={styles.logo} />
          <Text style={styles.appName}>Mr. Smith</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => alert('Calling...')}
          >
            <CallingIcon />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => router.push('/(tabs)/message')}
          >
            <CancelCallIcon />
          </TouchableOpacity>
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
    paddingBottom: 0,
  },
  header: {
    paddingTop: 52,
    paddingHorizontal: 16,
    backgroundColor: COLORS.backgroundWrapper,
  },
  leftArrow: {
    width: 44,
    height: 44,
  },
  appName: {
    fontSize: 28,
    fontFamily: 'nunito-extrabold',
    color: COLORS.text,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 90,
  },
  form: {
    flex: 1,
    backgroundColor: COLORS.backgroundWrapper,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  buttonContainer: {
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
    marginBottom: 86,
    paddingVertical: 22,
  },
  continueButton: {
    width: 61,
    height: 61,
  },
});
