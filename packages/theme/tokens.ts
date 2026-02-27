export type ThemeName = 'light' | 'dark'

export type Theme = {
  colors: {
    background: string
    surface: string
    text: string
    muted: string
    primary: string
  }
}

export const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#111827',
    muted: '#6B7280',
    primary: '#0EA5A4'
  }
}

export const darkTheme: Theme = {
  colors: {
    background: '#0F172A',
    surface: '#0B1220',
    text: '#F8FAFC',
    muted: '#9CA3AF',
    primary: '#06B6D4'
  }
}
