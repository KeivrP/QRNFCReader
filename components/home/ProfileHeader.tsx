import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import Svg, { G, Path } from 'react-native-svg';

interface ProfileHeaderProps {
    userName: string;
    onMenuPress: () => void;
    onNotificationPress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userName, onMenuPress, onNotificationPress }) => {
    const { t } = useTranslation();
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
                    <Text style={styles.greetingText}>{t("profile.start")}</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>

            {/* Parte derecha: Íconos de menú y notificaciones */}
            <View style={styles.rightSection}>
                <TouchableOpacity onPress={onNotificationPress}>

                    <Svg
                        width="32" height="32" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <G transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#0d0f0b" stroke="none">
                            <Path d="M2330 4835 c-689 -103 -1248 -677 -1350 -1385 -6 -41 -15 -167 -20-280 -16 -365 -28 -400 -269 -773 -126 -196 -156 -254 -181 -353 -28 -110 -35
                                   -198 -21 -295 15 -107 34 -165 82 -259 74 -143 185 -253 324 -319 71 -35 249 -87 426 -126 l126 -28 33 -72 c100 -229 303 -434 545 -551 346 -168 724 -168 1070 0 244 118 444 321 545 550 l32 72 142 33 c362 84 476 133 594 251 234
                                    234 296 577 159 873 -13 28 -75 131 -138 227 -62 96 -128 203 -147 238 -71 132 -105 308 -132 687 -25 357 -140 655 -361 930 -257 321 -629 532 -1032 585
                                   -104 13 -321 11 -427 -5z m410 -316 c359 -50 697 -278 897 -604 131 -214 203 -469 203 -720 0 -106 27 -314 55 -423 45 -177 87 -267 236 -498 150 -234 178
                                   -293 186 -394 14 -169 -81 -345 -225 -419 -126 -64 -656 -172 -1047 -213 -160 -17 -810 -17 -970 0 -407 42 -933 151 -1057 219 -57 31 -137 113 -166 169 -58
                                    113 -66 250 -23 365 12 31 80 148 152 260 168 263 192 305 228 414 42 127 60 248 71 485 11 236 19 301 55 423 75 260 241 510 445 671 144 114 255 173 425
                                    224 185 57 339 68 535 41z m-716 -3586 c223 -25 846 -25 1079 1 93 10 170 16 172 14 9 -8 -92 -114 -163 -170 -85 -68 -204 -127 -317 -160 -68 -20 -103 -23
                                   -235 -23 -131 0 -167 4 -233 23 -186 53 -353 160 -458 293 -37 47 -48 45 155 22z"/>
                        </G>
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={onMenuPress}>

                    <Svg
                        width="32" height="32" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <G transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#000000" stroke="none">
                            <Path d="M935 4624 c-188 -46 -356 -187 -440 -369 -58 -126 -60 -142 -60 -585
0 -453 1 -465 73 -610 27 -55 58 -97 117 -156 89 -91 169 -140 285 -176 74
-23 83 -23 500 -23 l425 0 80 28 c171 61 308 177 383 328 71 142 72 152 72
609 0 323 -3 418 -15 468 -43 180 -178 349 -347 431 -143 70 -152 71 -608 70
-317 0 -418 -4 -465 -15z m926 -321 c79 -39 140 -102 177 -181 l27 -57 0 -395
0 -395 -27 -55 c-39 -80 -88 -132 -160 -171 l-63 -34 -410 0 -410 0 -50 25
c-64 31 -144 111 -175 175 l-25 50 0 405 0 405 27 55 c48 97 143 175 245 199
21 5 205 9 408 8 l370 -2 66 -32z"/>
                            <Path d="M3285 4625 c-227 -62 -396 -212 -471 -419 -39 -109 -46 -206 -41
-593 5 -401 7 -416 78 -554 78 -149 221 -272 382 -326 l82 -28 430 0 430 0 81
28 c163 55 305 176 383 326 75 144 76 155 76 611 0 452 -2 469 -70 606 -43 85
-101 157 -175 216 -70 57 -111 80 -202 115 l-73 28 -430 2 c-339 2 -441 -1
-480 -12z m912 -319 c73 -34 153 -113 186 -183 21 -47 22 -57 22 -448 l0 -400
-33 -67 c-36 -74 -95 -132 -170 -170 -47 -23 -47 -23 -457 -23 l-410 0 -63 34
c-75 41 -125 94 -161 170 l-26 56 0 400 0 400 32 60 c49 95 143 171 240 194
21 5 205 9 408 8 l370 -2 62 -29z"/>
                            <Path d="M933 2300 c-231 -61 -401 -225 -475 -460 -23 -74 -23 -83 -23 -490 0
-407 0 -417 23 -490 36 -115 86 -195 176 -285 87 -86 154 -128 271 -167 69
-23 76 -23 500 -23 l430 0 82 28 c164 55 310 182 384 332 68 139 69 151 69
605 0 456 -1 465 -72 610 -79 163 -242 294 -424 340 -71 18 -111 20 -473 19
-355 0 -404 -2 -468 -19z m858 -294 c110 -25 197 -98 248 -205 l26 -56 0 -395
0 -395 -27 -57 c-33 -71 -106 -146 -173 -177 -77 -36 -165 -43 -515 -39 -310
4 -328 5 -382 27 -76 29 -156 103 -193 178 l-30 58 0 405 c0 395 1 406 22 452
44 95 151 184 250 207 64 15 709 13 774 -3z"/>
                            <Path d="M933 2300 c-231 -61 -401 -225 -475 -460 -23 -74 -23 -83 -23 -490 0
-407 0 -417 23 -490 36 -115 86 -195 176 -285 87 -86 154 -128 271 -167 69
-23 76 -23 500 -23 l430 0 82 28 c164 55 310 182 384 332 68 139 69 151 69
605 0 456 -1 465 -72 610 -79 163 -242 294 -424 340 -71 18 -111 20 -473 19
-355 0 -404 -2 -468 -19z m858 -294 c110 -25 197 -98 248 -205 l26 -56 0 -395
0 -395 -27 -57 c-33 -71 -106 -146 -173 -177 -77 -36 -165 -43 -515 -39 -310
4 -328 5 -382 27 -76 29 -156 103 -193 178 l-0 58 0 405 c0 395 1 406 22 452
44 95 151 184 250 207 64 15 709 13 774 -3z" fill="#FF0000" />
                        </G>
                    </Svg>
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
        color: '#0d0f0b',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0d0f0b',
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