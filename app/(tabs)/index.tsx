import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, StatusBar,KeyboardAvoidingView, Platform, Modal, FlatList, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { router } from 'expo-router';
import CountryPicker, { Country, getCallingCode } from 'react-native-country-picker-modal';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';

import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { BellIcon } from '@/components/icons/BellIcon';
import { UserRoundedIcon } from '@/components/icons/UserRoundedIcon';
import { SelectDownArrowIcon } from '@/components/icons/SelectDownArrowIcon';
import { WeightIcon } from '@/components/icons/WeightIcon';
import { MoneyIcon } from '@/components/icons/MoneyIcon';
import { LocationIcon } from '@/components/icons/LocationIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { TimeIcon } from '@/components/icons/TimeIcon';
import { InfoCircleIcon } from '@/components/icons/InfoCircleIcon';
import { SquareArrowUpIcon } from '@/components/icons/SquareArrowUpIcon';
import { SquareArrowDownIcon } from '@/components/icons/SquareArrowDownIcon';

const HEADER_HEIGHT = 375;
const { width: screenWidth } = Dimensions.get('window');

const COLORS = {
  primary: '#55B086',
  background: '#FFFFFF',
  backgroundWrapper: '#F5F5F5',
  text: '#212121',
  textSecondary: '#919191',
  buttonText: '#FFFFFF',
  subtitle: '#616161',
  inputBorder: '#EEEEEE',
  iconBackground: '#F0F0F0',
  facebook: '#1877F2',
  google: '#DB4437',
};

export default function HomeScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const [countryCode, setCountryCode] = useState('DE');
  const [callingCode, setCallingCode] = useState('49');
  const [country, setCountry] = useState<Country | null>(null);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [phone, setPhone] = useState('435436567');
  const [name, setName] = useState('John Doe');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('map');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) setDate(selectedDate);
    if (Platform.OS !== 'ios') setShowDateModal(false);
  };

  const handleTimeChange = (event: any, selectedTime: any) => {
    if (selectedTime) setTime(selectedTime);
    if (Platform.OS !== 'ios') setShowTimeModal(false);
  };

  const formatDate = (d) =>
    d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const formatTime = (t) =>
    t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setCountry(country);
  };

  const [activeTab, setActiveTab] = useState('pickup');
  const translateX = useSharedValue(0);

  const switchTab = (tab) => {
    setActiveTab(tab);
    translateX.value = withTiming(tab === 'pickup' ? 0 : -screenWidth, { duration: 250 });
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);



  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setLoading(false);
    })();
  }, []);

  const handleMapPress = async (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarker(coords);

    try {
      const geocode = await Location.reverseGeocodeAsync(coords);
      if (geocode.length > 0) {
        const place = geocode[0];
        const parts = [
          place.name,
          place.street,
          place.city,
          place.region,
          place.postalCode,
          place.country
        ];
        // Filter out null/undefined/empty strings and duplicates
        const uniqueParts = Array.from(new Set(parts.filter(Boolean)));
        const address = uniqueParts.join(', ');        
        setLocation(address);
      } else {
        setLocation(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
      }
      setModalVisible(false);
    } catch (err) {
      console.warn('Reverse geocoding error:', err);
      setLocation(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
      setModalVisible(false);
    }
  };


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
          {/* Toggle Buttons */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'pickup' && styles.activeButton]}
              onPress={() => switchTab('pickup')}
            >
              <SquareArrowUpIcon size={20} color={COLORS.background} />
              <Text style={styles.tabText}>
                Pick-up details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'dropoff' && styles.activeButton]}
              onPress={() => switchTab('dropoff')}
            >
              <SquareArrowDownIcon size={20} color={COLORS.background} />
              <Text style={styles.tabText}>
                Drop-off details
              </Text>
            </TouchableOpacity>
          </View>
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
              countryCode={countryCode as Country["cca2"]}
              withFilter
              withFlag
              withCallingCode
              withAlphaFilter
              withCallingCodeButton
              withModal
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

          <Text style={styles.label}>Location</Text>
          <View style={styles.inputContainer}>
            <LocationIcon size={20} color={COLORS.text} /> 
            <TextInput placeholder="Location" value={location} onChangeText={setLocation} onFocus={() => setModalVisible(true)} style={styles.input} />

            <Modal visible={modalVisible} animationType="slide">
              <View style={{ flex: 1 }}>
                {/* Map View */}
                {mode === 'map' && (
                  <>
                    {region && (
                      <>
                      <MapView
                        style={{ flex: 1 }}
                        initialRegion={region}
                        onPress={handleMapPress}
                      >
                        {marker && <Marker coordinate={marker} />}
                      </MapView>
                      <Text style={styles.mapHint}>Tap on the map to select location</Text>
                      </>
                    )}
                  </>
                )}

                {/* Manual Entry */}
                {mode === 'manual' && (
                  <View style={styles.manualContainer}>
                    <TextInput
                      placeholder="Type address here"
                      value={location}
                      onChangeText={setLocation}
                      style={styles.manualInput}
                      multiline
                    />
                  </View>
                )}
                {/* Mode switch buttons */}
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[styles.toggleButton, mode === 'map' && styles.activeToggle]}
                    onPress={() => setMode('map')}
                  >
                    <Text style={styles.toggleText}>Pick from Map</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleButton, mode === 'manual' && styles.activeToggle]}
                    onPress={() => setMode('manual')}
                  >
                    <Text style={styles.toggleText}>Enter Manually</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                  <Button title="Use This Address" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
          </View>

          <Text style={styles.label}>More details</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Write here..." value={details} onChangeText={setDetails} style={styles.input} />
          </View>

          <Text style={styles.label}>Pickup date and location</Text>
          <View style={styles.rowContainer}>
            <View style={styles.rowItem}>
              <Pressable onPress={() => setShowDateModal(true)} style={styles.inputContainer}>
                <CalendarIcon size={20} color={COLORS.text} /> 
                <Text style={styles.input}>{formatDate(date) || 'Select Date'}</Text>
              </Pressable>
            </View>
            <View style={styles.rowItem}>
              <Pressable onPress={() => setShowTimeModal(true)} style={styles.inputContainer}>
                <TimeIcon size={20} color={COLORS.text} />
                <Text style={styles.input}>{formatTime(time) || 'Select Time'}</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <InfoCircleIcon size={14} color={COLORS.text} />
            <Text style={styles.infoText}>Time zone is based on pickup location</Text>
          </View>

          {/* Date Modal */}
          <Modal visible={showDateModal} transparent animationType="slide">
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                  onChange={handleDateChange}
                  style={styles.picker}
                />
                <TouchableOpacity onPress={() => setShowDateModal(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Time Modal */}
          <Modal visible={showTimeModal} transparent animationType="slide">
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <DateTimePicker
                  value={time}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleTimeChange}
                  style={styles.picker}
                />
                <TouchableOpacity onPress={() => setShowTimeModal(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
    //height: HEADER_HEIGHT,
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
    paddingVertical: 15,
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  activeToggle: {
    backgroundColor: '#4CAF50',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapHint: {
    textAlign: 'center',
    padding: 10,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
    color: '#444',
  },
  manualContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  manualInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary || '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 14,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'nunito-medium',
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 4,
    marginTop: 24,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 12,
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderWidth: 1,
    borderColor: '#000',
  },
  tabText: {
    color: COLORS.background,
    fontFamily: 'nunito-bold',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  sliderContainer: {
    overflow: 'hidden',
    width: '100%',
    height: 120, // Adjust to your content height
    marginTop: 20,
  },
  animatedView: {
    flexDirection: 'row',
    width: screenWidth * 2,
  },
  tabContent: {
    width: screenWidth,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    justifyContent: 'center',
  },
  contentText: {
    color: COLORS.text,
    fontSize: 15,
  },
  
});

