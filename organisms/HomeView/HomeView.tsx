import React from 'react'
import { View, Button, StyleSheet, Dimensions } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import { useTranslation } from 'react-i18next'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import LanguageSwitcher from '../../molecules/reusable/LanguageSwitcher'
import GlobeAnimation from '../../molecules/reusable/GlobeAnimation'

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window')

type Props = {
  fullName: string
  onLogout: () => void
  onStart?: () => void
}

export default function HomeView({ fullName, onLogout, onStart }: Props) {
  const { t } = useTranslation()
  return (
    <ScreenWrapper>
      {/* Full-screen Three.js globe behind everything */}
      <GlobeAnimation
        width={SCREEN_W}
        height={SCREEN_H}
        style={styles.globeBg}
      />
      {/* Overlay: lang switcher top-left */}
      <View style={styles.langRow}>
        <LanguageSwitcher />
      </View>
      {/* Overlay: action buttons bottom-center */}
      <View style={styles.actions}>
        <ThemeText style={styles.name}>{fullName}</ThemeText>
        <Button title={t('home.logout')} onPress={onLogout} />
        {onStart ? <View style={{ height: 12 }} /> : null}
        {onStart ? <Button title={t('onboarding.start', 'Start Onboarding')} onPress={onStart} /> : null}
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  globeBg: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  langRow: {
    position: 'absolute',
    top: 16,
    left: 16
  },
  actions: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 4
  },
  name: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 16 }
})
