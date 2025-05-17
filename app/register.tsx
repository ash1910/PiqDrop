import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, Platform, Keyboard, StatusBar } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { LetterIcon } from '@/components/icons/LetterIcon';
import { LockIcon } from '@/components/icons/LockIcon';
import { LeftArrowIcon } from '@/components/icons/LeftArrowIcon';
import { Picker } from '@react-native-picker/picker';
import { SelectArrowIcon } from '@/components/icons/SelectArrowIcon';
import { UserRoundedIcon } from '@/components/icons/UserRoundedIcon';
import { COUNTRIES } from '@/components/countries';

const HEADER_HEIGHT = 207;

const COLORS = {
  primary: '#55B086',
  background: '#FFFFFF',
  backgroundWrapper: '#F5F5F5',
  text: '#212121',
  buttonText: '#FFFFFF',
  subtitle: '#616161',
  inputBorder: '#EEEEEE',
  iconBackground: '#F0F0F0',
  facebook: '#1877F2',
  google: '#DB4437',
};

const GENDERS = [
  'Male',
  'Female',
  'Other'
];

export default function LoginScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState<'nationality' | 'gender'>('nationality');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const firstNameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const nationalityInputRef = useRef<TextInput>(null);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const openPicker = (type: 'nationality' | 'gender') => {
    setPickerType(type);
    setShowPicker(true);
  };

  const handlePickerChange = (value: string) => {
    if (pickerType === 'nationality') {
      setNationality(value);
    } else {
      setGender(value);
    }
  };

  const getPickerTitle = () => {
    return pickerType === 'nationality' ? 'Nationality' : 'Gender';
  };

  const getPickerItems = () => {
    const items = pickerType === 'nationality' ? COUNTRIES : GENDERS;
    return [
      { label: pickerType === 'nationality' ? 'Nationality' : 'Gender', value: '' },
      ...items.map(item => ({ label: item, value: item }))
    ];
  };

  const getSelectedValue = () => {
    return pickerType === 'nationality' ? nationality : gender;
  };

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
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
            <LeftArrowIcon size={44} />
          </TouchableOpacity>
          <Text style={styles.appName}>Sign up</Text>
          <Text style={styles.tagline}>Create your account to get started</Text>
        </Animated.View>

        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <View style={styles.inputContainer}>
            <UserRoundedIcon size={20} color={COLORS.text} />
            <TextInput 
              ref={firstNameInputRef}
              placeholder="Name" 
              style={styles.input} 
              value={firstName}
              onChangeText={setFirstName}
              autoComplete="name"
              autoCorrect={false}
              autoFocus={true}
              clearButtonMode="always"
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() => {
                lastNameInputRef.current?.focus();
              }}
            />
          </View>

          <Text style={styles.label}>Last Name</Text>
          <View style={styles.inputContainer}>
            <UserRoundedIcon size={20} color={COLORS.text} />
            <TextInput 
              placeholder="Name" 
              ref={lastNameInputRef}
              style={styles.input} 
              value={lastName}
              onChangeText={setLastName}
              autoComplete="name"
              clearButtonMode="always"
              keyboardType="default"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <LetterIcon size={20} color={COLORS.text} />
            <TextInput 
              placeholder="Email" 
              ref={emailInputRef}
              style={styles.input} 
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="off"
              keyboardType="email-address"
              clearButtonMode="always"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <LockIcon size={20} color={COLORS.text} />
            <TextInput 
              ref={passwordInputRef}
              placeholder="Password" 
              style={styles.input} 
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="off"
              importantForAutofill="no"
              textContentType="oneTimeCode"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmPasswordInputRef.current?.focus();
              }}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather 
                name={showPassword ? "eye-off" : "eye"} 
                size={20} 
                color={COLORS.text} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm password</Text>
          <View style={styles.inputContainer}>
            <LockIcon size={20} color={COLORS.text} />
            <TextInput 
              ref={confirmPasswordInputRef}
              placeholder="Confirm password" 
              style={styles.input} 
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoComplete="off"
              importantForAutofill="no"
              textContentType="oneTimeCode"
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Feather 
                name={showConfirmPassword ? "eye-off" : "eye"} 
                size={20} 
                color={COLORS.text} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nationality</Text>
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => openPicker('nationality')}
          >
            <Text style={[styles.input, !nationality && { color: '#999' }]}>
              {nationality || 'Nationality'}
            </Text>
            <SelectArrowIcon size={20} color={COLORS.text} />
          </TouchableOpacity>

          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => openPicker('gender')}
          >
            <Text style={[styles.input, !gender && { color: '#999' }]}>
              {gender || 'Gender'}
            </Text>
            <SelectArrowIcon size={20} color={COLORS.text} />
          </TouchableOpacity>

          <Modal
            visible={showPicker}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text style={styles.cancelButton}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{getPickerTitle()}</Text>
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text style={styles.doneButton}>Done</Text>
                  </TouchableOpacity>
                </View>
                <Picker
                  selectedValue={getSelectedValue()}
                  onValueChange={handlePickerChange}
                  style={styles.modalPicker}
                >
                  {getPickerItems().map((item) => (
                    <Picker.Item key={item.label} label={item.label} value={item.value} />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>
        </View>
        {isKeyboardVisible && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/otpVerification')}>
              <Text style={styles.loginText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.ScrollView>
      {!isKeyboardVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/otpVerification')}>
            <Text style={styles.loginText}>Sign up</Text>
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
    paddingTop: 47,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: HEADER_HEIGHT,
  },
  leftArrow: {
    width: 44,
    height: 44,
    marginBottom: 27,
  },
  appName: {
    fontSize: 28,
    fontFamily: 'nunito-extrabold',
    color: COLORS.background,
    letterSpacing: 0.2,
    marginBottom: 10,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'nunito-medium',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  form: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 46,
    paddingHorizontal: 16,
    backgroundColor: COLORS.backgroundWrapper,
  },
  title: {
    fontSize: 24,
    fontFamily: 'nunito-extrabold',
    letterSpacing: 0.2,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'nunito-medium',
    color: COLORS.subtitle,
    letterSpacing: 0.2,
    marginBottom: 14,
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
    marginTop: 14,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 28,
  },
  rememberText: {
    fontFamily: 'nunito-semibold',
    color: COLORS.text,
    fontSize: 16,
    marginLeft: 5,
    flex: 1,
  },
  forgotLink: {
    marginLeft: 'auto',
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'nunito-bold',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 54,
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: COLORS.buttonText,
    fontFamily: 'nunito-bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  picker: {
    flex: 1,
    fontFamily: 'nunito-medium',
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: 'transparent',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
  },
  cancelButton: {
    color: COLORS.subtitle,
    fontSize: 16,
    fontFamily: 'nunito-medium',
  },
  doneButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'nunito-bold',
  },
  modalPicker: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'nunito-bold',
    color: COLORS.text,
  },
});
