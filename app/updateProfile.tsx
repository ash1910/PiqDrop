import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Modal, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar, TextInput, Button } from 'react-native';
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
import { LocationIcon } from '@/components/icons/LocationIcon';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { CalendarIcon } from '@/components/icons/CalendarDateIcon';
import { SelectArrowIcon } from '@/components/icons/SelectArrowIcon';
import { COUNTRIES } from '@/components/countries';
import * as ImagePicker from 'expo-image-picker';

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

const GENDERS = [
  'Male',
  'Female',
  'Other'
];

export default function UpdateProfileScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState('SE'); //sweden 
  const [callingCode, setCallingCode] = useState('46'); 
  const [phone, setPhone] = useState('435436567');
  const [country, setCountry] = useState<Country | null>(null);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [flag, setFlag] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAJxQTFRFAEBzAD90I1NjG05nAD50AD9zHVBmG09nPGFYM1tcGk5nHE5m37sO37oO5L0M4bsN3bkP3roP5L0M/80A/8wA3LkQAEBzAD90I1Nj3LgQGk5nAD50AD9zAD51I1JkGk1oAD11578L4LsO/MoC+skC4rwN4bwN5r4L/MoB+8oC470MIFFkHlBlP2JXNl1bHU9mH1BlI1FkI1Jj////hM0NagAAABJ0Uk5T/Pz9/Pz8/v7+/v7+/v7+/v7+yMbBHgAAAAFiS0dEMzfVfF4AAAAJcEhZcwAAAEgAAABIAEbJaz4AAACNSURBVDjL7dHJDoJAEEXRh+KE4tQlqC2COA/g8P8fp0AKNxXSC+OKs75JJa8AZjWmikjNmnZLAo/58zxcLPVKUoc/Cn0WrIswjLQEbdbpbrIw7jl9CQbMHW7pYzcaTyRQX5RTMpAh89D49J4djqesO19iEa7slhTzpPeHBOWi0bN68PJH+lX9wjr8b/gGzuNz038exeMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTAtMDdUMTM6MTQ6NTYrMDI6MDCyBjBrAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTEwLTA3VDEzOjE0OjU2KzAyOjAww1uI1wAAAABJRU5ErkJggg==');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('Swedish');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState<'nationality' | 'gender'>('nationality');
  
  const [date, setDate] = useState(new Date('1990-02-05'));
  const [showDateModal, setShowDateModal] = useState(false);
  const [location, setLocation] = useState('Norra Agnegatan 34A, Norra Agnegatan, Stockholm, Stockholm County, 112 29, Sweden');
  const [modalVisible, setModalVisible] = useState(false);
  const [marker, setMarker] = useState({
    latitude: 59.33422549602568,
    longitude: 18.05871074765847,
  });
  const [region, setRegion] = useState({
    latitude: 59.33422549602568,
    longitude: 18.05871074765847,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('map');

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
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) setDate(selectedDate);
    if (Platform.OS !== 'ios') setShowDateModal(false);
  };

  const formatDate = (d) =>
    d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      if (region === null) {
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content'); 
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const handleMapPress = async (e) => {
    const coords = e.nativeEvent.coordinate;
    //console.log(coords);
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
        //console.log(address);
        setRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        //console.log(region);
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

  // Add keyboard dismiss handler
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Add return key handler
  const handleReturnKey = () => {
    Keyboard.dismiss();
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

  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
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
        onTouchStart={dismissKeyboard}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.back()}>
            <LeftArrowIcon size={44} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Update Informations</Text>
        </Animated.View>

        <View style={styles.form}>
          <View style={styles.profileInfoRow}>
            <TouchableOpacity style={styles.editProfile} onPress={() => takePicture()}>
              <EditIcon size={20} />
            </TouchableOpacity>
            {profileImage && (
              <TouchableOpacity style={styles.profileImage} onPress={() => takePicture()}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              </TouchableOpacity>
            )}
            {!profileImage && (
              <TouchableOpacity style={styles.profileImage} onPress={() => takePicture()}>
                <Image source={require('@/assets/images/profile_pic.jpg')} style={styles.profileImage} />
              </TouchableOpacity>
            )}
            <Text style={styles.profileName}>{firstName} {lastName}</Text>
            <Text style={styles.profileUserName}>@Amy23</Text>
          </View>

          <Text style={styles.label}>First Name</Text>
          <View style={styles.inputContainer}>
            <UserRoundedIcon size={20} color={COLORS.text} />
            <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} returnKeyType="done" onSubmitEditing={handleReturnKey} />
          </View>

          <Text style={styles.label}>Last Name</Text>
          <View style={styles.inputContainer}>
            <UserRoundedIcon size={20} color={COLORS.text} />
            <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} returnKeyType="done" onSubmitEditing={handleReturnKey} />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <LetterIcon size={20} color={COLORS.text} />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} returnKeyType="done" onSubmitEditing={handleReturnKey} />
          </View>

          <Text style={styles.label}>Mobile Number</Text>
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
              returnKeyType="done"
              onSubmitEditing={handleReturnKey}
            />
          </View>

          <Text style={styles.label}>Address</Text>
          <View style={styles.inputContainer}>
            <LocationIcon size={20} color={COLORS.text} /> 
            <TextInput placeholder="Location" value={location} onChangeText={setLocation} onFocus={() => setModalVisible(true)} style={styles.input} returnKeyType="done" onSubmitEditing={handleReturnKey} />

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
                      blurOnSubmit={true}
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                        setModalVisible(false);
                      }}
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

          <Text style={styles.label}>Date of birth</Text>
          <View style={styles.rowContainer}>
            <View style={styles.rowItem}>
              <TouchableOpacity onPress={() => setShowDateModal(true)} style={styles.inputContainer}>
                <CalendarIcon size={20} color={COLORS.text} /> 
                <Text style={styles.input}>{formatDate(date) || 'Date of birthday'}</Text>
              </TouchableOpacity>
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
            <View style={styles.modalPickerContainer}>
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
      </Animated.ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/(tabs)/account')}
        >
          <Text style={styles.continueButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 18,
  },
  rowItem: {
    flex: 1,
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
  modalPickerContainer: {
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
    borderBottomColor: COLORS.divider,
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
