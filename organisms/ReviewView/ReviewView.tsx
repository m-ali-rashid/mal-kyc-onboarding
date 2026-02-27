import React from 'react'
import { View, Button, StyleSheet, ScrollView } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import { useTranslation } from 'react-i18next'
import { useReviewViewController } from './reviewViewHelper'
import { useNavigation } from '@react-navigation/native'

export default function ReviewView() {
  const { t } = useTranslation()
  const { draft, onSubmit, onBack } = useReviewViewController()
  const nav = useNavigation<any>()

  const handleSubmit = async () => {
    try {
      await onSubmit()
      nav.replace('Home')
    } catch (err: any) {
      alert(err?.message || 'Submit failed')
    }
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <ThemeText style={styles.title}>{t('onboarding.review.title')}</ThemeText>
        <ThemeText style={styles.section}>{t('onboarding.profile.title')}</ThemeText>
        <ThemeText>{JSON.stringify(draft.profile, null, 2)}</ThemeText>
        <ThemeText style={styles.section}>{t('onboarding.document.title')}</ThemeText>
        <ThemeText>{JSON.stringify(draft.document, null, 2)}</ThemeText>
        <ThemeText style={styles.section}>{t('onboarding.selfie.title')}</ThemeText>
        <ThemeText>{JSON.stringify(draft.selfie, null, 2)}</ThemeText>
        <ThemeText style={styles.section}>{t('onboarding.address.title')}</ThemeText>
        <ThemeText>{JSON.stringify(draft.address, null, 2)}</ThemeText>
        <View style={styles.row}>
          <Button title={t('onboarding.review.back')} onPress={onBack} />
          <Button title={t('onboarding.review.submit')} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({ title: { fontSize: 20, fontWeight: '600', marginBottom: 12 }, section: { marginTop: 12, fontWeight: '600' }, row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 } })
