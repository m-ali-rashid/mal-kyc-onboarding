import React from 'react'
import { Text, TextProps, TextStyle } from 'react-native'
import { useThemeStore } from '../../../stores/useThemeStore'
import { lightTheme, darkTheme } from '../../../packages/theme/tokens'

type Props = TextProps & { style?: TextStyle }

export default function ThemeText({ style, children, ...rest }: Props) {
  const theme = useThemeStore((s: any) => s.theme)
  const tokens = theme === 'dark' ? darkTheme : lightTheme
  return (
    <Text {...rest} style={[{ color: tokens.colors.text }, style]}>
      {children}
    </Text>
  )
}
