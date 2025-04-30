import { View, Text, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import ParallaxScrollViewNormal from '@/components/ParallaxScrollViewNormal';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React, { useEffect } from 'react';

const { width, height } = Dimensions.get('window');
const HEADER_DELIVERY_HEIGHT = height / 100 * 22;

export default function WelcomeScreen() {

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/getStarted');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ParallaxScrollViewNormal
      headerBackgroundColor={{ light: '#55B086', dark: '#4CAF8C' }}
      curveHeight={height / 100 * 14.7}
      headerImage={
        <Image
          source={require('@/assets/img/delivery-bg.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.titleText}>Effortless Global{'\n'}Delivery</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="default" style={styles.stepText}> 
          Send your package anywhere in the {'\n'}world through travellers and {'\n'}freelancers with just a few clicks. {'\n'}Quick and easy.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollViewNormal>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: HEADER_DELIVERY_HEIGHT,
    width: '100%',
    resizeMode: 'contain',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
  },
  titleText: {
    color: '#55B086',
    textAlign: 'center',
    fontFamily: 'NunitoExtraBold',
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0.2,
  },
  stepContainer: {
    backgroundColor: '#F5F5F5',
    gap: 8,
    marginBottom: 8,
  },
  stepText: {
    textAlign: 'center',
    color: '#212121',
    fontFamily: 'NunitoSemiBold',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
});
