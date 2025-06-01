import { Tabs, router } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

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
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push({
              pathname: '/manage',
              params: { refresh: Date.now() }
            });
          },
        }}
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
      <Tabs.Screen
        name="packageEdit"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
