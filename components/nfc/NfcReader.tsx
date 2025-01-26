// NFCReader/index.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';

const NFCReader = () => {
  const [isNfcEnabled, setIsNfcEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initNFC = async () => {
      try {
        const supported = await NfcManager.isSupported();
        if (supported) {
          await NfcManager.start();
          setIsNfcEnabled(true);
          setupNFCListener();
        }
      } catch (err) {
        Alert.alert('NFC Error', 'Failed to initialize NFC');
      }
    };

    initNFC();
    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  const setupNFCListener = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, handleTagDiscovery);
  };

  const handleTagDiscovery = async (tag: any) => {
    try {
      Alert.alert('NFC Detected', `Tag ID: ${tag.id}`);
      router.push(`/(tabs)/one?id=${tag.id}`);
      await NfcManager.cancelTechnologyRequest();
    } catch (err) {
      console.warn('NFC Error:', err);
    }
  };

  const startListening = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      handleTagDiscovery(tag);
    } catch (err) {
      console.warn('NFC Error:', err);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  useEffect(() => {
    if (isNfcEnabled) {
      startListening();
    }
  }, [isNfcEnabled]);

  return null; // Invisible component, just handles NFC
};

export default NFCReader;