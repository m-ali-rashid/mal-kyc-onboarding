import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { useI18nStore } from '../../../stores/useI18nStore'

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18nStore() as any

  return (
    <View style={styles.row}>
      <Button title="EN" onPress={() => setLang('en')} disabled={lang === 'en'} />
      <View style={styles.spacer} />
      <Button title="AR" onPress={() => setLang('ar')} disabled={lang === 'ar'} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  spacer: { width: 8 }
})
