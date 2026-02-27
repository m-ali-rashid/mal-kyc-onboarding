import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileView from '../../organisms/ProfileView'
import DocumentView from '../../organisms/DocumentView'
import SelfieView from '../../organisms/SelfieView'
import AddressView from '../../organisms/AddressView'
import ReviewView from '../../organisms/ReviewView'

const Stack = createNativeStackNavigator()

function ProfileScreen() {
  return <ProfileView />
}

function DocumentScreen() {
  return <DocumentView />
}

function SelfieScreen() {
  return <SelfieView />
}

function AddressScreen() {
  return <AddressView />
}

function ReviewScreen() {
  return <ReviewView />
}

export default function OnboardingStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Document" component={DocumentScreen} />
      <Stack.Screen name="Selfie" component={SelfieScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  )
}
