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

const BenefitsList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const benefitsData = [
    { id: '1', icon: 'cocktail', title: 'Bebidas', color: '#FF6F61' }, // Coral
    { id: '2', icon: 'cutlery', title: 'Entradas', color: '#6B5B95' }, // Morado
    { id: '3', icon: 'spa', title: 'Masaje', color: '#88B04B' }, // Verde
    { id: '4', icon: 'wine', title: 'Descorche', color: '#FFA500' }, // Naranja
    { id: '5', icon: 'gift', title: 'Regalos', color: '#F7CAC9' }, // Rosa
  ];

  const filteredData =
    selectedCategory === 'all'
      ? benefitsData
      : benefitsData.filter((item) => item.title === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.sectionTitle}>Beneficios</Text>

      {/* FlatList Horizontal */}
      <FlatList
        horizontal
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BenefitsCard icon={item.icon} title={item.title} color={item.color} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    width: 120,
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilter: {
    backgroundColor: '#4A5568',
    borderColor: '#4A5568',
  },
  filterText: {
    fontSize: 14,
    color: '#4A5568',
  },
});

export default BenefitsList;