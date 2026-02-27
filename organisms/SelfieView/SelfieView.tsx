import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import { useTranslation } from 'react-i18next'
import { useSelfieViewController } from './selfieViewHelper'

export default function SelfieView() {
  const { t } = useTranslation()
  const { selfie, onSet, onNext, onBack } = useSelfieViewController()
  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <ThemeText style={styles.label}>{t('onboarding.selfie.title')}</ThemeText>
        <ThemeText style={styles.hint}>{selfie.hasSelfie ? t('onboarding.selfie.title') + ' captured' : 'No selfie yet'}</ThemeText>
        <Button title={t('onboarding.selfie.capture')} onPress={() => onSet({ hasSelfie: true })} />
        <View style={styles.row}>
          <Button title={t('onboarding.selfie.back')} onPress={onBack} />
          <Button title={t('onboarding.selfie.next')} onPress={onNext} />
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({ root: { flex: 1 }, label: { fontSize: 16, marginBottom: 8 }, hint: { marginBottom: 12 }, row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 } })
