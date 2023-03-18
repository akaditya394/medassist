import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './screens/login'
import SignUpScreen from './screens/signup'
import AllPrescriptionsScreen from './screens/allPrescriptions'
import ForgotPasswordScreen from './screens/forgotPassword'
import AllResultsScreen from './screens/allResults'
import OnboardingScreen from './screens/onboarding'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboarding'>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AllPrescriptions" component={AllPrescriptionsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AllResults" component={AllResultsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}