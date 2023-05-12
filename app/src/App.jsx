import { useState, useEffect, useCallback } from 'react'
import { StripeProvider } from "@stripe/stripe-react-native";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import RootStack from './navigators/RootStack';
import { persistor, store } from "./store";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState('')

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await new Promise(resolve => setTimeout(resolve, 2000))
        helper()
      } catch (error) {
        console.warn(error)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const helper = () => {
    AsyncStorage.getItem('medassistPerson')
      .then((result) => {
        if (result != null) {
          // setStoredCredentials(JSON.parse(result))
          console.log(JSON.parse(result))
        } else {
          // setStoredCredentials(null)
          console.log('hello')
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

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StripeProvider publishableKey=''>
          <RootStack onLayoutRootView={onLayoutRootView} />
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
}
