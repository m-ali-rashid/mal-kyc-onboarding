import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import { useTranslation } from 'react-i18next'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import LanguageSwitcher from '../../molecules/reusable/LanguageSwitcher'

type Props = {
  fullName: string
  onLogout: () => void
  onStart?: () => void
}

export default function HomeView({ fullName, onLogout, onStart }: Props) {
  const { t } = useTranslation()
  return (
    <ScreenWrapper>
      <View style={{ marginBottom: 16 }}>
        <LanguageSwitcher />
      </View>
      <View style={styles.root}>
        <ThemeText style={styles.title}>{t('home.welcome')}</ThemeText>
        <ThemeText style={styles.name}>{fullName}</ThemeText>
        <Button title={t('home.logout')} onPress={onLogout} />
        {typeof (onStart) !== 'undefined' ? <View style={{ height: 12 }} /> : null}
        {typeof (onStart) !== 'undefined' ? <Button title={t('onboarding.start', 'Start Onboarding')} onPress={onStart} /> : null}
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  name: { fontSize: 16, marginBottom: 20 }
})
