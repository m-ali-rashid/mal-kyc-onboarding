import { useCallback, useState } from 'react'
import { useOnboardingStore } from '../../stores/useOnboardingStore'
import { useNavigation } from '@react-navigation/native'

export function useReviewViewController() {
  const draft = useOnboardingStore((s: any) => s.draft)
  const submit = useOnboardingStore((s: any) => s.submit)
  const prev = useOnboardingStore((s: any) => s.prev)
  const reset = useOnboardingStore((s: any) => s.reset)
  const [loading, setLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    setLoading(true)
    try {
      const res = await submit()
      return res
    } finally {
      setLoading(false)
    }
  }, [submit])

  const onBack = useCallback(() => prev(), [prev])

  const nav = useNavigation<any>()
  const onBackNav = useCallback(() => {
    prev()
    nav.navigate('Address')
  }, [prev, nav])

  return { draft, onSubmit, onBack: onBackNav, reset, loading }
}

export type { }
