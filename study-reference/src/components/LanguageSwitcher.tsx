import { useLanguage } from '../useLanguage'

export function LanguageSwitcher() {
  const { lang, setLanguage, tx } = useLanguage()
  const nextLanguage = lang === 'zh' ? 'English' : '中文'

  return (
    <button
      className="language-switcher"
      type="button"
      aria-label={lang === 'zh' ? 'Switch to English' : 'Switch to Chinese'}
      onClick={() => setLanguage(lang === 'zh' ? 'en' : 'zh')}
    >
      <span>{tx('更改语言', 'Change language')}</span>
      <strong>{nextLanguage}</strong>
    </button>
  )
}
