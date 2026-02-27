import React from 'react'
import { View, StyleSheet } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import ThemeToggle from '../../molecules/reusable/ThemeToggle'
import { useTranslation } from 'react-i18next'

export default function SettingsView() {
  const { t } = useTranslation()
  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <ThemeText style={styles.title}>{t('settings.title')}</ThemeText>
        <View style={{ marginTop: 16 }}>
          <ThemeToggle />
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({ root: { flex: 1 }, title: { fontSize: 20, fontWeight: '600' } })
