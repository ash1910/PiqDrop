import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { router } from 'expo-router';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
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
import { authService } from '@/services/auth.service';

const HEADER_HEIGHT = 230;

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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const passwordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
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

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      console.log('Starting login process...');
      setIsLoading(true);
      setError(null);

      console.log('Validating email format...');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      console.log('Making login request...', { email, password: '****' });
      const response = await authService.login({ 
        email: email.trim(), 
        password,
        role: 'sender',
        remember: rememberMe
      });
      
      console.log('Login successful:', { 
        token: response.access_token ? 'exists' : 'missing',
        user: response.user ? 'exists' : 'missing'
      });

      if( response.user.is_verified == 0 ) {
        router.replace('/otpVerification', { email: response.user.email });
      }
      else if( response.user.image == null || response.user.document == null ) {
        router.replace('/uploadFile');
      }
      else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      console.error('Login error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });

      // Handle specific error cases
      if (err.code === 'ECONNABORTED') {
        setError('Connection timed out. Please check your internet connection and try again.');
      } else if (err.response?.status === 401 || err.response?.status === 422) {
        setError(err.response.data.message || 'Invalid email or password');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scrollContent}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.appName}>PiqDrop</Text>
          <Text style={styles.tagline}>Making delivery simple</Text>
        </Animated.View>

        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Access your account to continue</Text>

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <LetterIcon size={20} color={COLORS.text} />
            <TextInput 
              placeholder="Email" 
              style={styles.input} 
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              autoFocus={true}
              keyboardType="email-address"
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
              secureTextEntry={!showPassword} 
              style={styles.input} 
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather 
                name={showPassword ? "eye-off" : "eye"} 
                size={20} 
                color={COLORS.text} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Checkbox.Android
              status={rememberMe ? 'checked' : 'unchecked'}
              onPress={() => setRememberMe(!rememberMe)}
              color={COLORS.text}
            />
            <Text style={styles.rememberText}>Remember me</Text>
            <TouchableOpacity style={styles.forgotLink} onPress={() => router.push('/forgotPassword')}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.buttonText} />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socials}>
            <TouchableOpacity style={styles.socialIcon}>
              <PhoneIcon size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon} onPress={() => router.push('/accountRecovery')}>
              <FacebookIcon size={32} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <GoogleIcon size={32} />
            </TouchableOpacity>
          </View>

          <View style={styles.signUpRow}>
            <Text style={styles.signUpNoAccountText}>Don't have an account? </Text> 
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.signUpText}>Sign up</Text>
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
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#000',
    borderRadius: 24,
    height: HEADER_HEIGHT,
  },
  logo: {
    width: 70,
    height: 76,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontFamily: 'nunito-extrabold',
    color: COLORS.background,
    marginBottom: 5,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'nunito-medium',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  form: {
    flex: 1,
    paddingTop: 28,
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 40,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D1D1',
  },
  orText: {
    marginHorizontal: 15,
    color: '#444444',
    fontFamily: 'nunito-semibold',
    fontSize: 14,
  },
  socials: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: 272,
    alignSelf: 'center',
  },
  socialIcon: {
    backgroundColor: COLORS.background,
    width: 80,
    height: 52,
    padding: 0,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpNoAccountText: {
    color: COLORS.subtitle,
    fontFamily: 'nunito-semibold',
    fontSize: 14,
  },
  signUpText: {
    color: COLORS.primary,
    fontFamily: 'nunito-bold',
    fontSize: 14,
  },
  errorText: {
    color: '#FF3B30',
    fontFamily: 'nunito-medium',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
});
