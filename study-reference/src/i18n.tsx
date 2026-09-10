import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Language } from './types'
import { LanguageContext, type LanguageContextValue } from './language-context'

const LANGUAGE_KEY = 'infer-vis-react-language-v2'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLanguage] = useState<Language>(() => {
    try {
      return window.localStorage.getItem(LANGUAGE_KEY) === 'zh' ? 'zh' : 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
    try {
      window.localStorage.setItem(LANGUAGE_KEY, lang)
    } catch {
      // Language preference is optional local state.
    }
  }, [lang])

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLanguage,
    text: (localized) => localized[lang],
    tx: (zh, en) => (lang === 'zh' ? zh : en),
  }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
