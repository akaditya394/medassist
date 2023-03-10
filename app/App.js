import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { DeviceProvider } from './src/providers/device'
import { Navigation } from './src/providers/navigation'

export default function App() {
  return (
    // <DeviceProvider>
    // <StatusBar style="dark" /> 
    < Navigation />
    // </DeviceProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
