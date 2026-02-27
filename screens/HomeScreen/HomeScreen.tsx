import React from 'react'
import HomeView from '../../organisms/HomeView'
import { useHomeController } from '../../organisms/HomeView/homeViewHelper'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const { user, loading, error, handleLogout } = useHomeController()
  const navigation = useNavigation<any>()
  const handleStart = () => {
    navigation.navigate('Onboarding')
  }

  return <HomeView fullName={user?.fullName ?? 'User'} onLogout={handleLogout} onStart={handleStart} />
}

