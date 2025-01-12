import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { theme as baseTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = {
  ...baseTheme,
  config,
}

export default theme
