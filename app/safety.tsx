import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { LeftArrowIcon } from '@/components/icons/LeftArrowIcon';
import { SuccessIcon } from '@/components/icons/SuccessIcon';
import { DotIcon } from '@/components/icons/DotIcon';

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

const TABS = ['Guide', 'Tools'];
const screenWidth = Dimensions.get('window').width;
const TAB_WIDTH = (screenWidth - 32 - 8) / TABS.length;

export default function SafetyScreen() {
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
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
            <LeftArrowIcon size={44} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Safety Center</Text>
        </Animated.View>

        <View style={styles.form}>

          <View style={styles.senderProfileContainer}> 
            <View style={styles.senderProfileImageContainer}>
              <Image source={require('@/assets/img/profile-blank.png')} style={styles.senderProfileImage} />
            </View>
            <View style={styles.senderProfileTextContainer}> 
              <Text style={styles.title}>Hi John Doe</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Here's what you need to know about safety</Text>

          <View style={styles.tabContainer}>
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
              <>
                <View style={styles.notificationContainer}>
                  <View style={styles.successContainer}> 
                    <Image source={require('@/assets/icons/check_id.png')} style={styles.successImage} />
                    <View style={styles.successTextContainer}>
                      <Text style={styles.successText}>Check ID</Text>
                      <Text style={styles.successDescription}>Check the ID card or passport of the dropper before giving them your items, make sure it matches with the profile on the platform.</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.notificationContainer}>
                  <View style={styles.successContainer}> 
                    <Image source={require('@/assets/icons/carefull.png')} style={styles.successImage} />
                    <View style={styles.successTextContainer}>
                      <Text style={styles.successText}>Careful</Text>
                      <Text style={styles.successDescription}>Take a selfie with your dropper if possible. it's easier to identify your dropper if anything should happen, however, don't post the picture or use it for any other purpose without the permission of the dropper, After your items have been dropped you are obligated to delete the photo, failure to do so might have consequences.</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.notificationContainer}>
                  <View style={styles.successContainer}> 
                    <Image source={require('@/assets/icons/scammers.png')} style={styles.successImage} />
                    <View style={styles.successTextContainer}>
                      <Text style={styles.successText}>Scammers</Text>
                      <Text style={styles.successDescription}>scammers are upping their game, we will never call you out of the blue to ask for you card PIN, bank details, full password, account secure access code the ccv (3 digits) on the back of your card, account (Micr) number and personal information. Be vigilant!</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.notificationContainer}>
                  <View style={styles.successContainer}> 
                    <Image source={require('@/assets/icons/payment.png')} style={styles.successImage} />
                    <View style={styles.successTextContainer}>
                      <Text style={styles.successText}>Payment</Text>
                      <Text style={styles.successDescription}>Never pay offline or move money to another account. Our payment system is built to protect our users. </Text>
                    </View>
                  </View>
                </View>
              </>
              )}
              {activeTab === 1 && (
              <>
                <View style={styles.notificationContainer}>
                  <View style={styles.successContainer}> 
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1067/1067575.png' }} 
                      style={styles.successImage} 
                    />
                    <View style={styles.successTextContainer}>
                      <Text style={styles.successText}>Emergency Contacts</Text>
                      <Text style={styles.successDescription}>Save these emergency numbers: Local Police (911), PiqDrop Support (1-800-PIQDROP), and your local emergency services.</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.notificationContainer}>
                  <View style={styles.successContainer}> 
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/854/854878.png' }} 
                      style={styles.successImage} 
                    />
                    <View style={styles.successTextContainer}>
                      <Text style={styles.successText}>Location Sharing</Text>
                      <Text style={styles.successDescription}>Share your live location with trusted contacts during drops. Enable location sharing in your device settings for added safety.</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.notificationContainer}>
                  <View style={styles.successContainer}> 
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png' }} 
                      style={styles.successImage} 
                    />
                    <View style={styles.successTextContainer}>
                      <Text style={styles.successText}>Verification Checklist</Text>
                      <Text style={styles.successDescription}>Use our verification checklist before each drop: ID verification, profile match, payment confirmation, and drop location safety check.</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.notificationContainer}>
                  <View style={styles.successContainer}> 
                    <Image 
                      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png' }} 
                      style={styles.successImage} 
                    />
                    <View style={styles.successTextContainer}>
                      <Text style={styles.successText}>Report Issues</Text>
                      <Text style={styles.successDescription}>Report any safety concerns or suspicious activity immediately through the app. Our safety team is available 24/7 to assist you.</Text>
                    </View>
                  </View>
                </View>
              </>
              )}
            </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
  },
  leftArrow: {
    width: 44,
    height: 44,
    position: 'absolute',
    left: 16,
    top: 52,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    color: COLORS.background,
    letterSpacing: 0.2,
    lineHeight: 44,
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
    marginBottom: 6,
  },
  successDescription: {
    fontFamily: 'nunito-medium',
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 20,
    color: '#919191',
  },
  senderProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },
  senderProfileImageContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  senderProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  senderProfileTextContainer: {
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontFamily: 'nunito-bold',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'nunito-medium',
    letterSpacing: 0.2,
    color: COLORS.text,
    marginBottom: 20,
    lineHeight: 24,
  },
  tabContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 0,
    paddingHorizontal: 0,
    backgroundColor: COLORS.backgroundWrapper,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    padding: 4,
  },
  animatedIndicator: {
    position: 'absolute',
    height: '100%',
    width: TAB_WIDTH,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    zIndex: 0,
    top: 4,
    left: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    paddingVertical: 12,
  },
  tabText: {
    color: COLORS.text,
    fontFamily: 'nunito-bold',
    fontSize: 14, 
    letterSpacing: -0.2,
    lineHeight: 16,
  },
  activeTabText: {
    color: COLORS.background,
  },
  contentContainer: {
    marginTop: 24,
    flex: 1,
  },
  successImage: {
    width: 56,
    height: 56,
  },

});
