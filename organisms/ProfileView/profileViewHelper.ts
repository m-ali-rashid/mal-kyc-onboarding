import { useCallback } from 'react'
import { useOnboardingStore } from '../../stores/useOnboardingStore'
import { useNavigation } from '@react-navigation/native'

export function useProfileViewController() {
  const draft = useOnboardingStore((s: any) => s.draft)
  const setProfile = useOnboardingStore((s: any) => s.setProfile)
  const next = useOnboardingStore((s: any) => s.next)
  const nav = useNavigation<any>()

  const onChange = useCallback((data: any) => {
    setProfile(data)
  }, [setProfile])

  const onNext = useCallback(() => {
    next()
    nav.navigate('Document')
  }, [next, nav])

  return { profile: draft.profile, onChange, onNext }
}

export type { }
