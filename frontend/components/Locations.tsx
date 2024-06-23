import LocationCard from '@/components/LocationCard';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import GenerateCards from "@/components/Card"
import {
  useAnimatedReaction,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

const locations = GenerateCards();

export default function LocationScreen() {
  const [locs, setLocations] = useState(locations);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    if (index > locations.length - 3) {
      console.warn('Last 2 cards remining. Fetch more!');
      setLocations((locs) => [...locs, ...locations.reverse()]);
    }
  }, [index]);

  const onResponse = (res: boolean) => {
    console.log('on Response: ', res);
  };

  return (
    <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Stack.Screen options={{ headerShown: false }} />
        {locations.map((place, index) => (
            <Pressable onPress={() => alert(place.Description)}>
                <LocationCard
                    key={`${place.id}`}
                    place={place}
                    numOfCards={locations.length}
                    index={index}
                    activeIndex={activeIndex}
                    onResponse={onResponse}
                />
            </Pressable>
        ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
})