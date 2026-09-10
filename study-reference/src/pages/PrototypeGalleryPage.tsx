import { useEffect, useState } from 'react'
import { PROTOTYPES } from '../data/study'
import { useLanguage } from '../useLanguage'
import type { PrototypeId, PrototypeInteraction } from '../types'
import { PrototypeLab } from '../components/PrototypeLab'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

const emptyInteraction: PrototypeInteraction = { riskViewed: false, actionCompleted: false }

export function PrototypeGalleryPage() {
  const { text, tx } = useLanguage()
  const [selected, setSelected] = useState<PrototypeId>('panel')
  const [interactions, setInteractions] = useState<Partial<Record<PrototypeId, PrototypeInteraction>>>({})

  useEffect(() => {
    document.title = tx('六种交互原型｜智能眼镜隐私提醒', 'Six Interactive Prototypes | Smart Glasses Privacy Alerts')
  }, [tx])

  return <div className="study-flow-page react-study-page">
    <header className="study-flow-header"><a className="brand" href="/?preview=1"><span className="brand-mark" /><span><small>SMART GLASSES &amp; PRIVACY</small><strong>{tx('六种交互原型', 'Six interactive prototypes')}</strong></span></a><LanguageSwitcher /></header>
    <main className="study-flow-shell prototype-gallery"><article className="study-flow-card"><p className="eyebrow">{tx('仅供研究者预览', 'Researcher preview only')}</p><h1>{tx('单独检查六种提醒与处理方式', 'Inspect the six notification approaches individually')}</h1><p className="study-lead">{tx('这里不记录正式评分。选择一种设计后，可以直接检查风险选择和三个处理动作。', 'This page does not record formal ratings. Select an approach to inspect risk selection and the three actions directly.')}</p><nav className="prototype-gallery-tabs" aria-label={tx('选择提醒与处理方式', 'Choose a notification approach')}>{PROTOTYPES.map((item) => <button className={selected === item.id ? 'active' : ''} type="button" key={item.id} onClick={() => setSelected(item.id)}><strong>{text(item.title)}</strong><span>{text(item.meta)}</span></button>)}</nav><PrototypeLab prototypeId={selected} interaction={interactions[selected] ?? emptyInteraction} onInteraction={(interaction) => setInteractions((current) => ({ ...current, [selected]: interaction }))} /></article></main>
  </div>
}
