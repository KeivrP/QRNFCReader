import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{

        headerShown: useClientOnlyValue(false, true),
      }}>
      <Stack.Screen
        name="one"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="two"
        options={{
          title: 'Tab Two',
        }}
      />
    </Stack>
  );
}
