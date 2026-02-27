import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import ThemeText from '../../molecules/reusable/ThemeText'
import { useTranslation } from 'react-i18next'
import ScreenWrapper from '../../molecules/reusable/ScreenWrapper'
import { useLoginController } from './loginViewHelper'
import LanguageSwitcher from '../../molecules/reusable/LanguageSwitcher'
import ThemeToggle from '../../molecules/reusable/ThemeToggle'

export default function LoginView() {
  const { t } = useTranslation()
  const { loading, error, submit } = useLoginController()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handle = async () => {
    try {
      await submit(email, password)
    } catch (err) {
      // error handled by store
    }
  }

  return (
    <ScreenWrapper>
      <View style={{ marginBottom: 16 }}>
        <LanguageSwitcher />
        <View style={{ height: 8 }} />
        <ThemeToggle />
      </View>
      <View style={styles.root}>
        <ThemeText style={styles.title}>{t('login.title')}</ThemeText>
        {error ? <ThemeText style={styles.error}>{error}</ThemeText> : null}
        <TextInput
          placeholder={t('login.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder={t('login.passwordPlaceholder')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title={loading ? t('login.signingIn') : t('login.signIn')} onPress={handle} disabled={loading} />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 12, borderRadius: 6 },
  error: { color: 'red', marginBottom: 8 }
})
