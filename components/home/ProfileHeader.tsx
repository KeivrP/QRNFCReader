import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

interface ProfileHeaderProps {
    userName: string;
    onMenuPress: () => void;
    onNotificationPress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userName, onMenuPress, onNotificationPress }) => {
    return (
        <View style={styles.header}>
            {/* Parte izquierda: Avatar y nombre */}
            <View style={styles.leftSection}>
                <TouchableOpacity>
                    <Image
                        source={{ uri: 'https://avatar.iran.liara.run/public/15' }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hola</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>

            {/* Parte derecha: Íconos de menú y notificaciones */}
            <View style={styles.rightSection}>
                <TouchableOpacity onPress={onNotificationPress}>
                    <Fontisto name="bell" size={24} color="#4A5568" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onMenuPress}>
                    <MaterialIcons name="menu" size={24} color="#4A5568" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'transparent',

    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatarIcon: {
        backgroundColor: '#EDF2F7',
        borderRadius: 12,
        padding: 8,
    },
    greetingContainer: {
        marginLeft: 8,
    },
    greetingText: {
        fontSize: 14,
        color: '#4A5568',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    icon: {
        marginLeft: 8,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E2E8F0',
    },
});

export default ProfileHeader;