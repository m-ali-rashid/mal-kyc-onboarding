import { useCallback } from 'react'
import { useOnboardingStore } from '../../stores/useOnboardingStore'
import { useNavigation } from '@react-navigation/native'

export function useAddressViewController() {
  const draft = useOnboardingStore((s: any) => s.draft)
  const setAddress = useOnboardingStore((s: any) => s.setAddress)
  const next = useOnboardingStore((s: any) => s.next)
  const prev = useOnboardingStore((s: any) => s.prev)
  const nav = useNavigation<any>()

  const onChange = useCallback((a: any) => setAddress(a), [setAddress])
  const onNextNav = useCallback(() => {
    next()
    nav.navigate('Review')
  }, [next, nav])

  const onBackNav = useCallback(() => {
    prev()
    nav.navigate('Selfie')
  }, [prev, nav])

  return { address: draft.address, onChange, onNext: onNextNav, onBack: onBackNav }
}

export type { }
