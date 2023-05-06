import { useState } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/login";
import SignUpScreen from "./screens/signup";
import AllPrescriptionsScreen from "./screens/allPrescriptions";
import ForgotPasswordScreen from "./screens/forgotPassword";
import AllResultsScreen from "./screens/allResults";
import OnboardingScreen from "./screens/onboarding";
import SettingsScreen from "./screens/settings";
import ResetPasswordScreen from "./screens/resetPassword";
import UploadScreen from "./screens/upload";
import ResultScreen from "./screens/result";
import SideEffectsScreen from "./screens/sideEffects";
import PrescriptionScreen from "./screens/prescription";
import VerifiedResultScreen from "./screens/verifiedResult";
import UnverifiedResultScreen from "./screens/unverifiedResult";
import MedicalHistoryScreen from "./screens/medicalHistory";
import UpdatedPrescriptionScreen from './screens/updatedPrescription';

const Stack = createNativeStackNavigator();

export default function App() {
  const [authSession, setAuthSession] = useState('jbgv')

  return (
    <NavigationContainer independent>
      {authSession ? (
        <Stack.Navigator initialRouteName="AllPrescriptions" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name="AllPrescriptions"
            component={AllPrescriptionsScreen}
          />
          <Stack.Screen
            name="AllResults"
            component={AllResultsScreen}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
          />
          <Stack.Screen
            name="Upload"
            component={UploadScreen}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
          />
          <Stack.Screen
            name="SideEffects"
            component={SideEffectsScreen}
          />
          <Stack.Screen
            name="Prescription"
            component={PrescriptionScreen}
          />
          <Stack.Screen
            name="VerifiedResult"
            component={VerifiedResultScreen}
          />
          <Stack.Screen
            name="UnverifiedResult"
            component={UnverifiedResultScreen}
          />
          <Stack.Screen
            name="MedicalHistory"
            component={MedicalHistoryScreen}
          />
          <Stack.Screen
            name="UpdatedPrescription"
            component={UpdatedPrescriptionScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
