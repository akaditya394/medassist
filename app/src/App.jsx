import { useState, useEffect, useCallback } from 'react'
import { StripeProvider } from "@stripe/stripe-react-native";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NetInfo from "@react-native-community/netinfo";

import RootStack from './navigators/RootStack';
import { persistor, store } from "./store";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [loggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await new Promise(resolve => setTimeout(resolve, 2000))
        isAuthenticatedChecker()
        isAppFirstLaunchedChecker()
      } catch (error) {
        console.warn(error)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const isAppFirstLaunchedChecker = () => {
    AsyncStorage.getItem('isAppFirstLaunched')
      .then((result) => {
        if (result == null) {
          setIsAppFirstLaunched(true)
          AsyncStorage.setItem('isAppFirstLaunched', 'false')
        } else {
          setIsAppFirstLaunched(false)
        }
      })
      .catch((error) => console.log(error))
  }

  const isAuthenticatedChecker = () => {
    AsyncStorage.getItem('medassistPerson')
      .then((result) => {
        if (result != null) {
          // setLoggedIn(JSON.parse(result))
        } else {
          // setLoggedIn(null)
          console.log('nothing')
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
          <RootStack
            onLayoutRootView={onLayoutRootView}
            isAppFirstLaunched={isAppFirstLaunched}
            isConnected={isConnected}
          // loggedIn={loggedIn}
          />
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
}
