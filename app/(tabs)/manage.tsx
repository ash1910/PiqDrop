import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, KeyboardAvoidingView, Platform, Keyboard, StatusBar, Pressable } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BellIcon } from '@/components/icons/BellIcon';
import { SocialShareIcon } from '@/components/icons/SocialShareIcon';
import { MoreVerticalIcon } from '@/components/icons/MoreVerticalIcon';
import { RoundedCheckIcon } from '@/components/icons/RoundedCheckIcon';
import { RoundedCrossIcon } from '@/components/icons/RoundedCrossIcon';
import { RoundedEditIcon } from '@/components/icons/RoundedEditIcon';
import { DistanceIcon } from '@/components/icons/DistanceIcon';
import { MapIcon } from '@/components/icons/MapIcon';
import { VerticalDashedLineIcon } from '@/components/icons/VerticalDashedLineIcon';
import { CalendarIcon } from '@/components/icons/CalendarDateIcon';
import { ProfileIcon } from '@/components/icons/ProfileIcon';
import { SimpleCheckIcon } from '@/components/icons/SimpleCheckIcon';
import { SuccessBadgeIcon } from '@/components/icons/SuccessBadgeIcon';

const HEADER_HEIGHT = 120;

const TABS = ['On going', 'Accepted', 'Completed', 'Canceled'];
const screenWidth = Dimensions.get('window').width;
const TAB_WIDTH = (screenWidth - 32 - 8) / TABS.length;

const COLORS = {
  primary: '#55B086',
  danger: '#FF693B',
  background: '#FFFFFF',
  backgroundWrapper: '#F5F5F5',
  buttonBackground: '#EEEEEE',
  text: '#212121',
  textSecondary: '#424242',
  buttonText: '#FFFFFF',
  subtitle: '#616161',
};

export default function ManageScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [modalDeliveryCompletedVisible, setModalDeliveryCompletedVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);

  const handlePress = (index) => {
    setActiveTab(index);
    translateX.value = withTiming(index * TAB_WIDTH, { duration: 200 });
  };

  const animatedTabStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

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

  const deliveriesGrouped = [
    {
      id: 0,
      items: [
        {
          name: 'Jhon Doe',
          location: 'Germany, Berlin, Danziger Str. 12A 10435, BE DEU.',
          distance: '10 m from you',
          image: require('@/assets/images/profile_pic.jpg'),
          pinColor: '#28C76F',
        },
        {
          name: 'Gregory Smith',
          location: 'Sweden, Gothenburg Långströmsgatan 7, 41870',
          distance: '10000 km from you',
          image: require('@/assets/images/profile_pic_1.jpg'),
          pinColor: '#EA5455',
        },
      ],
    },
    {
      id: 1,
      items: [
        {
          name: 'Ingolf André',
          location: 'Germany, Berlin, Danziger Str. 12A 10435, BE DEU.',
          distance: '10 m from you',
          image: require('@/assets/images/profile_pic.jpg'),
          pinColor: '#28C76F',
        },
        {
          name: 'Wiebke Friedhelm',
          location: 'United Kingdom, Oldhurst, 94 Horsefair Green',
          distance: '5000 km from you',
          image: require('@/assets/images/profile_pic_1.jpg'),
          pinColor: '#EA5455',
        },
      ],
    },
    {
      id: 2,
      items: [
        {
          name: 'Ingolf André',
          location: 'Germany, Berlin, Danziger Str. 12A 10435, BE DEU.',
          distance: '10 m from you',
          image: require('@/assets/images/profile_pic.jpg'),
          pinColor: '#28C76F',
        },
        {
          name: 'Wiebke Friedhelm',
          location: 'United Kingdom, Oldhurst, 94 Horsefair Green',
          distance: '5000 km from you',
          image: require('@/assets/images/profile_pic_1.jpg'),
          pinColor: '#EA5455',
        },
      ],
    },
  ];
  

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
          <Text style={styles.pageTitle}>My Orders</Text>
          <TouchableOpacity style={styles.leftArrow} onPress={() => router.push('/(tabs)/notification')}>
            <BellIcon size={44} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.leftArrow} onPress={() => setModalFilterVisible(true)}>
            <SocialShareIcon size={44} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalFilterVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalOption} onPress={() => alert('Delivery date')}>
                  <ProfileIcon size={20} color={COLORS.text} />
                  <Text style={styles.modalOptionText}>Delivery date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={() => alert('Order date')}>
                  <CalendarIcon size={20} color={COLORS.primary} />
                  <Text style={[styles.modalOptionText, {color: COLORS.primary}]}>Order date</Text>
                  <SimpleCheckIcon size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalOption, {borderBottomWidth: 0}]} onPress={() => setModalFilterVisible(false)}>
                  <RoundedCrossIcon size={20} color='red' />
                  <Text style={[styles.modalOptionText, { color: 'red' }]}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Animated.View>

        <View style={styles.tabContainer}>
          {/* Tab Bar */}
          <View style={styles.tabBar}>
            <Animated.View style={[styles.animatedIndicator, animatedTabStyle]} />
            {TABS.map((label, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(index)}
                style={styles.tabButton}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.contentContainer}>
            {activeTab === 0 && (
            <>
              {deliveriesGrouped.map((group, index) => (
                <View style={styles.card} key={index}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Delivery overview</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <MoreVerticalIcon size={20} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardContainer}>
                    <View style={styles.mapPinContainer}>
                      <MapIcon size={24} color={COLORS.primary} />
                      <VerticalDashedLineIcon />
                      <MapIcon size={24} color={COLORS.danger} />
                    </View>
                    <View style={styles.itemRowContainer}>
                      {group.items.map((item, i) => (
                        <View style={styles.itemRow} key={i}>                          
                          <View style={styles.info}>
                            <View style={styles.infoRow}>
                              <Image source={item.image} style={styles.avatar} />
                              <Text style={styles.name}>{item.name}</Text>
                            </View>
                            <Text style={styles.location}>{item.location}</Text>
                            <View style={styles.infoRow}>
                              <DistanceIcon size={14} />
                              <Text style={styles.distance}>{item.distance}</Text>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                  
                  <View style={styles.footer}>
                    <Text style={styles.price}>$20.00</Text>
                    <Text style={styles.status}>In progress</Text>
                  </View>
                </View>
              ))}
              <View style={[styles.emptyContainer, {display: 'none'}]}>
                <Image source={require('@/assets/images/empty_board.png')} style={styles.emptyImage} />
                <Text style={styles.messageHeader}>You don't have an order yet</Text>
                <Text style={styles.message}>You don't have ongoing orders at this time</Text>
              </View>
            </>
            )}
            {activeTab === 1 && (
            <>
            {deliveriesGrouped.map((group, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Delivery overview</Text>
                </View>
                <View style={styles.cardContainer}>
                  <View style={styles.mapPinContainer}>
                    <MapIcon size={24} color={COLORS.primary} />
                    <VerticalDashedLineIcon />
                    <MapIcon size={24} color={COLORS.danger} />
                  </View>
                  <View style={styles.itemRowContainer}>
                    {group.items.map((item, i) => (
                      <View style={styles.itemRow} key={i}>                          
                        <View style={styles.info}>
                          <View style={styles.infoRow}>
                            <Image source={item.image} style={styles.avatar} />
                            <Text style={styles.name}>{item.name}</Text>
                          </View>
                          <Text style={styles.location}>{item.location}</Text>
                          <View style={styles.infoRow}>
                            <DistanceIcon size={14} />
                            <Text style={styles.distance}>{item.distance}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.footer}>
                  <Text style={styles.price}>$20.00</Text>
                  <Text style={[styles.status, {backgroundColor: 'rgba(40, 152, 255, 0.15)', color: '#2898FF', }]}>Accepted</Text>
                </View>
              </View>
            ))}
              <View style={[styles.emptyContainer, {display: 'none'}]}>
                <Image source={require('@/assets/images/empty_board.png')} style={styles.emptyImage} />
                <Text style={styles.messageHeader}>No accepted orders</Text>
                <Text style={styles.message}>You don't have accepted orders at this time</Text>
              </View>
            </>
            )}
            {activeTab === 2 && (
            <>
            {deliveriesGrouped.map((group, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Delivery overview</Text>
                </View>
                <View style={styles.cardContainer}>
                  <View style={styles.mapPinContainer}>
                    <MapIcon size={24} color={COLORS.primary} />
                    <VerticalDashedLineIcon />
                    <MapIcon size={24} color={COLORS.danger} />
                  </View>
                  <View style={styles.itemRowContainer}>
                    {group.items.map((item, i) => (
                      <View style={styles.itemRow} key={i}>                          
                        <View style={styles.info}>
                          <View style={styles.infoRow}>
                            <Image source={item.image} style={styles.avatar} />
                            <Text style={styles.name}>{item.name}</Text>
                          </View>
                          <Text style={styles.location}>{item.location}</Text>
                          <View style={styles.infoRow}>
                            <DistanceIcon size={14} />
                            <Text style={styles.distance}>{item.distance}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.footer}>
                  <Text style={styles.price}>$20.00</Text>
                  <Text style={[styles.status, {backgroundColor: 'rgba(85, 176, 134, 0.15)', color: '#55B086', }]}>Completed</Text>
                </View>
              </View>
            ))}
              <View style={[styles.emptyContainer, {display: 'none'}]}>
                <Image source={require('@/assets/images/empty_board.png')} style={styles.emptyImage} />
                <Text style={styles.messageHeader}>Completed orders will show here</Text>
                <Text style={styles.message}>You don't have completed orders at this time</Text>
              </View>
            </>
            )}
            {activeTab === 3 && (
            <>
            {deliveriesGrouped.map((group, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Delivery overview</Text>
                </View>
                <View style={styles.cardContainer}>
                  <View style={styles.mapPinContainer}>
                    <MapIcon size={24} color={COLORS.primary} />
                    <VerticalDashedLineIcon />
                    <MapIcon size={24} color={COLORS.danger} />
                  </View>
                  <View style={styles.itemRowContainer}>
                    {group.items.map((item, i) => (
                      <View style={styles.itemRow} key={i}>                          
                        <View style={styles.info}>
                          <View style={styles.infoRow}>
                            <Image source={item.image} style={styles.avatar} />
                            <Text style={styles.name}>{item.name}</Text>
                          </View>
                          <Text style={styles.location}>{item.location}</Text>
                          <View style={styles.infoRow}>
                            <DistanceIcon size={14} />
                            <Text style={styles.distance}>{item.distance}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.footer}>
                  <Text style={styles.price}>$20.00</Text>
                  <Text style={[styles.status, {backgroundColor: 'rgba(246, 63, 63, 0.15)', color: '#F63F3F', }]}>Canceled</Text>
                </View>
              </View>
            ))}
              <View style={[styles.emptyContainer, {display: 'none'}]}>
                <Image source={require('@/assets/images/empty_board.png')} style={styles.emptyImage} />
                <Text style={styles.messageHeader}>Canceled orders list empty</Text>
                <Text style={styles.message}>You don't have canceled orders at this time</Text>
              </View>
            </>
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity style={styles.modalOption} onPress={() => {
                    setModalVisible(false);
                    setModalDeliveryCompletedVisible(true);
                    }}>
                    <RoundedCheckIcon size={20} />
                    <Text style={styles.modalOptionText}>Accept Delivery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalOption} onPress={() => alert('Cancelled')}>
                    <RoundedCrossIcon size={20} />
                    <Text style={styles.modalOptionText}>Cancel Delivery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalOption} onPress={() => alert('Editing')}>
                    <RoundedEditIcon size={20} />
                    <Text style={styles.modalOptionText}>Edit Delivery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalOption, {borderBottomWidth: 0}]} onPress={() => setModalVisible(false)}>
                    <RoundedCrossIcon size={20} color='red' />
                    <Text style={[styles.modalOptionText, { color: 'red' }]}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalDeliveryCompletedVisible}
              onRequestClose={() => setModalDeliveryCompletedVisible(false)}
            >
              <View style={styles.modalDeliveryContainer}>
                <View style={styles.modalDeliveryContent}>
                  <View style={styles.iconContainer}>
                    <SuccessBadgeIcon />
                  </View>
                  <Text style={styles.modalDeliveryContentHeader}>Delivery completed!</Text>
                  <Text style={styles.modalDeliveryContentText}>Please, let's know about your experience and the service provided to you by the dropper. This will enable us to improve our system. Thank you for using PiqDrop!</Text>
                  <TouchableOpacity style={[styles.loginButton, { marginBottom: 14}]} onPress={() => {
                    setModalDeliveryCompletedVisible(false);
                    router.push('../review');
                    }}>
                    <Text style={styles.loginText}>Leave a review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.loginButton, {backgroundColor: '#E6E6E6'}]} onPress={() => setModalDeliveryCompletedVisible(false)}>
                    <Text style={[styles.loginText, {color: COLORS.text}]}>Maybe later</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#000',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    gap: 16,
  },
  leftArrow: {
    width: 44,
    height: 44,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    color: COLORS.background,
    letterSpacing: 0.2,
    lineHeight: 25,
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 0,
    paddingHorizontal: 16,
    backgroundColor: COLORS.backgroundWrapper,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    padding: 4,
  },
  animatedIndicator: {
    position: 'absolute',
    height: '100%',
    width: TAB_WIDTH,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    zIndex: 0,
    top: 4,
    left: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    paddingVertical: 12,
  },
  tabText: {
    color: COLORS.text,
    fontFamily: 'nunito-bold',
    fontSize: 14, 
    letterSpacing: -0.2,
    lineHeight: 16,
  },
  activeTabText: {
    color: COLORS.background,
  },
  contentContainer: {
    marginTop: 24,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  emptyImage: {
    width: 189,
    height: 184,
  },
  messageHeader: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    lineHeight: 25,
    color: COLORS.text,
    marginTop: 32,
  },
  message: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: COLORS.text,
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 22,
    color: COLORS.text,
  },
  sectionTag: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sectionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    position: 'relative',
  },
  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  info: {
    flex: 1,
    backgroundColor: 'rgba(238, 238, 238, 0.50)',
    padding: 10,
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  name: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 22,
    color: COLORS.text,
  },
  location: {
    fontFamily: 'nunito-medium',
    fontSize: 12,
    letterSpacing: 0.2,
    lineHeight: 16,
    color: COLORS.text,
    paddingVertical: 8,
  },
  distance: {
    fontFamily: 'nunito-semibold',
    fontSize: 12,
    letterSpacing: 0.2,
    lineHeight: 22,
    color: COLORS.primary,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 25,
    color: COLORS.text,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.buttonBackground,
  },
  status: {
    fontFamily: 'nunito-semibold',
    fontSize: 12,
    letterSpacing: 0.2,
    lineHeight: 25,
    color: COLORS.text,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLORS.buttonBackground,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingHorizontal: 30,
    paddingTop: 37,
    paddingBottom: 46,
  },
  modalOption: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: 'nunito-semibold',
    color: COLORS.text,
    letterSpacing: 0.2,
    lineHeight: 54,
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    flex: 1,
  },
  mapPinContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  dotLine: {
    height: 96,
    width: 2,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#919191',
  },
  itemRowContainer: {
    flex: 1,
  },
  modalDeliveryContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalDeliveryContent: {
    backgroundColor: COLORS.background,
    borderRadius: 24,
    padding: 24,
    margin: 16,
    flexDirection: 'column',
    alignContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  modalDeliveryContentHeader: {
    textAlign: 'center',
    fontFamily: 'nunito-extrabold',
    fontSize: 18,
    letterSpacing: 0.2,
    lineHeight: 25,
    color: COLORS.primary,
    marginBottom: 18,
    marginTop: 28,
  },
  modalDeliveryContentText: {
    textAlign: 'center',
    fontFamily: 'nunito-regular',
    fontSize: 12,
    letterSpacing: 0.2,
    lineHeight: 18,
    color: COLORS.text,
    marginBottom: 18,
  },
});
