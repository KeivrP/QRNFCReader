import React from 'react';
import { StatusBar } from 'expo-status-bar';
import BalanceCard from '@/components/home/BalanceCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, View } from 'react-native';
import BenefitsList from '@/components/home/BenefitsList';
import ProfileHeader from '@/components/home/ProfileHeader';
import { LinearGradient } from 'expo-linear-gradient';
import CardContainer from '@/components/home/CardContainer';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Header from '@/components/ui/Header';
import { useSharedValue } from 'react-native-reanimated';
import Drawer from '@/components/ui/Drawer';
import { useNavigation } from 'expo-router';



const data = {
  data: [
    {
      image: require('@/assets/images/preview/makay.jpg')
    },
    {
      image: require('@/assets/images/preview/makay2.jpg')
    },
    {
      image: require('@/assets/images/preview/makay3.jpg')
    },
    {
      image: require('@/assets/images/preview/makay4.jpg')
    },

  ],
  maxVisibleItems: 3
};

export default function TabOneScreen() {
  const { t } = useTranslation();
  const navigate = useNavigation()
  const userName = 'Keiver Pacheco';
  const active = useSharedValue(false);
  const drawerWidth = useSharedValue(1000);
  const drawerTranslateX = useSharedValue(-drawerWidth.value);


  const handleMenuPress = () => {
    console.log('Menú presionado');
  };

  const handleNotificationPress = () => {
    console.log('Notificaciones presionadas');
  };

  return (
    <LinearGradient
      colors={["#efe8e2", "#efe8e2", "#efe8e2"]}
      style={styles.container}
    >
      {/*     <Header active={active} />
          <Drawer
            active={active}
            translateX={drawerTranslateX}
            drawerWidth={drawerWidth}
          /> */}
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <ProfileHeader
          userName={userName}
          onMenuPress={handleMenuPress}
          onNotificationPress={handleNotificationPress}
        />
        <ScrollView

        >
          <BalanceCard price={300} type="bronze" onRecharge={()=> navigate.navigate('payments')}/>
          <BenefitsList />
          <Text style={styles.sectionTitle}>{t("home.experience")}</Text>
          <View style={styles.cardContainer}>

            <CardContainer data={data.data} maxVisibleItems={3} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    paddingHorizontal: 16,
    marginBottom: heightPercentageToDP('5%'),

  },
  scrollContent: {
    paddingBottom: 40, // Espacio adicional para permitir scroll
  },
  cardContainer: {
    alignItems: 'center',
    height: heightPercentageToDP('40%'),

  }
});