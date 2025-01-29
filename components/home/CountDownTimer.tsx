import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        hours: 24,
        minutes: 0,
        seconds: 0
    });

    // Animación para el progreso circular
    const [progressAnimation] = useState(new Animated.Value(0));
    const TOTAL_SECONDS = 24 * 60 * 60;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(current => {
                if (current.hours === 0 && current.minutes === 0 && current.seconds === 0) {
                    clearInterval(interval);
                    return current;
                }

                let newHours = current.hours;
                let newMinutes = current.minutes;
                let newSeconds = current.seconds;

                if (newSeconds === 0) {
                    if (newMinutes === 0) {
                        if (newHours === 0) {
                            return current;
                        }
                        newHours -= 1;
                        newMinutes = 59;
                        newSeconds = 59;
                    } else {
                        newMinutes -= 1;
                        newSeconds = 59;
                    }
                } else {
                    newSeconds -= 1;
                }

                // Calcular el progreso para la animación
                const secondsLeft = (newHours * 3600) + (newMinutes * 60) + newSeconds;
                const progress = 1 - (secondsLeft / TOTAL_SECONDS);
                Animated.timing(progressAnimation, {
                    toValue: progress,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();

                return {
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num: number): string => {
        return num.toString().padStart(2, '0');
    };

    return (

            <Text style={styles.timeText}>
                {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </Text>
    );
};

const styles = StyleSheet.create({
    timeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    number: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
    },


});

export default CountdownTimer;