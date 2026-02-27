import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { useThemeStore } from '../../../stores/useThemeStore'
import { lightTheme, darkTheme } from '../../../packages/theme/tokens'

type Props = {
  children: React.ReactNode
}

export default function ScreenWrapper({ children }: Props) {
  const theme = useThemeStore((s: any) => s.theme)
  const tokens = theme === 'dark' ? darkTheme : lightTheme
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: tokens.colors.background }]}>
      <View style={[styles.container, { backgroundColor: tokens.colors.surface }]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 16 }
})
