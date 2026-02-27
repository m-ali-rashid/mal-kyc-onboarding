import { useCallback } from 'react'
import { useOnboardingStore } from '../../stores/useOnboardingStore'
import { useNavigation } from '@react-navigation/native'

export function useSelfieViewController() {
  const draft = useOnboardingStore((s: any) => s.draft)
  const setSelfie = useOnboardingStore((s: any) => s.setSelfie)
  const next = useOnboardingStore((s: any) => s.next)
  const prev = useOnboardingStore((s: any) => s.prev)
  const nav = useNavigation<any>()

  const onSet = useCallback((s: any) => setSelfie(s), [setSelfie])
  const onNextNav = useCallback(() => {
    next()
    nav.navigate('Address')
  }, [next, nav])

  const onBackNav = useCallback(() => {
    prev()
    nav.navigate('Document')
  }, [prev, nav])

  return { selfie: draft.selfie, onSet, onNext: onNextNav, onBack: onBackNav }
}

export type { }
