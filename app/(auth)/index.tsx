import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import BottomModal, { BottomModalRef } from '@/components/BottomSheet';
import { QRScanner } from '@/components/qr/qrScanner';
import WavyLines from '@/components/login/WavyLines';
import QrCodeButton from '@/components/login/QrCodeButton';
import { useFocusEffect, useNavigation } from 'expo-router';
import NFCReader from '@/components/nfc/NfcReader';

const { width } = Dimensions.get('window');

export default function TabTwoScreen() {
  const pulseAnim1 = useSharedValue(1);
  const pulseAnim2 = useSharedValue(1);
  const { t } = useTranslation();

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      pulseAnim1.value = withRepeat(
        withTiming(1.5, {
          duration: 1500,
          easing: Easing.ease
        }),
        -1,
        true
      );
      pulseAnim2.value = withRepeat(
        withTiming(2, {
          duration: 1500,
          easing: Easing.ease
        }),
        -1,
        true
      );

      return () => {
        pulseAnim1.value = 1;
        pulseAnim2.value = 1;
      };
    }, [])
  );

  const pulseStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim1.value }],
    opacity: 1 - (pulseAnim1.value - 1)
  }));

  const pulseStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim2.value }],
    opacity: 1 - (pulseAnim2.value - 1)
  }));

  return (
    <>
      <StatusBar style="dark" />
      <LinearGradient
        colors={["#efe8e2", "#efe8e2", "#efe8e2"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.main}>
          {/* Wavy Lines */}
          <WavyLines />
          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Audio Wave Icon with Animation 
            {/* Audio Wave Icon with Animation */}
            <View style={{ position: 'relative', marginBottom: 64 }}>
              {/* Pulse Rings */}
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    backgroundColor: '#c6925e',
                    borderRadius: 16,
                    width: 80,
                    height: 80
                  },
                  pulseStyle1
                ]}
              />
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    backgroundColor: '#c6925e',
                    borderRadius: 16,
                    width: 80,
                    height: 80
                  },
                  pulseStyle2
                ]}
              />

              {/* Icon Container */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#c6925e',
                  borderRadius: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <View style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }}>
                  <Svg viewBox="0 0 24 24" width={48} height={48} fill="none" stroke="#0d0f0b" strokeWidth={3}>
                    <Path d="M12 2v20M17 5v14M7 5v14M2 8v8M22 8v8" strokeLinecap="round" />
                  </Svg>
                </View>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>
              {t('start.title')}
            </Text>
            {/* QR Code Button */}
            <QrCodeButton navigation={navigation} />
          </View>
        </View>
        <NFCReader />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: width - 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContent: {
    flex: 1, width: width - 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 16
  }
});



