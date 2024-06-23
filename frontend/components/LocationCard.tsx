import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Location } from '@/components/Card'
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('screen').width;
export const locationCardWidth = screenWidth * 0.8;

type LocationCard = {
  place: Location;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  onResponse: (a: boolean) => void;
};

const LocationCard = ({
  place,
  numOfCards,
  index,
  activeIndex,
  onResponse,
}: LocationCard) => {
  const translationX = useSharedValue(0);

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 5, 1, 1]
    ),
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0.95, 1, 1]
        ),
      },
      {
        translateY: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [-30, 0, 0]
        ),
      },
      {
        translateX: translationX.value,
      },
      {
        rotateZ: `${interpolate(
          translationX.value,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-15, 0, 15]
        )}deg`,
      },
    ],
  }));

  const gesture = Gesture.Pan()
    .onChange((event) => {
      translationX.value = event.translationX;

      activeIndex.value = interpolate(
        Math.abs(translationX.value),
        [0, 500],
        [index, index + 0.8]
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 400) {
        translationX.value = withSpring(Math.sign(event.velocityX) * 500, {
          velocity: event.velocityX,
        });
        activeIndex.value = withSpring(index + 1);

        runOnJS(onResponse)(event.velocityX > 0);
      } else {
        translationX.value = withSpring(0);
      }
    });

  return (
    <GestureHandlerRootView>
        <GestureDetector gesture={gesture}>
        <Animated.View
            style={[
            styles.card,
            animatedCard,
            {
                zIndex: numOfCards - index,
            },
            ]}
        >
            <Image
            style={[StyleSheet.absoluteFillObject, styles.image]}
            source={require('@/assets/images/marco.jpg')}
            />

            <LinearGradient
            // Background Linear Gradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={[StyleSheet.absoluteFillObject, styles.overlay]}
            />

            <View style={styles.footer}>
            <Text style={styles.name}>{place.Place} ({place.Price}) - {place.Type}</Text>
            <Text style={styles.city}>{place.City}, Distance: {place.Distance} miles</Text>
            <Text style={styles.description}>{place.Description}</Text>
            </View>
        </Animated.View>
        </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: locationCardWidth,
    aspectRatio: 1 / 1.67,
    borderRadius: 15,
    justifyContent: 'flex-end',

    position: 'static',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,

    elevation: 3,
  },
  image: {
    borderRadius: 0,
    position: 'absolute',
    borderWidth: 4,
    alignContent: 'center'
  },
  overlay: {
    // top: '10%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footer: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'InterBold',
  },
  city: {
    fontSize: 24,
    color: 'yellow',
    fontFamily: 'InterBold',
  },
  description: {
    fontSize: 18,
    color: 'tan',
    fontFamily: 'InterBold',
  },
});

export default LocationCard;