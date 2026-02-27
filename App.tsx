import React from 'react'
import './packages/i18n/i18n'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthStore } from './stores/useAuthStore'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import OnboardingKycStack from './screens/OnboardingKycStack'
import SettingsScreen from './screens/SettingsScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  const session = useAuthStore((s: any) => s.session)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingKycStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

