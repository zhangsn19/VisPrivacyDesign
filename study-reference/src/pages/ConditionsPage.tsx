import { useEffect } from 'react'
import { allTrios, prototypeById } from '../data/study'
import { useLanguage } from '../useLanguage'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

export function ConditionsPage() {
  const { text, tx } = useLanguage()

  useEffect(() => {
    document.title = tx('正式实验条件链接｜智能眼镜隐私提醒', 'Formal Study Condition Links | Smart Glasses Privacy Alerts')
  }, [tx])

  return <div className="study-flow-page react-study-page">
    <header className="study-flow-header"><a className="brand" href="/conditions.html"><span className="brand-mark" /><span><small>SMART GLASSES &amp; PRIVACY</small><strong>{tx('正式实验条件链接', 'Formal study condition links')}</strong></span></a><LanguageSwitcher /></header>
    <main className="study-flow-shell condition-directory"><article className="study-flow-card"><p className="eyebrow">{tx('仅供研究者分发', 'For researcher distribution only')}</p><h1>{tx('20 个三设计组合', '20 three-design combinations')}</h1><p className="study-lead">{tx('每个链接对应一个固定的三设计组合。链接内部会根据参与者编号在全部六种呈现顺序中轮换；请尽量让每个条件及每种顺序获得相近的参与者数量。', 'Each link corresponds to one fixed three-design combination. Participant IDs rotate through all six presentation orders; keep counts as even as possible across conditions and orders.')}</p><div className="condition-link-grid">{allTrios().map((trio, index) => { const code = `c${String(index + 1).padStart(2, '0')}`; return <a href={`/index.html?condition=${code}`} key={code}><span>{code.toUpperCase()}</span><strong>{trio.map((id) => text(prototypeById(id).title)).join(' · ')}</strong></a> })}</div></article></main>
  </div>
}
