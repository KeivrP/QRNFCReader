import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import CountdownTimer from './CountDownTimer';

interface MembershipCardProps {
  type: 'bronze' | 'silver' | 'gold';
  price: number;
  membershipNumber?: string;
  validUntil?: string;
  onRecharge?: () => void;
}

const MembershipCard = ({
  type,
  price,
  membershipNumber = "#12345678",
  validUntil = "12/2025",
  onRecharge = () => { }
}: MembershipCardProps) => {
  const { t } = useTranslation();
  const isSilver = type === 'silver';

  const cardStyles = {
    bronze: {
      background: require('@/assets/images/bg/bronze.png'),
      textColor: '#0d0f0b',
      textSubtitleColor: '#0d0f0b',

      buttonColor: '#8B4513',
      shimmerColor: ['#8B4513', '#CD7F32', '#8B4513'],
    },
    silver: {
      background: require('@/assets/images/bg/silver.png'),
      textColor: '#0d0f0b',
      textSubtitleColor: '#fff',

      buttonColor: '#A8A8A8',
      shimmerColor: ['#A8A8A8', '#FFFFFF', '#A8A8A8'],
    },
    gold: {
      background: require('@/assets/images/bg/gold.png'),
      textColor: '#0d0f0b',
      textSubtitleColor: '#ffff',
      buttonColor: '#D4AF37',
      shimmerColor: ['#D4AF37', '#FFD700', '#D4AF37'],
    },
  };

  const { background, textColor, buttonColor, textSubtitleColor } = cardStyles[type] || {};

  // Logo spin animation
  const spinValue = new Animated.Value(0);
  // Shimmer animation
  const shimmerValue = new Animated.Value(0);

  React.useEffect(() => {
    // Logo rotation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    // Button shimmer effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        })
      ])
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Animaciones
  const shineAnimation = React.useRef(new Animated.Value(0)).current;
  const pulseAnimation = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Animación de brillo
    Animated.loop(
      Animated.timing(shineAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Animación de pulso
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);



  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        imageStyle={{ resizeMode: 'cover' }}
        style={styles.backgroundImage}
      >
        {/* Rotating Logo Background */}
        <Animated.View style={[
          styles.logoBackground,
          isSilver ? styles.logoBackgroundSilver : {},
          { transform: [{ rotate: spin }] }
        ]}>
          <Image
            source={require('@/assets/images/makay-logo.png')}
            style={styles.backgroundLogo}
          />
        </Animated.View>

        <View style={styles.content}>
          {/* Header con efecto de brillo */}
          <View style={styles.header}>
            <Text style={[styles.membershipNumber, { color: textSubtitleColor }]}>
              {membershipNumber}
            </Text>

<View style={{flexDirection: "column"}}/>
            <Animated.View style={[
              styles.typeContainer,
              {
                backgroundColor: `${buttonColor}80`,
                transform: [{ scale: pulseAnimation }]
              }
            ]}>
              <Text style={[styles.typeText, { color: textColor }]}>
                {t(`home.${type}`).toUpperCase()}
              </Text>


              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={{ flex: 1 }}
                />
              </Animated.View>
            </Animated.View>
            
          </View>


          {/* Main Content */}
          {isSilver ? (
            <View style={styles.silverContent}>
              <View style={styles.priceContainerSilver}>
                <Text style={[styles.currencySymbol, { color: textColor }]}>$</Text>
                <Text style={[styles.price, { color: textColor }]}>{price}</Text>
              </View>
              {/* Animated Button for Silver */}
              <TouchableOpacity
                onPress={onRecharge}
                activeOpacity={0.8}
              >
                <Animated.View style={[styles.rechargeButton, { backgroundColor: buttonColor }]}>

                  <Text style={styles.rechargeButtonText}>{t("home.recharge")}</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.centerContent}>
              <View style={styles.priceContainer}>
                <Text style={[styles.price, { color: textColor }]}>${price}</Text>
              </View>
              {/* Animated Button for other types */}
              <TouchableOpacity
                onPress={onRecharge}
                activeOpacity={0.8}
              >
                <Animated.View style={[styles.rechargeButton, { backgroundColor: buttonColor }]}>

                  <Text style={styles.rechargeButtonText}>{t("home.recharge")}</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.validUntil, { color: textSubtitleColor }]}>
              {t("home.valid")} {validUntil}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    height: heightPercentageToDP('20%'),
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoBackground: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    opacity: 0.2,
  },
  logoBackgroundSilver: {
    left: '25%',  // Moved to the left side
    opacity: 0.15,
  },
  backgroundLogo: {
    width: 60,
    height: 60,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  silverContent: {
    alignItems: 'flex-end',  // Align items to the right
    justifyContent: 'flex-start',
    paddingRight: 16,
    zIndex: 1,
  },
  typeContainer: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,

    overflow: 'hidden',
    position: 'relative',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'relative',
    zIndex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  priceContainerSilver: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  shimmerGradient: {
    opacity: 0.4,
    overflow: 'hidden',
  },
  rechargeButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden', // Important for the shimmer effect
  },
  rechargeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  membershipNumber: {
    fontSize: 12,
    opacity: 0.7,
  },
  validUntil: {
    fontSize: 10,
  },
});

export default MembershipCard;