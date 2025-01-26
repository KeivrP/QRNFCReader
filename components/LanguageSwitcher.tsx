import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
      <TouchableOpacity 
        onPress={() => changeLanguage('es')}
        style={{ 
          backgroundColor: currentLang === 'es' ? 'blue' : 'gray', 
          padding: 10, 
          margin: 5 
        }}
      >
        <Text style={{ color: 'white' }}>Español</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => changeLanguage('en')}
        style={{ 
          backgroundColor: currentLang === 'en' ? 'blue' : 'gray', 
          padding: 10, 
          margin: 5 
        }}
      >
        <Text style={{ color: 'white' }}>English</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSwitcher;