import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export const Loading = (): JSX.Element => {
  const animatedValues = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ];

  React.useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) => 
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            delay: 325 * (index + 1),
            useNativeDriver: true
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          })
        ])
      )
    );

    animations.forEach(animation => animation.start());

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, []);

  const loaderColors = ['#5d9960', '#82a587', '#8bac74', '#b9bf90', '#e7d2ab'];

  return (
    <View style={styles.container}>
      {animatedValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.loader,
            { 
              backgroundColor: loaderColors[index],
              opacity: animatedValue.interpolate({
                inputRange: [0, 0.5, 0.8, 1],
                outputRange: [1, 0.7, 1, 1]
              }),
              transform: [
                {
                  rotate: animatedValue.interpolate({
                    inputRange: [0, 0.75, 1],
                    outputRange: ['0deg', '90deg', '0deg']
                  })
                }
              ]
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    width: 20,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 5
  }
});

export default Loading;