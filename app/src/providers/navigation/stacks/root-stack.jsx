import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { DEFAULT_SCREENS_OPTIONS, SCREENS } from '../constants'
import { AppNavigator } from './app-stack'

// Screens
import { FiltersScreen } from '../../../screens/filters'
import { RepositoryScreen } from '../../../screens/repository'

const { Navigator, Screen } = createStackNavigator()

// Group all screens with modal styles.
const ModalScreens = () => (
    <>
        <Screen name={SCREENS.filters} component={FiltersScreen}></Screen>
        <Screen name={SCREENS.repository} component={RepositoryScreen}></Screen>
    </>
)

export const RootNavigator = () => (
    <Navigator
        initialRouteName={SCREENS.appStack}
        screenOptions={{
            ...DEFAULT_SCREENS_OPTIONS,
            headerShown: false,
            presentation: "modal"
        }}
    >
        <Screen name={SCREENS.appStack} component={AppNavigator} />
        {ModalScreens()}
    </Navigator>
)