import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import LocationCard from '@/components/LocationCard';
import LocationScreen from '@/components/Locations';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LocationScreen />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    gap: 10,
    padding: 10,
  },
  column: {
    gap: 10,
  },
});