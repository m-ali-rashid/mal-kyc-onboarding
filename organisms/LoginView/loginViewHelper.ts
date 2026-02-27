import { useCallback } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'

export function useLoginController() {
  const { login, loading, error } = useAuthStore() as any

  const submit = useCallback(async (email: string, password: string) => {
    return login(email, password)
  }, [login])

  return { loading, error, submit }
}

export type { }
