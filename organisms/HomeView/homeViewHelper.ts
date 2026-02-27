import { useEffect, useState, useCallback } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useMockBackendStore } from '../../stores/useMockBackendStore'

export function useHomeController() {
  const { session, logout, refreshAndRetry } = useAuthStore() as any
  const { apiMe } = useMockBackendStore.getState()
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!session) return
      setLoading(true)
      setError(null)
      try {
        const u = await apiMe(session.accessToken)
        if (mounted) setUser(u)
      } catch (err: any) {
        try {
          await refreshAndRetry(async () => {
            const s = useAuthStore.getState().session
            const u = await apiMe(s!.accessToken)
            if (mounted) setUser(u)
            return u
          })
        } catch (e: any) {
          if (mounted) {
            setError(e?.message ?? 'Session expired')
            logout()
          }
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [session, apiMe, logout, refreshAndRetry])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return { user, loading, error, handleLogout }
}

export type { }
