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
import Icon from 'react-native-vector-icons/Feather'; // or any icon library
import { UserRoundedIcon } from '@/components/icons/UserRoundedIcon';
import { RightArrowIcon } from '@/components/icons/RightArrowIcon';
import { LetterIcon } from '@/components/icons/LetterIcon';
import { SafetyIcon } from '@/components/icons/SafetyIcon';
import { WalletIcon } from '@/components/icons/WalletIcon';
import { PlaceIcon } from '@/components/icons/PlaceIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { FileIcon } from '@/components/icons/FileIcon';
import { ShieldKeyholeIcon } from '@/components/icons/ShieldKeyholeIcon';
import { BugIcon } from '@/components/icons/BugIcon';
import { FrameIcon } from '@/components/icons/FrameIcon';
import { HeadphonesRoundIcon } from '@/components/icons/HeadphonesRoundIcon';
import { ShareIcon } from '@/components/icons/ShareIcon';
import { TrashBinMinimalistic2Icon } from '@/components/icons/TrashBinMinimalistic2Icon';

const HEADER_HEIGHT = 156;

const COLORS = {
  primary: '#55B086',
  background: '#FFFFFF',
  backgroundWrapper: '#F5F5F5',
  text: '#212121',
  textSecondary: '#424242',
  buttonText: '#FFFFFF',
  subtitle: '#616161',
  divider: '#D9DFD9',
};

export default function AccountScreen() {
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
          <Text style={styles.pageTitle}>Account</Text>
        </Animated.View>

        <View style={styles.form}>
          <View style={styles.profileInfoRow}>
            <Image source={require('@/assets/images/profile_pic.jpg')} style={styles.profileImage} />
            <Text style={styles.profileName}>Amy Jackson</Text>
            <Text style={styles.profileUserName}>@Amy23</Text>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>General</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row} onPress={() => router.push('/profile')}>
                <View style={styles.rowLeft}>
                  <UserRoundedIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Personal Info</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row} onPress={() => router.push('/safety')}>
                <View style={styles.rowLeft}>
                  <SafetyIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Safety</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <LetterIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Language</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Billing and Places</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <WalletIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Payment</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <PlaceIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Saved Places</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <PlusIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Add a Place</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Legal</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <FileIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Terms of Use</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <ShieldKeyholeIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Privacy Policy</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Personal</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row} onPress={() => router.push('/report')}>
                <View style={styles.rowLeft}>
                  <BugIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Report a Bug</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <FrameIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Logout</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Social</Text>
              <View style={styles.sectionLine} />
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row} onPress={() => router.push('/faq')}>
                <View style={styles.rowLeft}>
                  <HeadphonesRoundIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Support</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <ShareIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Share app</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.innerContainer, {paddingTop: 8}]}>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLeft}>
                  <TrashBinMinimalistic2Icon size={20} color={'#FF4949'} />
                  <Text style={[styles.rowLabel, {color: '#FF4949'}]}>Delete Account</Text>
                </View>
                <RightArrowIcon size={20} color={'#FF4949'} />
              </TouchableOpacity>
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
    paddingBottom: 86,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 60,
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
  profileInfoRow: {
    flexDirection: 'column', 
    alignItems: 'center',
    marginBottom: 32,
    marginTop: -59,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 8,
  },
  profileName: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  profileUserName: {
    fontFamily: 'nunito-semibold',
    fontSize: 14,
    letterSpacing: 0.2,
    color: COLORS.subtitle,
  },
  innerContainer: {
    paddingTop: 0,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    letterSpacing: 0.2,
    color: COLORS.subtitle,
    marginRight: 12,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    paddingVertical: 0,
    overflow: 'hidden',
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 19,
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'nunito-semibold',
    letterSpacing: 0.2,
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 14,
  },

});
