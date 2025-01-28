import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP } from 'react-native-responsive-screen';


interface BenefitsCardProps {
  id: string;
  title: string;
  imageUrl: any;
  onClick: (id: string) => void;
}

const BenefitsCard = ({ id, title, imageUrl, onClick }: BenefitsCardProps) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.button}
        onPress={() => onClick(id)}
      >
        <ImageBackground
          source={imageUrl}
          style={styles.image}
        >
        </ImageBackground>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const BenefitsList = () => {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const benefitsData = [
    { id: '1', title: t("rewards.drinks"), imageUrl: require("@/assets/images/benefits/drink.png") },
    { id: '2', title: t('rewards.snacks'), imageUrl: require("@/assets/images/benefits/snack.png") },
    { id: '3', title: t("rewards.packs"), imageUrl: require("@/assets/images/benefits/beach.png") },
  ];

  console.log(selectedCategory);

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.sectionTitle}>{t("rewards.title")}</Text>
      <Text style={[{ fontSize: 12, marginTop: -10 }]}>{t("rewards.subtitle")}</Text>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={benefitsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BenefitsCard id={item.id} title={item.title} imageUrl={item.imageUrl} onClick={setSelectedCategory} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,

  },
  listContainer: {
    gap: widthPercentageToDP('4%'),
    alignContent: 'space-between',
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
    maxWidth: widthPercentageToDP('25%'),
    color: '#0d0f0b',
    textAlign: 'center',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    elevation: 5,
    gap: 8
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BenefitsList;