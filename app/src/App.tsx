import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from './App.scss';

export default function App() {
  return (
    <View className={styles.container}>
      <Text className={styles.text}>This is app using scss to create styling the components</Text>
      <StatusBar style="auto" />
    </View>
  );
}
