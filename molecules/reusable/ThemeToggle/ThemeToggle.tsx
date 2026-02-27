import React from 'react'
import { View, Switch, StyleSheet } from 'react-native'
import ThemeText from '../ThemeText'
import { useThemeStore } from '../../../stores/useThemeStore'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {
  const { t } = useTranslation()
  const theme = useThemeStore((s: any) => s.theme)
  const toggle = useThemeStore((s: any) => s.toggle)

  return (
    <View style={styles.row}>
      <ThemeText style={styles.label}>{t('settings.theme')}</ThemeText>
      <Switch value={theme === 'dark'} onValueChange={toggle} />
    </View>
  )
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, label: { fontSize: 16 } })
