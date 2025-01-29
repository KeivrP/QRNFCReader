import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, ImageBackground, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import BottomModal, { BottomModalRef } from '../BottomSheet';
import { benefitDetails } from '@/data/beneficts';
import { SvgXml } from 'react-native-svg';
import { BenefitItem, getCategoryIcon, getCategoryTitle, processBenefitDetails } from './EnhacedBottomModal';
import CountdownTimer from './CountDownTimer';


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
    <View style={{ alignItems: 'center' }}>
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
  const bottomModalRef = useRef<BottomModalRef>(null);
  const [selectedBenefitId, setSelectedBenefitId] = useState<string | null>(null);
  const categoryIcon = getCategoryIcon(selectedBenefitId);
  const processedBenefits = processBenefitDetails(benefitDetails[selectedBenefitId] || []);

  const benefitsData = [
    { id: '1', title: t("rewards.drinks"), imageUrl: require("@/assets/images/benefits/drink.png") },
    { id: '2', title: t('rewards.snacks'), imageUrl: require("@/assets/images/benefits/snack.png") },
    { id: '3', title: t("rewards.packs"), imageUrl: require("@/assets/images/benefits/beach.png") },
  ];

  return (
    <View style={{ paddingHorizontal: 16 }}>

      <Text style={styles.sectionTitle}>{t("rewards.title")}
      </Text>
      <Text style={[{ fontSize: 12, marginTop: -10 }]}>{t("rewards.subtitle")}</Text>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={benefitsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BenefitsCard
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              onClick={(id) => {
                setSelectedBenefitId(id);
                bottomModalRef.current?.open();
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
          <Text style={{fontSize: 10, marginBottom: 2}}> Renovación de beneficios en <CountdownTimer /></Text>
          

      </View>
      <BottomModal ref={bottomModalRef} snapPoint={600}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            {categoryIcon && (
              <SvgXml
                xml={categoryIcon}
                width={32}
                height={32}
                color="#2D3748"
              />
            )}
            <Text style={styles.modalTitle}>
              {getCategoryTitle(selectedBenefitId)}
            </Text>
          </View>
          <ScrollView style={styles.benefitsList}>
            {processedBenefits.map((item, index) => (
              <BenefitItem key={index} item={item} />
            ))}
          </ScrollView>
        </View>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginLeft: 12,
  },
  benefitsList: {
    flex: 1,
  },
  benefitItem: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4299E1',
  },
  benefitText: {
    fontSize: 16,
    color: '#2D3748',
  },
  unavailableText: {
    color: '#E53E3E',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
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
  modalContent: {
    padding: 20,
  },
  detailItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#2D3748',
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