import React from 'react';
import {  Stack } from 'expo-router';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {

  return (
    <Stack
      screenOptions={{

        headerShown: useClientOnlyValue(false, true),
      }}>
      <Stack.Screen
        name="one"
        options={{ headerShown: false }}
      />
    
    </Stack>
  );
}
