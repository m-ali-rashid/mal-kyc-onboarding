import { useCallback } from 'react'
import { useOnboardingStore } from '../../stores/useOnboardingStore'
import { useNavigation } from '@react-navigation/native'

export function useDocumentViewController() {
  const draft = useOnboardingStore((s: any) => s.draft)
  const setDocument = useOnboardingStore((s: any) => s.setDocument)
  const next = useOnboardingStore((s: any) => s.next)
  const prev = useOnboardingStore((s: any) => s.prev)
  const nav = useNavigation<any>()

  const onChange = useCallback((data: any) => setDocument(data), [setDocument])
  const onNextNav = useCallback(() => {
    next()
    nav.navigate('Selfie')
  }, [next, nav])

  const onBackNav = useCallback(() => {
    prev()
    nav.navigate('Profile')
  }, [prev, nav])

  return { document: draft.document, onChange, onNext: onNextNav, onBack: onBackNav }
}

export type { }
