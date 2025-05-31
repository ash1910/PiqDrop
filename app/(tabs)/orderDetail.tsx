import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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

interface OrderData {
  id: number;
  sender: {
    id: number;
    image: string;
  };
  weight: string;
  price: string;
  pickup: {
    name: string;
    mobile: string;
    address: string;
    details: string;
    date: string;
    time: string;
    coordinates: {
      lat: string;
      lng: string;
    };
  };
  drop: {
    name: string;
    mobile: string;
    address: string;
    details: string;
    coordinates: {
      lat: string;
      lng: string;
    };
  };
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

export default function OrderDetailScreen() {
  const params = useLocalSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
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
    try {
      console.log("=== DEBUG: Starting params.orderData effect ===");
      console.log("Raw params:", params);
      
      if (!params.orderData) {
        console.log("DEBUG: No order data in params");
        return;
      }

      console.log("DEBUG: params.orderData type:", typeof params.orderData);
      console.log("DEBUG: params.orderData value:", params.orderData);

      // If it's a string, try to parse it as JSON
      if (typeof params.orderData === 'string') {
        try {
          console.log("DEBUG: Attempting to parse string data");
          const parsedData = JSON.parse(params.orderData);
          console.log("DEBUG: Successfully parsed JSON:", parsedData);
          if (isValidOrderData(parsedData)) {
            console.log("DEBUG: Data passed validation, setting orderData");
            setOrderData(parsedData);
          } else {
            console.log("DEBUG: Data failed validation");
          }
        } catch (e) {
          console.error("DEBUG: Failed to parse order data string:", e);
        }
      }
      // If it's already an object, validate and use it
      else if (typeof params.orderData === 'object' && params.orderData !== null) {
        console.log("DEBUG: Validating object data");
        if (isValidOrderData(params.orderData)) {
          console.log("DEBUG: Object data passed validation, setting orderData");
          setOrderData(params.orderData);
        } else {
          console.log("DEBUG: Object data failed validation");
        }
      }
    } catch (error) {
      console.error("DEBUG: Error in params.orderData effect:", error);
    }
  }, [params.orderData]);

  // Add debugging to validation function
  const isValidOrderData = (data: any): data is OrderData => {
    console.log("=== DEBUG: Validating Order Data ===");
    const checks = {
      hasId: 'id' in data,
      hasSender: 'sender' in data,
      hasPickup: 'pickup' in data,
      hasDrop: 'drop' in data,
      hasWeight: 'weight' in data,
      hasPrice: 'price' in data,
      pickupIsObject: data.pickup && typeof data.pickup === 'object',
      dropIsObject: data.drop && typeof data.drop === 'object',
      hasPickupCoords: data.pickup && 'coordinates' in data.pickup,
      hasDropCoords: data.drop && 'coordinates' in data.drop
    };
    
    console.log("DEBUG: Validation checks:", checks);
    
    const isValid = (
      checks.hasId &&
      checks.hasSender &&
      checks.hasPickup &&
      checks.hasDrop &&
      checks.hasWeight &&
      checks.hasPrice &&
      checks.pickupIsObject &&
      checks.dropIsObject &&
      checks.hasPickupCoords &&
      checks.hasDropCoords
    );
    
    console.log("DEBUG: Final validation result:", isValid);
    return isValid;
  };

  useEffect(() => {
    const setMarkerInMap = async () => {
      console.log("=== DEBUG: Starting setMarkerInMap ===");
      console.log("DEBUG: Current orderData:", orderData);
      
      // Pick-up
      if(orderData?.pickup.coordinates.lat && orderData?.pickup.coordinates.lng){
        console.log("DEBUG: Setting pickup coords from coordinates");
        setPickupCoords({
          latitude: parseFloat(orderData?.pickup.coordinates.lat || '0'),
          longitude: parseFloat(orderData?.pickup.coordinates.lng || '0'),
        });
      }
      else if(orderData?.pickup.address){
        console.log("DEBUG: Attempting to geocode pickup address:", orderData.pickup.address);
        const pickup = await Location.geocodeAsync(orderData?.pickup.address || '');
        if (pickup.length > 0) {
          console.log("DEBUG: Successfully geocoded pickup address");
          setPickupCoords({
            latitude: pickup[0].latitude,
            longitude: pickup[0].longitude,
          });
        }
      }
      
      // Drop-off
      if(orderData?.drop.coordinates.lat && orderData?.drop.coordinates.lng){
        console.log("DEBUG: Setting dropoff coords from coordinates");
        setDropoffCoords({
          latitude: parseFloat(orderData?.drop.coordinates.lat || '0'),
          longitude: parseFloat(orderData?.drop.coordinates.lng || '0'),
        });
      }
      else if(orderData?.drop.address){
        console.log("DEBUG: Attempting to geocode dropoff address:", orderData.drop.address);
        const dropoff = await Location.geocodeAsync(orderData?.drop.address || '');
        if (dropoff.length > 0) {
          console.log("DEBUG: Successfully geocoded dropoff address");
          setDropoffCoords({
            latitude: dropoff[0].latitude,
            longitude: dropoff[0].longitude,
          });
        }
      }
    }
    
    // Only call setMarkerInMap if orderData exists
    if (orderData) {
      setMarkerInMap();
    } else {
      console.log("DEBUG: Skipping setMarkerInMap - orderData is null");
    }
  }, [orderData]);

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
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.replace('/(tabs)/manage')}>
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
                description={orderData?.pickup.address || 'N/A'}
              >
                <Image source={require('@/assets/icons/pickup-marker.png')} style={{ width: 36, height: 36 }} />
              </Marker>
            )}
            {dropoffCoords && (
              <Marker
                coordinate={dropoffCoords}
                title="Drop-off"
                description={orderData?.drop.address || 'N/A'}
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
                <Text style={styles.orderSummaryUserName}>{orderData?.pickup.name || 'N/A'}</Text>
              </View>
              <View style={styles.orderSummaryPriceBox}>
                <Text style={styles.orderSummaryPrice}>${parseFloat(orderData?.price || '0.00').toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Pick-up Details Card */}
          <View style={styles.pickupDetailsCard}>
            <Text style={styles.pickupDetailsTitle}>Pick-up details</Text>
            <View style={styles.pickupDetailsDivider} />
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Name:</Text>
              <Text style={styles.pickupDetailsValue}>{orderData?.pickup.name || 'N/A'}</Text>
            </View>
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Number:</Text>
              <Text style={styles.pickupDetailsValue}>{orderData?.pickup.mobile || 'N/A'}</Text>
            </View>
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Weight:</Text>
              <Text style={styles.pickupDetailsValue}>
                {orderData?.weight 
                  ? (typeof orderData.weight === 'string' && orderData.weight.toLowerCase().includes('kg')
                    ? orderData.weight 
                    : `${orderData.weight}Kg`)
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Price:</Text>
              <Text style={styles.pickupDetailsValue}>${parseFloat(orderData?.price || '0.00').toFixed(2)}</Text>
            </View>
            <View style={[styles.pickupDetailsRow, { alignItems: 'flex-start' }]}> 
              <Text style={styles.pickupDetailsLabel}>Location:</Text>
              <Text style={styles.pickupDetailsValue}>
                {orderData?.pickup.address || 'N/A'}
              </Text>
            </View>
            {/* Note Section */}
            <View style={styles.noteBox}>
              <Text style={styles.noteLabel}>Note</Text>
              <Text style={styles.noteText}>
                {orderData?.pickup.details || 'No details provided'}
              </Text>
            </View>
          </View>

          {/* Drop-off Details Card */}
          <View style={styles.pickupDetailsCard}>
            <Text style={styles.pickupDetailsTitle}>Drop-off details</Text>
            <View style={styles.pickupDetailsDivider} />
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Name:</Text>
              <Text style={styles.pickupDetailsValue}>{orderData?.drop.name || 'N/A'}</Text>
            </View>
            <View style={styles.pickupDetailsRow}>
              <Text style={styles.pickupDetailsLabel}>Number:</Text>
              <Text style={styles.pickupDetailsValue}>{orderData?.drop.mobile || 'N/A'}</Text>
            </View>
            <View style={[styles.pickupDetailsRow, { alignItems: 'flex-start' }]}> 
              <Text style={styles.pickupDetailsLabel}>Location:</Text>
              <Text style={styles.pickupDetailsValue}>
                {orderData?.drop.address || 'N/A'}
              </Text>
            </View>
            {/* Note Section */}
            <View style={styles.noteBox}>
              <Text style={styles.noteLabel}>Note</Text>
              <Text style={styles.noteText}>
                {orderData?.drop.details || 'No details provided'}
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
