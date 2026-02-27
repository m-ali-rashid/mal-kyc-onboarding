import * as zustand from 'zustand'
import { useMockBackendStore } from './useMockBackendStore'

const _createRaw: any = (zustand as any).default ?? (zustand as any).create ?? (zustand as any)
const create = typeof _createRaw === 'function' ? _createRaw : (_createRaw && _createRaw.create) ? _createRaw.create : _createRaw
const createAny = create as unknown as <T>(fn: any) => any

type User = { id: string; email: string; fullName: string }
type Session = { accessToken: string; refreshToken: string; expiresAt: string }

type AuthState = {
  user: User | null
  session: Session | null
  loading: boolean
  error?: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshAndRetry: (fn: () => Promise<any>) => Promise<any>
}

export const useAuthStore = createAny<AuthState>((set: any, get: any) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null })
    try {
      const { apiLogin } = useMockBackendStore.getState()
      const { user, session } = await apiLogin(email, password)
      set({ user, session, loading: false })
    } catch (err: any) {
      set({ error: err?.message ?? 'Login failed', loading: false })
      throw err
    }
  },

  logout: () => {
    set({ user: null, session: null })
  },

  refreshAndRetry: async (fn: () => Promise<any>) => {
    const { session } = get()
    if (!session) throw { status: 401, message: 'No session' }
    const { apiRefresh } = useMockBackendStore.getState()
    try {
      const newSession = await apiRefresh(session.refreshToken)
      set({ session: newSession })
      return await fn()
    } catch (err) {
      // refresh failed -> logout
      set({ user: null, session: null })
      throw err
    }
  }
}))

export type { User, Session }
