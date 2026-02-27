import * as zustand from 'zustand'
import i18n from '../packages/i18n/i18n'

const _createRaw: any = (zustand as any).default ?? (zustand as any).create ?? (zustand as any)
const create = typeof _createRaw === 'function' ? _createRaw : (_createRaw && _createRaw.create) ? _createRaw.create : _createRaw
const createAny = create as unknown as <T>(fn: any) => any

type I18nState = {
  lang: string
  setLang: (lng: string) => Promise<void>
}

export const useI18nStore = createAny<I18nState>((set: any) => ({
  lang: 'en',
  setLang: async (lng: string) => {
    await i18n.changeLanguage(lng)
    set({ lang: lng })
  }
}))

export type { I18nState }
