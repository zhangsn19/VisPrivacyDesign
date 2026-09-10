import { createContext } from 'react'
import type { Language, LocalizedText } from './types'

export type LanguageContextValue = {
  lang: Language
  setLanguage: (language: Language) => void
  text: (value: LocalizedText) => string
  tx: (zh: string, en: string) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
