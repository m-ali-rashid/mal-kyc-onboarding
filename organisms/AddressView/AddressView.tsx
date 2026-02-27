import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import { useTranslation } from 'react-i18next'
import { useAddressViewController } from './addressViewHelper'

export default function AddressView() {
  const { t } = useTranslation()
  const { address, onChange, onNext, onBack } = useAddressViewController()
  const [addr, setAddr] = useState(address.addressLine1 || '')
  const [c, setC] = useState(address.city || '')
  const [ctry, setCtry] = useState(address.country || '')

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <ThemeText style={styles.label}>{t('onboarding.address.addressLine1')}</ThemeText>
        <TextInput value={addr} onChangeText={(v) => { setAddr(v); onChange({ addressLine1: v }) }} style={styles.input} />
        <ThemeText style={styles.label}>{t('onboarding.address.city')}</ThemeText>
        <TextInput value={c} onChangeText={(v) => { setC(v); onChange({ city: v }) }} style={styles.input} />
        <ThemeText style={styles.label}>{t('onboarding.address.country')}</ThemeText>
        <TextInput value={ctry} onChangeText={(v) => { setCtry(v); onChange({ country: v }) }} style={styles.input} />
        <View style={styles.row}>
          <Button title={t('onboarding.address.back')} onPress={onBack} />
          <Button title={t('onboarding.address.next')} onPress={onNext} />
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  label: { marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }
})
