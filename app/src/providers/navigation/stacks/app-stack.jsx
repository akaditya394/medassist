import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DEFAULT_SCREENS_OPTIONS, SCREENS } from '../constants'

// Screens
import { UploadScreen } from '../../../screens/upload'
import { UserScreen } from '../../../screens/user'

const { Navigator, Screen } = createStackNavigator()

// Group all screens with card styles.
export const AppNavigator = () => (
    <Navigator
        screenOptions={DEFAULT_SCREENS_OPTIONS}
        initialRouteName={SCREENS.upload}
    >
        <Screen name={SCREENS.upload} component={UploadScreen}></Screen>
        <Screen name={SCREENS.user} component={UserScreen}></Screen>
    </Navigator>
)