import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function TabTwoScreen() {
  const pulseAnim1 = useSharedValue(1);
  const pulseAnim2 = useSharedValue(1);

  React.useEffect(() => {
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
  }, []);

  const pulseStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim1.value }],
    opacity: 1 - (pulseAnim1.value - 1)
  }));

  const pulseStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim2.value }],
    opacity: 1 - (pulseAnim2.value - 1)
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'linear-gradient(to bottom right, #FFE5E5, #E5F0FF, #F5F5F5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
      }}
    >
      <View style={{ width: 320, height: 680 }}>
        {/* Wavy Lines */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: [{ translateY: -96 }]
          }}
        >
          <Svg width="100%" height={40} viewBox="0 0 320 40">
            <Path
              d="M-10 20C30 10 50 30 90 20C130 10 150 30 190 20C230 10 250 30 290 20C330 10 350 30 390 20"
              stroke="#FFB3B3"
              strokeWidth={1}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        {/* Main Content */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 32
          }}
        >
          {/* Audio Wave Icon with Animation */}
          <View style={{ position: 'relative', marginBottom: 64 }}>
            {/* Pulse Rings */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  backgroundColor: '#FFB3B3',
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
                  backgroundColor: '#FFB3B3',
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
                backgroundColor: '#FFB3B3',
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
                <Svg viewBox="0 0 24 24" width={32} height={32} fill="none" stroke="white" strokeWidth={2}>
                  <Path d="M12 2v20M17 5v14M7 5v14M2 8v8M22 8v8" strokeLinecap="round" />
                </Svg>
              </View>
            </View>
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: '#1a1a1a',
              textAlign: 'center',
              lineHeight: 32,
              marginBottom: 16
            }}
          >
            Acerca tu dispositivo{'\n'}para comenzar
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#666',
              textAlign: 'center',
              marginBottom: 64
            }}
          >
            o elige otra opción
          </Text>

          {/* QR Code Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 64,
              width: 64,
              height: 64,
              backgroundColor: '#FFB3B3',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}
          >
            <View style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }}>

              <Svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} width={32} height={32}>
                <Path d="M23 4C23 2.34315 21.6569 1 20 1H16C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 21.4477 9 22 9C22.5523 9 23 8.55228 23 8V4Z" fill="#0F0F0F"></Path>
                <Path d="M23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23H20C21.6569 23 23 21.6569 23 20V16Z" fill="#0F0F0F"></Path>
                <Path d="M4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16V20C1 21.6569 2.34315 23 4 23H8C8.55228 23 9 22.5523 9 22C9 21.4477 8.55228 21 8 21H4Z" fill="#0F0F0F"></Path>
                <Path d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8V4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1H4C2.34315 1 1 2.34315 1 4V8Z" fill="#0F0F0F"></Path>
                <Path fillRule="evenodd" clipRule="evenodd" d="M11 6C11 5.44772 10.5523 5 10 5H6C5.44772 5 5 5.44772 5 6V10C5 10.5523 5.44772 11 6 11H10C10.5523 11 11 10.5523 11 10V6ZM9 7.5C9 7.22386 8.77614 7 8.5 7H7.5C7.22386 7 7 7.22386 7 7.5V8.5C7 8.77614 7.22386 9 7.5 9H8.5C8.77614 9 9 8.77614 9 8.5V7.5Z" fill="#0F0F0F"></Path>
                <Path fillRule="evenodd" clipRule="evenodd" d="M18 13C18.5523 13 19 13.4477 19 14V18C19 18.5523 18.5523 19 18 19H14C13.4477 19 13 18.5523 13 18V14C13 13.4477 13.4477 13 14 13H18ZM15 15.5C15 15.2239 15.2239 15 15.5 15H16.5C16.7761 15 17 15.2239 17 15.5V16.5C17 16.7761 16.7761 17 16.5 17H15.5C15.2239 17 15 16.7761 15 16.5V15.5Z" fill="#0F0F0F"></Path>
                <Path d="M14 5C13.4477 5 13 5.44772 13 6C13 6.55229 13.4477 7 14 7H16.5C16.7761 7 17 7.22386 17 7.5V10C17 10.5523 17.4477 11 18 11C18.5523 11 19 10.5523 19 10V6C19 5.44772 18.5523 5 18 5H14Z" fill="#0F0F0F"></Path>
                <Path d="M14 8C13.4477 8 13 8.44771 13 9V10C13 10.5523 13.4477 11 14 11C14.5523 11 15 10.5523 15 10V9C15 8.44772 14.5523 8 14 8Z" fill="#0F0F0F"></Path>
                <Path d="M6 13C5.44772 13 5 13.4477 5 14V16C5 16.5523 5.44772 17 6 17C6.55229 17 7 16.5523 7 16V15.5C7 15.2239 7.22386 15 7.5 15H10C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13H6Z" fill="#0F0F0F"></Path>
                <Path d="M10 17C9.44771 17 9 17.4477 9 18C9 18.5523 9.44771 19 10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17Z" fill="#0F0F0F"></Path>
              </Svg>

            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
