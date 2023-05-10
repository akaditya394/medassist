import { useState, useEffect, useCallback } from 'react'
import { StripeProvider } from "@stripe/stripe-react-native";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStack from './navigators/RootStack';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState('')

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await new Promise(resolve => setTimeout(resolve, 2000))
        checkLoginCredentials()
      } catch (error) {
        console.warn(error)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('medassistCredentials')
      .then((result) => {
        if (result != null) {
          setStoredCredentials(JSON.parse(result))
        } else {
          setStoredCredentials(null)
        }
      })
      .catch((error) => console.log(error))
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  // if (!appIsReady) {
  //   return (
  //     <AppLoading
  //       startAsync={checkLoginCredentials}
  //       onFinish={() => setAppIsReady(true)}
  //       onError={console.warn}
  //     />
  //   )
  // }

  return (
    <StripeProvider publishableKey=''>
      <RootStack onLayoutRootView={onLayoutRootView} />
    </StripeProvider>
  );
}
