import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import BottomModal from '../BottomSheet';

// SVG icons as strings
const drinkIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14.5A3.5 3.5 0 0 0 12 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M8 9h8m-8 3h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const foodIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.8 2h10.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C22 4.28 22 5.12 22 6.8v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C19.72 22 18.88 22 17.2 22H6.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C2 19.72 2 18.88 2 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C4.28 2 5.12 2 6.8 2" stroke="currentColor" stroke-width="2"/>
</svg>`;

const packageIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 7.5v9l-8 4.5L4 16.5v-9L12 3l8 4.5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M12 12 4 7.5M12 12v9m0-9 8-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

interface BenefitItem {
  name: string;
  available: boolean;
}

export const processBenefitDetails = (details: string[]): BenefitItem[] => {
  // Simulate some items being unavailable (you can modify this logic)
  return details.map(item => ({
    name: item,
    available: Math.random() > 0.3 // Random availability for demo
  }));
};

export const getCategoryIcon = (id: string) => {
  switch (id) {
    case '1':
      return drinkIcon;
    case '2':
      return foodIcon;
    case '3':
      return packageIcon;
    default:
      return null;
  }
};

export const getCategoryTitle = (id: string) => {
  switch (id) {
    case '1':
      return 'Bebidas Disponibles';
    case '2':
      return 'Snacks y Comidas';
    case '3':
      return 'Paquetes Especiales';
    default:
      return 'Beneficios';
  }
};

export const BenefitItem = ({ item }: { item: BenefitItem }) => {
  const [animation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <Animated.View style={[styles.benefitItem, animatedStyle]}>
      <Text style={[
        styles.benefitText,
        !item.available && styles.unavailableText
      ]}>
        • {item.name}
        {!item.available && ' (No disponible)'}
      </Text>
    </Animated.View>
  );
};

const EnhancedBottomModal = ({ 
  ref, 
  snapPoint, 
  selectedBenefitId, 
  benefitDetails 
}: {
  ref: any;
  snapPoint: number;
  selectedBenefitId: string;
  benefitDetails: { [key: string]: string[] };
}) => {
  const categoryIcon = getCategoryIcon(selectedBenefitId);
  const processedBenefits = processBenefitDetails(benefitDetails[selectedBenefitId] || []);

  return (
    <BottomModal ref={ref} snapPoint={snapPoint}>
      <View style={styles.modalContent}>
        <View style={styles.headerContainer}>
          {categoryIcon && (
            <SvgXml 
              xml={categoryIcon} 
              width={32} 
              height={32} 
              color="#2D3748"
            />
          )}
          <Text style={styles.modalTitle}>
            {getCategoryTitle(selectedBenefitId)}
            
          </Text>
        </View>
        <ScrollView style={styles.benefitsList}>
          {processedBenefits.map((item, index) => (
            <BenefitItem key={index} item={item} />
          ))}
        </ScrollView>
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginLeft: 12,
  },
  benefitsList: {
    flex: 1,
  },
  benefitItem: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4299E1',
  },
  benefitText: {
    fontSize: 16,
    color: '#2D3748',
  },
  unavailableText: {
    color: '#E53E3E',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

export default EnhancedBottomModal;