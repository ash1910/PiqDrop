import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { MessageIcon } from '@/components/icons/MessageIcon';
import { ManageIcon } from '@/components/icons/ManageIcon';
import { AccountIcon } from '@/components/icons/AccountIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const COLORS = {
    primary: '#55B086',
    background: '#FFFFFF',
    text: '#616161',
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontFamily: 'nunito-semibold',
          fontSize: 10,
          letterSpacing: 0.2,
          marginTop: 2,
        },
        tabBarItemStyle: {
          height: 64,
          paddingTop: 4,
        },
        tabBarIconStyle: {
          width: 25,
          height: 25,
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            borderTopWidth: 0,
            height: 86,
          },
          default: {
            borderTopWidth: 0,
            height: 86,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <MessageIcon size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: 'Manage',
          tabBarIcon: ({ color }) => <ManageIcon size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <AccountIcon size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="orderDetail"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="calling"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
