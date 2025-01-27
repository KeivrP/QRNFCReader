import React  from 'react';

import { StatusBar } from 'expo-status-bar';
import BalanceCard from '@/components/home/BalanceCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import BenefitsList from '@/components/home/BenefitsList';
import ProfileHeader from '@/components/home/ProfileHeader';


export default function TabOneScreen() {
    const userName = 'Keiver Pacheco';

    const handleMenuPress = () => {
      console.log('Menú presionado');
    };
  
    const handleNotificationPress = () => {
      console.log('Notificaciones presionadas');
    };


    return (
        <>
            <SafeAreaView>
                <StatusBar style="dark" />
                <ProfileHeader
                   userName={userName}
                   onMenuPress={handleMenuPress}
                   onNotificationPress={handleNotificationPress}
                />
                <BalanceCard price={1500} type="gold" />
                {/*         <BalanceCard price={800} type="silver" />
                <BalanceCard price={300} type="bronze" /> */}

                <BenefitsList />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({

});
