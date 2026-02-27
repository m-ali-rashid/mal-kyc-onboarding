import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import { useTranslation } from 'react-i18next'
import { useProfileViewController } from './profileViewHelper'

export default function ProfileView() {
  const { t } = useTranslation()
  const { profile, onChange, onNext } = useProfileViewController()
  const [name, setName] = useState(profile.fullName || '')
  const [dob, setDob] = useState(profile.dateOfBirth || '')
  const [nat, setNat] = useState(profile.nationality || '')

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <ThemeText style={styles.label}>{t('onboarding.profile.fullName')}</ThemeText>
        <TextInput value={name} onChangeText={(v) => { setName(v); onChange({ fullName: v }) }} style={styles.input} />
        <ThemeText style={styles.label}>{t('onboarding.profile.dateOfBirth')}</ThemeText>
        <TextInput value={dob} onChangeText={(v) => { setDob(v); onChange({ dateOfBirth: v }) }} placeholder="YYYY-MM-DD" style={styles.input} />
        <ThemeText style={styles.label}>{t('onboarding.profile.nationality')}</ThemeText>
        <TextInput value={nat} onChangeText={(v) => { setNat(v); onChange({ nationality: v }) }} style={styles.input} />
        <Button title={t('onboarding.profile.next')} onPress={onNext} />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  label: { marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6 }
})
