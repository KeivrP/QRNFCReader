import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

interface BenefitsCardProps {
  icon: string; // Nombre del ícono de Fontisto
  title: string; // Título de la tarjeta
  color: string; // Color de fondo de la tarjeta
}

const BenefitsCard = ({ icon, title, color }: BenefitsCardProps) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: scaleValue }],
            backgroundColor: color,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Fontisto name={icon} size={32} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
