import * as zustand from 'zustand'
import { useMockBackendStore } from './useMockBackendStore'
import { useAuthStore } from './useAuthStore'

const _createRaw: any = (zustand as any).default ?? (zustand as any).create ?? (zustand as any)
const create = typeof _createRaw === 'function' ? _createRaw : (_createRaw && _createRaw.create) ? _createRaw.create : _createRaw
const createAny = create as unknown as <T>(fn: any) => any

type Profile = { fullName?: string; dateOfBirth?: string; nationality?: string }
type Document = { documentType?: string; documentNumber?: string }
type Selfie = { hasSelfie?: boolean }
type Address = { addressLine1?: string; city?: string; country?: string }

type OnboardingDraft = {
  profile: Profile
  document: Document
  selfie: Selfie
  address: Address
  consents: { termsAccepted?: boolean }
}

type OnboardingState = {
  step: number
  draft: OnboardingDraft
  setProfile: (p: Profile) => void
  setDocument: (d: Document) => void
  setSelfie: (s: Selfie) => void
  setAddress: (a: Address) => void
  setConsent: (accepted: boolean) => void
  next: () => void
  prev: () => void
  submit: () => Promise<any>
  reset: () => void
}

const initialDraft: OnboardingDraft = {
  profile: {},
  document: {},
  selfie: {},
  address: {},
  consents: { termsAccepted: false }
}

export const useOnboardingStore = createAny<OnboardingState>((set: any, get: any) => ({
  step: 1,
  draft: initialDraft,
  setProfile: (p: Profile) => set((s: any) => ({ draft: { ...s.draft, profile: { ...s.draft.profile, ...p } } })),
  setDocument: (d: Document) => set((s: any) => ({ draft: { ...s.draft, document: { ...s.draft.document, ...d } } })),
  setSelfie: (s: Selfie) => set((st: any) => ({ draft: { ...st.draft, selfie: { ...st.draft.selfie, ...s } } })),
  setAddress: (a: Address) => set((s: any) => ({ draft: { ...s.draft, address: { ...s.draft.address, ...a } } })),
  setConsent: (accepted: boolean) => set((s: any) => ({ draft: { ...s.draft, consents: { termsAccepted: accepted } } })),
  next: () => set((s: any) => ({ step: Math.min(5, s.step + 1) })),
  prev: () => set((s: any) => ({ step: Math.max(1, s.step - 1) })),
  submit: async () => {
    const { session } = useAuthStore.getState()
    if (!session) throw { status: 401, message: 'No session' }
    const { apiSubmit } = useMockBackendStore.getState()
    const draft = get().draft
    // apiSubmit will throw validation or 401
    return apiSubmit(session.accessToken, draft)
  },
  reset: () => set({ step: 1, draft: initialDraft })
}))

export type { OnboardingDraft }
