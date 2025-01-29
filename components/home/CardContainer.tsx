import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import Card from './Card';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

interface CardContainerProps {
    data: any[];
    maxVisibleItems: number;
}

const CardContainer: React.FC<CardContainerProps> = ({ data, maxVisibleItems }) => {
    const animatedValue = useSharedValue(0);
    const currentIndex = useSharedValue(0);
    const prevIndex = useSharedValue(0);
    const { t } = useTranslation();

    return (
        <>
            <Text style={{
                fontSize: 24,
                marginBottom: 200,
                fontWeight: 'bold',
                color: '#2D3748',
            }}>{t("rewards.title")}</Text>

            {data.map((item, index) => {
                return (
                    <Card
                        maxVisibleItems={maxVisibleItems}
                        item={item}
                        index={index}
                        dataLength={data.length}
                        animatedValue={animatedValue}
                        currentIndex={currentIndex}
                        prevIndex={prevIndex}
                        key={index}
                    />
                );
            })}
        </>
    );
};

export default CardContainer;