// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider locale='pt-BR'>
      <NextThemesProvider attribute='class' defaultTheme='dark' >
      {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
