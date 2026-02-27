import React from 'react'
import { View, StyleSheet } from 'react-native'

type Props = { step: number; total: number }

export default function ProgressBar({ step, total }: Props) {
  const pct = Math.max(0, Math.min(1, (step - 1) / (total - 1)))
  return (
    <View style={styles.wrapper}>
      <View style={[styles.fill, { flex: pct }]} />
      <View style={[styles.empty, { flex: 1 - pct }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { height: 6, flexDirection: 'row', backgroundColor: '#eee', borderRadius: 3, overflow: 'hidden' },
  fill: { backgroundColor: '#4f46e5' },
  empty: { backgroundColor: 'transparent' }
})
