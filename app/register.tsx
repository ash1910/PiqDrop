import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
import { PhoneIcon } from '@/components/icons/PhoneIcon';
import { FacebookIcon } from '@/components/icons/FacebookIcon';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { LeftArrowIcon } from '@/components/icons/LeftArrowIcon';
import { UserRoundedIcon } from '@/components/icons/UserRoundedIcon';
import { Picker } from '@react-native-picker/picker';

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

export default function LoginScreen() {
  const [rememberMe, setRememberMe] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [nationality, setNationality] = React.useState('');
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
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
            <TextInput placeholder="Name" style={styles.input} />
          </View>

          <Text style={styles.label}>Last Name</Text>
          <View style={styles.inputContainer}>
            <UserRoundedIcon size={20} color={COLORS.text} />
            <TextInput placeholder="Name" style={styles.input} />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <LetterIcon size={20} color={COLORS.text} />
            <TextInput placeholder="Email" style={styles.input} />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <LockIcon size={20} color={COLORS.text} />
            <TextInput 
              placeholder="Password" 
              secureTextEntry={!showPassword} 
              style={styles.input} 
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
              placeholder="Confirm password" 
              secureTextEntry={!showConfirmPassword} 
              style={styles.input} 
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
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={nationality}
              onValueChange={(itemValue) => setNationality(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Nationality" value="" />
              <Picker.Item label="United States" value="US" />
              <Picker.Item label="United Kingdom" value="UK" />
              <Picker.Item label="Canada" value="CA" />
              <Picker.Item label="Australia" value="AU" />
              <Picker.Item label="Germany" value="DE" />
              <Picker.Item label="France" value="FR" />
              <Picker.Item label="Japan" value="JP" />
              <Picker.Item label="China" value="CN" />
              <Picker.Item label="India" value="IN" />
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginText}>Sign up</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Animated.ScrollView>
    </View>
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
    paddingBottom: 22,
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
    padding: 15,
    alignItems: 'center',
    marginTop: 14,
    height: 54,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'nunito-medium',
    fontSize: 16,
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
    marginTop: 24,
  },
});
