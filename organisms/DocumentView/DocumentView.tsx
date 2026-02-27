import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import { useTranslation } from 'react-i18next'
import { useDocumentViewController } from './documentViewHelper'

export default function DocumentView() {
  const { t } = useTranslation()
  const { document, onChange, onNext, onBack } = useDocumentViewController()
  const [type, setType] = useState(document.documentType || '')
  const [num, setNum] = useState(document.documentNumber || '')

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <ThemeText style={styles.label}>{t('onboarding.document.documentType')}</ThemeText>
        <TextInput value={type} onChangeText={(v) => { setType(v); onChange({ documentType: v }) }} style={styles.input} />
        <ThemeText style={styles.label}>{t('onboarding.document.documentNumber')}</ThemeText>
        <TextInput value={num} onChangeText={(v) => { setNum(v); onChange({ documentNumber: v }) }} style={styles.input} />
        <View style={styles.row}>
          <Button title={t('onboarding.document.back')} onPress={onBack} />
          <Button title={t('onboarding.document.next')} onPress={onNext} />
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
