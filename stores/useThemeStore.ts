import * as zustand from 'zustand'
const _createRaw: any = (zustand as any).default ?? (zustand as any).create ?? (zustand as any)
const create = typeof _createRaw === 'function' ? _createRaw : (_createRaw && _createRaw.create) ? _createRaw.create : _createRaw

import { ThemeName } from '../packages/theme/tokens'

type ThemeState = {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
  toggle: () => void
}

export const useThemeStore: any = create((set: any) => ({
  theme: 'light',
  setTheme: (t: ThemeName) => set({ theme: t }),
  toggle: () => set((s: any) => ({ theme: s.theme === 'light' ? 'dark' : 'light' }))
}))
