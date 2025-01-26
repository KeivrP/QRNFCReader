import React from 'react';
import {
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as BarCodeScanner from 'expo-barcode-scanner';
import Svg, { Path } from 'react-native-svg';

interface GalleryQRReaderProps {
    onScan: (data: string) => void;
}

const GalleryQRReader = ({ onScan }: GalleryQRReaderProps) => {
    const handlePickQR = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                quality: 1
            });

            if (!result.canceled && result.assets?.[0]) {
                // Scan QR from image
                const scanResults = await BarCodeScanner.scanFromURLAsync(
                    result.assets[0].uri
                );

                if (scanResults.length > 0) {
                    const qrData = scanResults[0].data;
                    onScan(qrData); // Use the onScan prop directly
                    Alert.alert('QR Code', qrData);
                } else {
                    Alert.alert('No QR code found');
                }
            }
        } catch (error) {
            console.error('QR Scan Error:', error);
            Alert.alert('Error scanning QR code');
        }
    };

    return (
        <TouchableOpacity
            style={styles.actionButton}
            onPress={handlePickQR}
        >
            <Svg width={32} height={32} viewBox="0 0 32 26" fill="none">
                <Path
                    d="M22.9456 1C23.8296 1 24.6939 1.26216 25.429 1.75333C26.164 2.2445 26.737 2.94262 27.0753 3.75941C27.4136 4.57619 27.5021 5.47496 27.3297 6.34205C27.1572 7.20915 26.7315 8.00563 26.1063 8.63077C25.4812 9.25591 24.6847 9.68163 23.8176 9.85411C22.9505 10.0266 22.0518 9.93807 21.235 9.59974C20.4182 9.26142 19.7201 8.68849 19.2289 7.9534C18.7377 7.21831 18.4756 6.35408 18.4756 5.47C18.4756 4.28448 18.9465 3.14752 19.7848 2.30923C20.6231 1.47095 21.76 1 22.9456 1V1ZM11.6256 9.88L18.8456 17.1C18.9107 17.1665 18.9885 17.2194 19.0744 17.2554C19.1602 17.2915 19.2524 17.3101 19.3456 17.3101C19.4387 17.3101 19.5309 17.2915 19.6167 17.2554C19.7026 17.2194 19.7804 17.1665 19.8456 17.1L21.2256 15.72C21.3585 15.5881 21.5383 15.5141 21.7256 15.5141C21.9129 15.5141 22.0926 15.5881 22.2256 15.72L30.0356 23.53C30.1355 23.6279 30.2038 23.7535 30.2317 23.8907C30.2596 24.0278 30.2457 24.1701 30.1919 24.2993C30.1381 24.4285 30.0468 24.5385 29.9298 24.6153C29.8128 24.6921 29.6755 24.732 29.5356 24.73H1.70556C1.57719 24.731 1.451 24.6967 1.34082 24.6308C1.23063 24.565 1.14068 24.4701 1.0808 24.3565C1.02093 24.243 0.993431 24.1151 1.00132 23.987C1.00922 23.8588 1.0522 23.7354 1.12556 23.63L10.6256 10.01C10.6816 9.93433 10.7523 9.87075 10.8334 9.82304C10.9146 9.77534 11.0046 9.74449 11.0979 9.73236C11.1913 9.72022 11.2861 9.72704 11.3768 9.75241C11.4674 9.77778 11.5521 9.82117 11.6256 9.88V9.88Z"
                    stroke="#FFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    galleryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        gap: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    actionButton: {
        backgroundColor: '#FFB3B3',
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

export default GalleryQRReader;