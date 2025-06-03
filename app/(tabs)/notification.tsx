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
import { SuccessIcon } from '@/components/icons/SuccessIcon';
import { DotIcon } from '@/components/icons/DotIcon';
import { useTranslation } from 'react-i18next';

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

export default function NotificationScreen() {
  const { t } = useTranslation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

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
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
            <LeftArrowIcon size={44} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>{t('notification.title')}</Text>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
            <Image source={require('@/assets/icons/settings-icon.png')} style={{width: 44, height: 44}} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.form}>

          <View style={styles.notificationContainer}>
            <View style={styles.successContainer}> 
              <SuccessIcon size={40} />
              <View style={styles.successTextContainer}>
                <Text style={styles.successText}>{t('notification.newFeature.title')}</Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{t('notification.today')}</Text>
                  <DotIcon size={3} />
                  <Text style={styles.dateText}>09:24 AM</Text>
                </View>
              </View>
              <Text style={styles.newText}>{t('notification.new')}</Text>
            </View>
            <Text style={styles.successDescription}>{t('notification.newFeature.description')}</Text>
          </View>

          <View style={styles.notificationContainer}>
            <View style={styles.successContainer}> 
              <SuccessIcon size={40} />
              <View style={styles.successTextContainer}>
                <Text style={styles.successText}>{t('notification.maintenance.title')}</Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{t('notification.yesterday')}</Text>
                  <DotIcon size={3} />
                  <Text style={styles.dateText}>02:15 PM</Text>
                </View>
              </View>
            </View>
            <Text style={styles.successDescription}>{t('notification.maintenance.description')}</Text>
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
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  },
  form: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: COLORS.backgroundWrapper,
  },
  notificationContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  successTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  successText: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    lineHeight: 25,
    color: COLORS.text,
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontFamily: 'nunito-medium',
    fontSize: 12,
    letterSpacing: 0.2,
    lineHeight: 16,
    color: COLORS.subtitle,
  },
  newText: {
    fontFamily: 'nunito-semibold',
    fontSize: 10,
    letterSpacing: 0.2,
    color: COLORS.background,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 6,
  },
  successDescription: {
    fontFamily: 'nunito-medium',
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 20,
    marginTop: 12,
    color: COLORS.textSecondary,
  },

});
