import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface MembershipCardProps {
  type: 'bronze' | 'silver' | 'gold';
  price: number;
}

const MembershipCard = ({ type, price }: MembershipCardProps) => {
  // Configuración de colores y fondos según el tipo de membresía
  const cardStyles = {
    bronze: {
      background: require('@/assets/images/bg/bronze.jpg'), // Cambia por tu imagen de fondo
      textColor: '#CD7F32', // Bronce
      iconColor: '#8B4513', // Bronce oscuro
    },
    silver: {
      background: require('@/assets/images/bg/silver.jpg'), // Cambia por tu imagen de fondo
      textColor: '#C0C0C0', // Plata
      iconColor: '#A8A8A8', // Plata oscuro
    },
    gold: {
      background: require('@/assets/images/bg/gold.jpg'), // Cambia por tu imagen de fondo
      textColor: '#FFD700', // Oro
      iconColor: '#D4AF37', // Oro oscuro
    },
  };

  const { background, textColor, iconColor } = cardStyles[type] || {};

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        imageStyle={{ resizeMode: 'cover' }}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.typeText, { color: textColor }]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
            <MaterialIcons name="star" size={24} color={iconColor} />
          </View>

          <Text style={[styles.priceText, { color: textColor }]}>${price}</Text>

          <Text style={[styles.membershipText, { color: textColor }]}>Membership</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  typeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  membershipText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MembershipCard;