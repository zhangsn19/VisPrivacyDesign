import type { ReactNode } from 'react'
import { useLanguage } from '../useLanguage'
import { LanguageSwitcher } from './LanguageSwitcher'

type StudyLayoutProps = {
  children: ReactNode
  stepLabel: string
  stageLabel: string
  progress: number
  saveStatus?: string
  onRestart?: () => void
  footer?: ReactNode
}

export function StudyLayout({
  children,
  stepLabel,
  stageLabel,
  progress,
  saveStatus,
  onRestart,
  footer,
}: StudyLayoutProps) {
  const { tx } = useLanguage()
  const percent = Math.max(0, Math.min(100, Math.round(progress)))

  return (
    <div className="study-flow-page react-study-page">
      <header className="study-flow-header">
        <a className="brand" href="/" aria-label={tx('返回正式研究流程', 'Return to the study flow')}>
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <small>SMART GLASSES &amp; PRIVACY</small>
            <strong>{tx('智能眼镜隐私提醒', 'Smart Glasses Privacy Alerts')}</strong>
          </span>
        </a>
        <div className="study-save-area">
          <LanguageSwitcher />
          <div className="study-save-state" role="status" aria-live="polite">{saveStatus}</div>
          {onRestart ? <button className="study-restart" type="button" onClick={onRestart}>{tx('重新开始', 'Start over')}</button> : null}
        </div>
      </header>

      <main className="study-flow-shell">
        <section className="study-progress" aria-label={tx('研究进度', 'Study progress')}>
          <div className="study-progress-copy">
            <p className="eyebrow">{stageLabel}</p>
            <strong>{stepLabel}</strong>
          </div>
          <div className="study-progress-track" aria-hidden="true" style={{ '--progress': `${percent}%` } as React.CSSProperties} />
          <p>{percent}% {tx('完成', 'complete')}</p>
        </section>
        <section className="study-flow-content" aria-live="polite">{children}</section>
      </main>
      {footer}
    </div>
  )
}

export function StickyNav({
  backLabel,
  nextLabel,
  status,
  onBack,
  onNext,
  hideBack = false,
}: {
  backLabel: string
  nextLabel: string
  status: string
  onBack?: () => void
  onNext: () => void
  hideBack?: boolean
}) {
  const { tx } = useLanguage()
  return (
    <nav className="study-sticky-nav react-sticky-nav" aria-label={tx('研究流程操作', 'Study navigation')}>
      {hideBack ? <span /> : <button className="ghost-btn" type="button" onClick={onBack}>{backLabel}</button>}
      <p role="status" aria-live="polite">{status}</p>
      <button className="primary-btn" type="button" onClick={onNext}>{nextLabel}</button>
    </nav>
  )
}
