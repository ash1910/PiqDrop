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
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import mapStyle from '@/components/mapStyle.json';

const HEADER_HEIGHT = 120;

const COLORS = {
  primary: '#55B086',
  background: '#FFFFFF',
  backgroundWrapper: '#F5F5F5',
  text: '#212121',
  textSecondary: '#919191',
  buttonText: '#FFFFFF',
  subtitle: '#616161',
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

const calculateMapDeltas = (pickup: Coordinates, dropoff: Coordinates) => {
  // Calculate the distance between points
  const latDiff = Math.abs(pickup.latitude - dropoff.latitude);
  const lngDiff = Math.abs(pickup.longitude - dropoff.longitude);
  
  console.log('Coordinate differences:', { latDiff, lngDiff });
  
  // Add more padding (50%) to ensure markers are comfortably visible
  const latDelta = latDiff * 1.5;
  const lngDelta = lngDiff * 1.5;
  
  // Ensure minimum zoom level
  const minDelta = 0.1;
  const maxDelta = 10;
  
  const result = {
    latitudeDelta: Math.min(Math.max(latDelta, minDelta), maxDelta),
    longitudeDelta: Math.min(Math.max(lngDelta, minDelta), maxDelta)
  };
  
  console.log('Calculated deltas:', result);
  return result;
};

const calculateMidpoint = (pickup: Coordinates, dropoff: Coordinates) => {
  return {
    latitude: (pickup.latitude + dropoff.latitude) / 2,
    longitude: (pickup.longitude + dropoff.longitude) / 2
  };
};

export default function SafetyScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const [pickupCoords, setPickupCoords] = useState<Coordinates | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<Coordinates | null>(null);
  const [mapDeltas, setMapDeltas] = useState({ latitudeDelta: 0.05, longitudeDelta: 0.05 });
  const [mapCenter, setMapCenter] = useState<Coordinates | null>(null);

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

  useEffect(() => {
    (async () => {
      // // Pick-up
      // const pickup = await Location.geocodeAsync("Germany, Berlin, Danziger Str.12A 10435, BE DEU");
      // if (pickup.length > 0) setPickupCoords({
      //   latitude: pickup[0].latitude,
      //   longitude: pickup[0].longitude,
      // });

      // // Drop-off
      // const dropoff = await Location.geocodeAsync("Sweden, Gothenburg, Långströmsgatan 7, 41870.");
      // if (dropoff.length > 0) setDropoffCoords({
      //   latitude: dropoff[0].latitude,
      //   longitude: dropoff[0].longitude,
      // });
      // console.log(pickupCoords, dropoffCoords);
      setPickupCoords({
        latitude: 52.5403699,
        longitude: 13.4148486,
      });
      setDropoffCoords({
        latitude: 57.7242591,
        longitude: 11.9028911,
      });
    })();
  }, []);

  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      console.log('Pickup coords:', pickupCoords);
      console.log('Dropoff coords:', dropoffCoords);
      const deltas = calculateMapDeltas(pickupCoords, dropoffCoords);
      const midpoint = calculateMidpoint(pickupCoords, dropoffCoords);
      setMapDeltas(deltas);
      setMapCenter(midpoint);
    }
  }, [pickupCoords, dropoffCoords]);

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
          <Text style={styles.pageTitle}>Order Detail</Text>
        </Animated.View>

        <View style={styles.mapContainer}>
          <MapView
            style={{ flex: 1 }}
            region={{
              latitude: mapCenter?.latitude || pickupCoords?.latitude || 52.5321,
              longitude: mapCenter?.longitude || pickupCoords?.longitude || 13.4246,
              latitudeDelta: mapDeltas.latitudeDelta,
              longitudeDelta: mapDeltas.longitudeDelta,
            }}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            customMapStyle={mapStyle}
          >
            {pickupCoords && (
              <Marker
                coordinate={pickupCoords}
                title="Pick-up"
                description="Germany, Berlin, Danziger Str.12A 10435, BE DEU"
              >
                <Image source={require('@/assets/icons/pickup-marker.png')} style={{ width: 36, height: 36 }} />
              </Marker>
            )}
            {dropoffCoords && (
              <Marker
                coordinate={dropoffCoords}
                title="Drop-off"
                description="Sweden, Gothenburg, Långströmsgatan 7, 41870."
              >
                <Image source={require('@/assets/icons/dropoff-marker.png')} style={{ width: 36, height: 36 }} />
              </Marker>
            )}
          </MapView>
        </View>

        <View style={styles.contentContainer}>

          {/* Order Summary Card */}
          <View style={styles.orderSummaryCard}>
            <View style={styles.orderSummaryRow}>
              <View style={styles.orderSummaryUserRow}>
                <View style={styles.userAvatar} />
                <Text style={styles.orderSummaryUserName}>Jhon doe</Text>
              </View>
              <View style={styles.orderSummaryPriceBox}>
                <Text style={styles.orderSummaryPrice}>$200.00</Text>
              </View>
            </View>
          </View>

          {/* Pick-up Details Card */}
          <View style={styles.pickupDetailsCard}>
            <Text style={styles.pickupDetailsTitle}>Pick-up details</Text>
            <View style={styles.pickupDetailsDivider} />
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Name:</Text>
              <Text style={styles.pickupDetailsValue}>Jhon Doe</Text>
            </View>
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Number:</Text>
              <Text style={styles.pickupDetailsValue}>+4935436567</Text>
            </View>
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Weight:</Text>
              <Text style={styles.pickupDetailsValue}>40Kg</Text>
            </View>
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Price:</Text>
              <Text style={styles.pickupDetailsValue}>$200.00</Text>
            </View>
            <View style={[styles.pickupDetailsRow, { alignItems: 'flex-start' }]}> 
              <Text style={styles.pickupDetailsLabel}>Location:</Text>
              <Text style={styles.pickupDetailsValue}>
                Germany, Berlin, Danziger{"\n"}Str.12A 10435, BE DEU
              </Text>
            </View>
            {/* Note Section */}
            <View style={styles.noteBox}>
              <Text style={styles.noteLabel}>Note</Text>

              <Text style={styles.noteText}>
                The is water intolerant don't let water touch it.
              </Text>
            </View>
          </View>

          {/* Drop-off Details Card */}
          <View style={styles.pickupDetailsCard}>
            <Text style={styles.pickupDetailsTitle}>Drop-off details</Text>
            <View style={styles.pickupDetailsDivider} />
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Name:</Text>
              <Text style={styles.pickupDetailsValue}>Gregory Smith</Text>
            </View>
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Number:</Text>
              <Text style={styles.pickupDetailsValue}>+46700077777</Text>
            </View>
            <View style={[styles.pickupDetailsRow, { alignItems: 'flex-start' }]}> 
              <Text style={styles.pickupDetailsLabel}>Location:</Text>
              <Text style={styles.pickupDetailsValue}>
                Sweden, Gothenburg, Långströmsgatan 7, 41870.
              </Text>
            </View>
            {/* Note Section */}
            <View style={styles.noteBox}>
              <Text style={styles.noteLabel}>Note</Text>

              <Text style={styles.noteText}>
                Please call him in the night he works in the night and sleep in the day
              </Text>
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
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
    zIndex: 1,
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
  contentContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 6,
    paddingHorizontal: 16,
    backgroundColor: COLORS.backgroundWrapper,
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
  orderSummaryCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 8,
    marginBottom: 24,
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderSummaryUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
    marginRight: 14,
  },
  orderSummaryUserName: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    letterSpacing: 0.2,
    color: COLORS.text,
  },
  orderSummaryPriceBox: {
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  orderSummaryPrice: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    letterSpacing: 0.2,
    color: COLORS.text,
  },
  pickupDetailsCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 24,
  },
  pickupDetailsTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    color: COLORS.text,
    letterSpacing: 0.2,
    marginBottom: 8,
    marginLeft: 8,
  },
  pickupDetailsDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginBottom: 16,
  },
  pickupDetailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  pickupDetailsLabel: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 20,
    color: COLORS.subtitle,
    width: 90,
  },
  pickupDetailsValue: {
    color: COLORS.text,
    fontFamily: 'nunito-bold',
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 20,
    flex: 1,
    textAlign: 'right',
  },
  noteBox: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    position: 'relative',
    backgroundColor: COLORS.background,
    marginTop: 24,
  },
  noteLabel: {
    position: 'absolute',
    top: -12,
    left: 12,
    backgroundColor: COLORS.background,
    color: COLORS.primary,
    fontFamily: 'nunito-bold',
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  noteText: {
    color: COLORS.text,
    fontFamily: 'nunito-medium',
    fontSize: 12,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  mapContainer: {
    height: 220,
    overflow: 'hidden',
    marginTop: -20,
  },
});
