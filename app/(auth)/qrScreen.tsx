import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { QRScanner } from '../../components/qr/qrScanner';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import GalleryQRReader from '@/components/qr/GalleryQrUpload';

const QrScreen = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState<string>('');
    const route = useRouter();
    const scanAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(scanAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (data) {
                setIsVisible(false);
                Alert.alert('QR Escaneado', data);
                route.navigate(`/(tabs)/one`);
            } else {
                setIsVisible(true);
            }
        }, [data])
    );

    const translateY = scanAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 15]
    });

    return (
        <>
            <StatusBar style="dark" />
            <LinearGradient
                colors={["#efe8e2", "#efe8e2", "#efe8e2"]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Área principal de escaneo */}
                <View style={styles.scanContainer}>
                    <QRScanner onScan={(e) => setData(e)} isVisble={isVisible} />
                    {/* Overlay de escaneo */}
                    <View style={styles.overlay}>
                        <Animated.View style={[styles.scanFrame, { transform: [{ translateY }] }]}>
                            <View style={styles.scanLine} />
                        </Animated.View>

                        <Text style={styles.instructions}>
                            Enfoca el código QR dentro del marco
                        </Text>
                    </View>
                </View>

                {/* Footer con controles */}
                <View style={styles.footer}>
                    <GalleryQRReader onScan={(e) => setData(e)} />
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#c6925e' }]}
                        onPress={() => route.back()}
                    >
                        <FontAwesome6 name="xmark" size={24} color="#0f0d0b" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    scanContainer: {
        flex: 1,
        marginHorizontal: widthPercentageToDP('5%'),
        borderRadius: 24,
        marginTop: heightPercentageToDP('10%'),
        overflow: 'hidden',
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#c6925e',
        borderRadius: 24,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
    },
    scanLine: {
        height: 0,
        width: '100%',
        backgroundColor: '#c6925e',
        opacity: 0.8,
    },
    instructions: {
        position: 'absolute',
        bottom: 40,
        color: '#0f0d0b',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
        paddingBottom: 40,
    },
    actionButton: {
        backgroundColor: '#c6925e',
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default QrScreen;