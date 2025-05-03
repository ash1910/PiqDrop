import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, StatusBar,KeyboardAvoidingView, Platform, Modal, FlatList } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import { router } from 'expo-router';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { BellIcon } from '@/components/icons/BellIcon';
import { UserRoundedIcon } from '@/components/icons/UserRoundedIcon';
import CountryPicker, { Country, getCallingCode } from 'react-native-country-picker-modal';
import { SelectDownArrowIcon } from '@/components/icons/SelectDownArrowIcon';
import { WeightIcon } from '@/components/icons/WeightIcon';
import { MoneyIcon } from '@/components/icons/MoneyIcon';
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
  const [showPassword, setShowPassword] = React.useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('DE');
  const [callingCode, setCallingCode] = useState('49');
  const [country, setCountry] = useState<Country | null>(null);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [phone, setPhone] = useState('435436567');
  const [name, setName] = useState('John Doe');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setCountry(country);
  };

  React.useEffect(() => {
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

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
        <Animated.View style={[styles.header]}>
          <View style={styles.headerTopContent}>
            <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
            <Text style={styles.appName}>Welcome to PiqDrop.{'\n'}We value you.</Text>
            <TouchableOpacity style={styles.bellIcon} onPress={() => router.back()}>
              <BellIcon size={44} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Send package</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.form}>
          <View style={styles.senderProfileContainer}> 
            <View style={styles.senderProfileImageContainer}>
              <Image source={require('@/assets/img/profile-blank.png')} style={styles.senderProfileImage} />
            </View>
            <View style={styles.senderProfileTextContainer}> 
              <Text style={styles.title}>John Doe</Text>
              <Text style={styles.subtitle}>sender</Text>
            </View>
          </View>
          

          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <UserRoundedIcon size={20} color={COLORS.text} />
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          </View>

          <Text style={styles.label}>Number</Text>
          <View style={styles.inputContainer}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCallingCode
              withAlphaFilter
              withCallingCodeButton
              withModal
              visible={modalVisible}
              onSelect={onSelect}
            />
            <SelectDownArrowIcon size={16} color={COLORS.text} /> 
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        
          <View style={styles.rowContainer}>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Weight</Text>
              <View style={styles.inputContainer}>
                <WeightIcon size={20} color={COLORS.text} /> 
                <TextInput placeholder="Weight" value={weight} onChangeText={setWeight} style={styles.input} keyboardType="numeric" />
              </View>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Price</Text>
              <View style={styles.inputContainer}>
                <MoneyIcon size={20} color={COLORS.text} />
                <TextInput placeholder="Price" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
              </View>
            </View>
          </View>

          <TouchableOpacity style={[styles.loginButton, {marginTop: 35, marginBottom: 27}]} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.loginText}>Post job</Text>
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
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderRadius: 24,
    height: HEADER_HEIGHT,
  },
  headerTopContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
  },
  logo: {
    width: 38,
    height: 41,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 14,
    fontFamily: 'nunito-bold',
    color: COLORS.background,
    letterSpacing: 0.2,
    lineHeight: 20,
    flex: 1,
    marginLeft: 12,
  },
  bellIcon: {
    marginLeft: 12,
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'nunito-medium',
    fontSize: 14,
    letterSpacing: 0.2,
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
  form: {
    flex: 1,
    paddingTop: 28,
    paddingBottom: 22,
    paddingHorizontal: 16,
    backgroundColor: COLORS.backgroundWrapper,
  },
  title: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'nunito-medium',
    color: COLORS.subtitle,
    letterSpacing: 0.2,
    marginBottom: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 18,
  },
  rowItem: {
    flex: 1,
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
    color: COLORS.text,
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
});
