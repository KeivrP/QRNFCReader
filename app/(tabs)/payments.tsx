import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Ellipse, G, Path, Polygon, Rect, SvgXml, Use } from 'react-native-svg';
import { useNavigation } from 'expo-router';

const pagoMovilSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 18H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="7" y="4" width="10" height="12" rx="1" stroke="currentColor" stroke-width="2"/>
</svg>`;

// SVG para el ícono de "Próximamente"
const comingSoonSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
</svg>`;

const clipboardIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const checkIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;


interface ClipboardItemProps {
    label: string;
    value: string;
}

const ClipboardItem = ({ label, value }: ClipboardItemProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await Clipboard.setString(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <View style={styles.clipboardItem}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <TouchableOpacity
                style={[styles.copyButton, copied && styles.copyButtonSuccess]}
                onPress={handleCopy}
                activeOpacity={0.7}
            >
                <SvgXml
                    xml={copied ? checkIcon : clipboardIcon}
                    width={20}
                    height={20}
                    color={copied ? "#fff" : "#4299E1"}
                />
            </TouchableOpacity>
        </View>
    );
};


const PaymentScreen = () => {
    const navigate = useNavigation()
    const [step, setStep] = useState(1);
    const [monto, setMonto] = useState('');
    const [referencia, setReferencia] = useState('');
    const [imagen, setImagen] = useState(null);
    const seleccionarImagen = async () => {
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [8, 16],
            quality: 1,
        });

        if (!resultado.canceled) {
            setImagen(resultado.assets[0].uri);
        }
    };

    const renderPaso = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.pasoContainer}>
                        <Text style={styles.title}>Selecciona el método de pago</Text>

                        <View style={styles.methodsContainer}>
                            {/* Pago Móvil Card */}
                            <TouchableOpacity
                                style={styles.methodCard}
                                onPress={() => setStep(2)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.iconContainer}>
                                    <SvgXml xml={pagoMovilSvg} width={32} height={32} color="#4299E1" />
                                </View>
                                <Text style={styles.methodTitle}>Pago Móvil</Text>
                                <Text style={styles.methodDescription}>Transferencia inmediata</Text>
                            </TouchableOpacity>

                            {/* Coming Soon Card */}
                            <TouchableOpacity
                                style={[styles.methodCard, styles.disabledCard]}
                                disabled={true}
                                activeOpacity={1}
                            >
                                <View style={[styles.iconContainer, styles.disabledIcon]}>
                                    <SvgXml xml={comingSoonSvg} width={32} height={32} color="#A0AEC0" />
                                </View>
                                <Text style={[styles.methodTitle, styles.disabledText]}>Próximamente</Text>
                                <Text style={[styles.methodDescription, styles.disabledText]}>Nuevos métodos de pago</Text>
                                <View style={styles.comingSoonBadge}>
                                    <Text style={styles.comingSoonText}>Próximamente</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.pasoContainer}>
                        <Text style={styles.tituloPrincipal}>Depositar</Text>
                        <Text style={styles.subtitulo}>Datos para Pago Móvil</Text>

                        <View style={styles.datosBancarios}>
                            <ClipboardItem label="Banco" value="BANCO DE VENEZUELA" />
                            <ClipboardItem label="RIF" value="J400000005" />
                            <ClipboardItem label="Teléfono" value="041200000" />

                            <View style={styles.separador} />

                            <Text style={styles.dato}>Tu número de Pago Móvil</Text>
                            <Text style={styles.numeroPago}>0424-100000</Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Monto a recargar"
                            placeholderTextColor="#666"
                            keyboardType="numeric"
                            value={monto}
                            onChangeText={setMonto}
                        />

                        <TouchableOpacity
                            style={[styles.botonSiguiente, !monto && styles.botonDisabled]}
                            onPress={() => monto ? setStep(3) : Alert.alert('Error', 'Ingrese el monto')}
                        >
                            <Text style={styles.textoBoton}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.pasoContainer}>
                        <Text style={styles.titulo}>Verificación de pago</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Número de referencia"
                            placeholderTextColor="#666"
                            keyboardType="numeric"
                            value={referencia}
                            onChangeText={setReferencia}
                        />

                        <TouchableOpacity style={styles.botonImagen} onPress={seleccionarImagen}>
                            <Text style={styles.textoBoton}>Subir captura del pago</Text>
                        </TouchableOpacity>

                        {imagen && (
                            <Image source={{ uri: imagen }} style={styles.imagen} />
                        )}

                        <View style={styles.contenedorBotones}>
                            <TouchableOpacity style={styles.botonAtras} onPress={() => setStep(1)}>
                                <Text style={styles.textoBotonSecundario}>Regresar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.botonSiguiente, (!referencia || !imagen) && styles.botonDisabled]}
                                onPress={() => (referencia && imagen) ? setStep(4) : Alert.alert('Error', 'Complete todos los campos')}
                            >
                                <Text style={styles.textoBoton}>Confirmar pago</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );

            case 4:
                return (
                    <View style={[styles.pasoContainer, styles.centrado]}>

                        <Image source={require('@/assets/images/pending.png')} style={{ width: 420, height: 420 }} />

                        <Text style={styles.titulo}>¡Gracias!</Text>
                        <Text style={styles.mensaje}>
                            Hemos recibido tu solicitud. Estaremos revisando tu pago y te notificaremos una vez completado el proceso.
                        </Text>
                    </View>
                );
        }
    };

    return (
        <LinearGradient
            colors={["#efe8e2", "#efe8e2", "#efe8e2"]}
            style={styles.container}
        >

            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="dark" />
                <View style={styles.progreso}>
                    <View style={[styles.circulo, step >= 1 && styles.circuloActivo]} />
                    <View style={[styles.linea, step >= 2 && styles.lineaActiva]} />
                    <View style={[styles.circulo, step >= 2 && styles.circuloActivo]} />
                    <View style={[styles.linea, step >= 3 && styles.lineaActiva]} />
                    <View style={[styles.circulo, step >= 3 && styles.circuloActivo]} />
                    <View style={[styles.linea, step >= 4 && styles.lineaActiva]} />
                    <View style={[styles.circulo, step >= 4 && styles.circuloActivo]} />
                </View>
                <TouchableOpacity
                    onPress={() => { navigate.goBack() }}
                >
                    <View style={{ flexDirection: "row" }}>


                        <Svg
                            width="32" height="32" viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <G transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#000000" stroke="none">
                                <Path d="M2554 4309 c-32 -17 -79 -47 -104 -67 -138 -113 -1221 -1085 -1305
-1173 -145 -150 -201 -241 -226 -369 -36 -185 37 -355 245 -565 131 -132 1266
-1140 1337 -1187 96 -64 176 -81 252 -54 89 32 145 106 166 221 6 33 11 177
11 332 l0 273 48 -6 c330 -38 564 -101 821 -220 199 -93 390 -225 528 -366
105 -107 121 -127 192 -239 69 -110 92 -130 160 -137 67 -6 129 29 156 87 33
74 9 501 -45 811 -78 441 -253 850 -487 1140 -139 172 -348 349 -546 462 -180
103 -467 200 -677 228 -47 6 -99 13 -117 16 l-31 5 -4 312 c-4 337 -7 356 -62
436 -65 93 -200 119 -312 60z m77 -1034 c39 -71 71 -83 244 -95 557 -38 992
-286 1288 -735 150 -229 271 -563 322 -895 9 -58 18 -113 20 -123 5 -24 -8
-21 -36 9 -13 14 -67 58 -119 98 -398 301 -978 496 -1485 500 -142 1 -152 0
-183 -22 -66 -47 -66 -52 -72 -415 l-5 -328 -555 494 c-305 271 -596 534 -646
584 -169 166 -203 247 -149 353 43 85 191 227 795 764 l555 493 5 -326 c4
-278 7 -330 21 -356z"/>
                            </G>
                        </Svg>
                        <Text>
                            Volver
                        </Text>
                    </View>
                </TouchableOpacity>


                {renderPaso()}

            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    contenedor: {
        flex: 1,
        padding: 20,
    },
    titulo: {

    },

    tituloPrincipal: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
    },
    subtitulo: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 24,
    },
    datosBancarios: {
        backgroundColor: '#F7FAFC',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    clipboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    labelContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        color: '#2D3748',
        fontWeight: '500',
    },
    copyButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#EBF8FF',
        marginLeft: 12,
    },
    copyButtonSuccess: {
        backgroundColor: '#48BB78',
    },
    separador: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 16,
    },
    dato: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 4,
    },
    numeroPago: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    input: {
        backgroundColor: '#F7FAFC',
        padding: 16,
        borderRadius: 12,
        fontSize: 16,
        color: '#2D3748',
        marginBottom: 24,
    },
    botonSiguiente: {
        backgroundColor: '#4299E1',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    botonDisabled: {
        backgroundColor: '#A0AEC0',
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 20,
    },
    methodsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    methodCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        minHeight: 140,
    },
    iconContainer: {
        backgroundColor: '#EBF8FF',
        padding: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    methodTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 4,
    },
    methodDescription: {
        fontSize: 14,
        color: '#718096',
    },
    disabledCard: {
        backgroundColor: '#F7FAFC',
        position: 'relative',
        overflow: 'hidden',
    },
    disabledIcon: {
        backgroundColor: '#EDF2F7',
    },
    disabledText: {
        color: '#A0AEC0',
    },
    comingSoonBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    comingSoonText: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    progreso: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        padding: 16
    },
    circulo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    circuloActivo: {
        backgroundColor: '#c6925e',
        borderColor: '#c6925e',
    },
    linea: {
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
    },
    lineaActiva: {
        backgroundColor: '#c6925e',
    },
    pasoContainer: {
        flex: 1,
        padding: 16
    },
    tituloPrincipal: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#c6925e',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 20,
        color: '#444',
        marginBottom: 30,
        textAlign: 'center',
    },
    datosBancarios: {
        backgroundColor: '#F8F9FA',
        borderRadius: 10,
        padding: 20,
        marginBottom: 25,
    },
    dato: {
        fontSize: 16,
        color: '#444',
        marginBottom: 8,
    },
    numeroPago: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#c6925e',
        textAlign: 'center',
        marginVertical: 15,
    },
    separador: {
        height: 1,
        backgroundColor: '#DEE2E6',
        marginVertical: 15,
    },
    input: {
        height: 50,
        borderColor: '#DEE2E6',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#F8F9FA',
    },
    botonCopiar: {
        backgroundColor: '#c6925e',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    botonImagen: {
        backgroundColor: '#c6925e',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    botonSiguiente: {
        backgroundColor: '#c6925e',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    botonAtras: {
        padding: 15,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    botonDisabled: {
        backgroundColor: '#CED4DA',
    },
    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textoBotonSecundario: {
        color: '#c6925e',
        fontWeight: 'bold',
        fontSize: 16,
    },
    contenedorBotones: {
        flexDirection: 'row',
        marginTop: 20,
    },
    imagen: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        borderRadius: 10,
        marginVertical: 15,
    },
    mensaje: {
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#444',
        paddingHorizontal: 20,
    },
    centrado: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PaymentScreen;