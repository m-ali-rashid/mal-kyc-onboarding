import * as zustand from 'zustand'

const _createRaw: any = (zustand as any).default ?? (zustand as any).create ?? (zustand as any)
const create = typeof _createRaw === 'function' ? _createRaw : (_createRaw && _createRaw.create) ? _createRaw.create : _createRaw
const createAny = create as unknown as <T>(fn: any) => any

type User = {
  id: string
  email: string
  fullName: string
}

type Session = {
  accessToken: string
  refreshToken: string
  expiresAt: string // ISO
}

type ApiError = {
  status: number
  message: string
  details?: any
}

const nowPlus = (ms: number) => new Date(Date.now() + ms).toISOString()

function simulateDelay(ms = 500) {
  return new Promise((res) => setTimeout(res, ms))
}

export const useMockBackendStore = createAny<any>((set: any, get: any) => ({
  users: [
    { id: 'USR-001', email: 'jane.doe@example.com', fullName: 'Jane Doe' }
  ] as User[],
  sessions: {} as Record<string, Session>,

  apiLogin: async (email: string, password: string) => {
    await simulateDelay(700)
    const users: User[] = get().users
    const user = users.find((u: User) => u.email === email)
    if (!user || password !== 'password') {
      const err: ApiError = { status: 401, message: 'Invalid credentials' }
      throw err
    }
    const session: Session = {
      accessToken: 'access_' + Math.random().toString(36).slice(2, 9),
      refreshToken: 'refresh_' + Math.random().toString(36).slice(2, 9),
      expiresAt: nowPlus(1000 * 60 * 15) // 15 minutes
    }
    // store session keyed by refreshToken for simplicity
    const sessions = get().sessions as Record<string, Session>
    sessions[session.refreshToken] = session
    set({ sessions })
    return { user, session }
  },

  apiRefresh: async (refreshToken: string) => {
    await simulateDelay(500)
    const sessions = get().sessions as Record<string, Session>
    const existing = sessions[refreshToken]
    if (!existing) {
      const err: ApiError = { status: 401, message: 'Invalid refresh token' }
      throw err
    }
    const newSession: Session = {
      accessToken: 'access_' + Math.random().toString(36).slice(2, 9),
      refreshToken: 'refresh_' + Math.random().toString(36).slice(2, 9),
      expiresAt: nowPlus(1000 * 60 * 15)
    }
    // rotate
    delete sessions[refreshToken]
    sessions[newSession.refreshToken] = newSession
    set({ sessions })
    return newSession
  },

  apiMe: async (accessToken: string) => {
    await simulateDelay(400)
    // find session by access token
    const sessions = Object.values(get().sessions) as Session[]
    const session = sessions.find((s: Session) => s.accessToken === accessToken)
    if (!session) {
      const err: ApiError = { status: 401, message: 'Invalid token' }
      throw err
    }
    // check expiry
    if (new Date(session.expiresAt) <= new Date()) {
      const err: ApiError = { status: 401, message: 'Token expired' }
      throw err
    }
    // return the first user for demo
    const user = get().users[0]
    return user
  },

  apiSubmit: async (accessToken: string, draft: any) => {
    await simulateDelay(900)
    // validate minimal
    if (!draft || !draft.profile || !draft.profile.fullName) {
      const err: ApiError = { status: 400, message: 'Validation failed', details: { profile: { fullName: 'Required' } } }
      throw err
    }
    // token
    const sessions = Object.values(get().sessions) as Session[]
    const session = sessions.find((s: Session) => s.accessToken === accessToken)
    if (!session || new Date(session.expiresAt) <= new Date()) {
      const err: ApiError = { status: 401, message: 'Token expired' }
      throw err
    }
    // return submission
    return { submissionId: 'SUB-' + Math.random().toString(36).slice(2, 7), status: 'RECEIVED' }
  }
}))

export type { User, Session, ApiError }
