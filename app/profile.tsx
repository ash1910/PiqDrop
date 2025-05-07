import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Modal, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar, TextInput } from 'react-native';
import { router } from 'expo-router';
import CountryPicker, { Country, getCallingCode } from 'react-native-country-picker-modal';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { LeftArrowIcon } from '@/components/icons/LeftArrowIcon';
import { UserRoundedIcon } from '@/components/icons/UserRoundedIcon';
import { RightArrowIcon } from '@/components/icons/RightArrowIcon';
import { LetterIcon } from '@/components/icons/LetterIcon';
import { ComplexGearIcon } from '@/components/icons/ComplexGearIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { SelectDownArrowIcon } from '@/components/icons/SelectDownArrowIcon';

const HEADER_HEIGHT = 156;
const { width, height } = Dimensions.get('window');

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

export default function ProfileScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('SE'); //sweden 
  const [callingCode, setCallingCode] = useState('46'); 
  const [country, setCountry] = useState<Country | null>(null);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [flag, setFlag] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAJxQTFRFAEBzAD90I1NjG05nAD50AD9zHVBmG09nPGFYM1tcGk5nHE5m37sO37oO5L0M4bsN3bkP3roP5L0M/80A/8wA3LkQAEBzAD90I1Nj3LgQGk5nAD50AD9zAD51I1JkGk1oAD11578L4LsO/MoC+skC4rwN4bwN5r4L/MoB+8oC470MIFFkHlBlP2JXNl1bHU9mH1BlI1FkI1Jj////hM0NagAAABJ0Uk5T/Pz9/Pz8/v7+/v7+/v7+/v7+yMbBHgAAAAFiS0dEMzfVfF4AAAAJcEhZcwAAAEgAAABIAEbJaz4AAACNSURBVDjL7dHJDoJAEEXRh+KE4tQlqC2COA/g8P8fp0AKNxXSC+OKs75JJa8AZjWmikjNmnZLAo/58zxcLPVKUoc/Cn0WrIswjLQEbdbpbrIw7jl9CQbMHW7pYzcaTyRQX5RTMpAh89D49J4djqesO19iEa7slhTzpPeHBOWi0bN68PJH+lX9wjr8b/gGzuNz038exeMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTAtMDdUMTM6MTQ6NTYrMDI6MDCyBjBrAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTEwLTA3VDEzOjE0OjU2KzAyOjAww1uI1wAAAABJRU5ErkJggg==');
  const [phone, setPhone] = useState('435436567');
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

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setCountry(country);
    setFlag(country.flag);
    console.log(country.flag);
  };

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
          <Text style={styles.pageTitle}>Profile</Text>
        </Animated.View>

        <View style={styles.form}>
          <View style={styles.profileInfoRow}>
            <TouchableOpacity style={styles.editProfile} onPress={() => router.push('/updateProfile')}>
              <EditIcon size={20} />
            </TouchableOpacity>
            <Image source={require('@/assets/images/profile_pic.jpg')} style={styles.profileImage} />
            <Text style={styles.profileName}>Amy Jackson</Text>
            <Text style={styles.profileUserName}>@Amy23</Text>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Full Name</Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row} onPress={() => router.push('/updateProfile')}>
                <View style={styles.rowLeft}>
                  <UserRoundedIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>John Doe</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Email</Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row} onPress={() => router.push('/updateProfile')}>
                <View style={styles.rowLeft}>
                  <LetterIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Md.ali453@gmail.com</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Gender</Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row} onPress={() => router.push('/updateProfile')}>
                <View style={styles.rowLeft}>
                  <ComplexGearIcon size={20} color={COLORS.text} />
                  <Text style={styles.rowLabel}>Male</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mobile</Text>
            </View>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row} onPress={() => router.push('/updateProfile')}>
                <View style={styles.rowLeft}>
                  {flag && (
                    <Image 
                      source={{ uri: flag }} 
                      style={{ width: 24, height: 16 }}
                    />
                  )}
                  <Text style={[styles.rowLabel, {marginLeft: 8}]}>+{callingCode}</Text>
                  <SelectDownArrowIcon size={16} color={COLORS.text} /> 
                  <Text style={styles.rowLabel}>{phone}</Text>
                </View>
                <RightArrowIcon size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Animated.ScrollView>
      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => router.push('/updateProfile')}
          >
            <Text style={styles.continueButtonText}>Edit Info</Text>
          </TouchableOpacity>
        </View>
      )}
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
  editProfile :{
    position: 'absolute',
    left: width/2 ,
    top: 45,
    zIndex: 1,
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
    color: COLORS.text,
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
  label: {
    marginTop: 18,
    fontFamily: 'nunito-bold',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 14,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 13,
    height: 54,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'nunito-medium',
    fontSize: 16,
    paddingVertical: 15,
    color: COLORS.text,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 22,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: COLORS.buttonText,
    fontFamily: 'nunito-bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
