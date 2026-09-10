import { useEffect, useState } from 'react'
import { DESK_RISKS, prototypeById } from '../data/study'
import { useLanguage } from '../useLanguage'
import type { PrototypeId, PrototypeInteraction, Risk, RiskAction } from '../types'

type PrototypeLabProps = {
  prototypeId: PrototypeId
  interaction: PrototypeInteraction
  onInteraction: (next: PrototypeInteraction) => void
}

const timelineSteps = [
  ['收集画面线索', 'Collect visible clues'],
  ['组合证据', 'Combine evidence'],
  ['形成个人判断', 'Form a personal inference'],
  ['给出处理动作', 'Offer an action'],
] as const

const sceneClues = {
  health: [
    { id: 'medicine', className: 'scene-clue-medicine', zh: '药品标签', en: 'Medicine label' },
    { id: 'followup', className: 'scene-clue-followup', zh: '复诊提醒', en: 'Follow-up reminder' },
    { id: 'latework', className: 'scene-clue-latework', zh: '晚间时间', en: 'Late-work time' },
  ],
  work: [
    { id: 'badge', className: 'scene-clue-badge', zh: '访客证', en: 'Visitor badge' },
    { id: 'documents', className: 'scene-clue-documents', zh: '桌上文件', en: 'Desk documents' },
    { id: 'materials', className: 'scene-clue-materials', zh: '办公用品', en: 'Work materials' },
  ],
  routine: [
    { id: 'coffee', className: 'scene-clue-coffee', zh: '咖啡杯', en: 'Coffee cup' },
    { id: 'drinks', className: 'scene-clue-drinks', zh: '多份饮品', en: 'Repeated drinks' },
    { id: 'latework', className: 'scene-clue-latework', zh: '晚间时间', en: 'Late-work time' },
  ],
} as const

export function PrototypeLab({ prototypeId, interaction, onInteraction }: PrototypeLabProps) {
  const { text, tx } = useLanguage()
  const prototype = prototypeById(prototypeId)
  const [selectedRiskId, setSelectedRiskId] = useState<Risk['id']>('health')
  const [timelineStep, setTimelineStep] = useState(0)
  const selectedRisk = DESK_RISKS.find((risk) => risk.id === selectedRiskId) ?? DESK_RISKS[0]

  useEffect(() => {
    setSelectedRiskId('health')
    setTimelineStep(0)
  }, [prototypeId])

  const riskAction = (risk: Risk) => interaction.riskActions?.[risk.id]?.action
    ?? (risk.id === 'health' ? interaction.action : undefined)

  const selectedAction = riskAction(selectedRisk)
  const addressedRisks = DESK_RISKS.filter((risk) => riskAction(risk) === 'address')

  const selectRisk = (risk: Risk) => {
    setSelectedRiskId(risk.id)
    if (risk.id === 'health') {
      onInteraction({
        ...interaction,
        riskViewed: true,
        riskViewedAt: interaction.riskViewedAt ?? new Date().toISOString(),
      })
    }
  }

  const act = (action: RiskAction, risk = selectedRisk) => {
    const completedAt = new Date().toISOString()
    setSelectedRiskId(risk.id)
    const nextInteraction: PrototypeInteraction = {
      ...interaction,
      riskActions: {
        ...interaction.riskActions,
        [risk.id]: { action, completedAt },
      },
    }
    if (risk.id === 'health') {
      nextInteraction.riskViewed = true
      nextInteraction.actionCompleted = true
      nextInteraction.action = action
      nextInteraction.riskViewedAt = interaction.riskViewedAt ?? completedAt
      nextInteraction.actionCompletedAt = completedAt
    }
    onInteraction(nextInteraction)
  }

  const actionLabel = (action?: RiskAction) => action === 'address'
    ? tx('当前状态：已处理', 'Current status: addressed')
    : action === 'allow'
      ? tx('当前状态：允许本次使用', 'Current status: allowed this time')
      : action === 'later'
        ? tx('当前状态：稍后提醒', 'Current status: remind later')
        : tx('当前状态：未处理', 'Current status: not addressed')

  const actionFeedback = (risk: Risk, action?: RiskAction) => action === 'address'
    ? tx(`只处理了“${text(risk.label)}”：${text(risk.action)}，其他风险保持原状。`, `Only “${text(risk.label)}” was addressed: ${text(risk.action)}. Other risks remain unchanged.`)
    : action === 'allow'
      ? tx(`只允许本次使用“${text(risk.label)}”线索；其他风险的状态没有改变。`, `Use of “${text(risk.label)}” clues is allowed this time; other risk states are unchanged.`)
      : action === 'later'
        ? tx(`只暂时收起“${text(risk.label)}”提醒；系统稍后会再次提醒。`, `Only the “${text(risk.label)}” alert is dismissed for now; the system will remind you later.`)
        : ''

  const shortStatus = (risk: Risk) => {
    const action = riskAction(risk)
    if (action === 'address') return tx('已处理', 'Addressed')
    if (action === 'allow') return tx('本次允许', 'Allowed once')
    if (action === 'later') return tx('稍后提醒', 'Remind later')
    return tx('未处理', 'Not addressed')
  }

  const renderDecisionActions = (risk: Risk = selectedRisk) => {
    const action = riskAction(risk)
    return <section className="decision-block" aria-label={tx('当前风险的三个处理选项', 'Three actions for the current risk')}>
      <p><strong>{tx('处理细节：', 'Action detail: ')}</strong>{text(risk.action)}</p>
      <div className="decision-actions">
        <button className={`primary-btn ${action === 'address' ? 'is-selected' : ''}`} aria-pressed={action === 'address'} type="button" onClick={() => act('address', risk)}>{tx('处理当前风险', 'Address this risk')}</button>
        <button className={`ghost-btn ${action === 'allow' ? 'is-selected' : ''}`} aria-pressed={action === 'allow'} type="button" onClick={() => act('allow', risk)}>{tx('允许本次使用', 'Allow this use')}</button>
        <button className={`ghost-btn ${action === 'later' ? 'is-selected' : ''}`} aria-pressed={action === 'later'} type="button" onClick={() => act('later', risk)}>{tx('稍后提醒', 'Remind me later')}</button>
      </div>
      <span className="decision-state" role="status" aria-live="polite">{actionLabel(action)}</span>
    </section>
  }

  const renderRiskTabs = () => (
    <div className="react-risk-tabs" aria-label={tx('选择推断风险', 'Choose an inference risk')}>
      {DESK_RISKS.map((risk) => (
        <button
          className={risk.id === selectedRisk.id ? 'active' : ''}
          type="button"
          key={risk.id}
          onClick={() => selectRisk(risk)}
        >
          <span>{text(risk.label)} · {risk.score}%</span><small>{shortStatus(risk)}</small>
        </button>
      ))}
    </div>
  )

  const renderEvidence = (risk: Risk = selectedRisk) => (
    <div className="react-evidence">
      <p className="eyebrow">{tx('当前选中', 'Currently selected')}</p>
      <h3>{text(risk.label)} · {risk.score}%</h3>
      <p>{text(risk.inference)}</p>
      <div>{risk.evidence.map((item) => <span key={text(item)}>{text(item)}</span>)}</div>
    </div>
  )

  const renderScene = () => (
    <section className="react-scene-panel" aria-label={tx('可视化场景', 'Scene preview')}>
      <header><div><p>{tx('眼镜当前看到的画面', 'What the glasses currently see')}</p><h2>{tx('工作桌面', 'Work desk')}</h2></div><span>{tx('模拟研究材料', 'Simulated study material')}</span></header>
      <div className={`react-camera ${prototypeId} action-${selectedAction ?? 'none'}`}>
        <img src="/assets/room-office.jpg" alt={tx('有文件、药品和日常用品的工作桌面', 'A work desk with documents, medicine, and everyday items')} />
        <span className="scene-label label-time">{tx('周三 19:30 · 复诊提醒', 'Wed 19:30 · Follow-up reminder')}</span>
        <span className="scene-label label-rx">{tx('药品标签', 'Medicine label')}</span>
        <span className="scene-label label-badge">{tx('访客证', 'Visitor badge')}</span>
        <span className="scene-label label-documents">{tx('桌上文件', 'Desk documents')}</span>
        <span className="scene-label label-materials">{tx('办公用品', 'Work materials')}</span>
        <span className="scene-label label-coffee">{tx('咖啡杯', 'Coffee cup')}</span>
        {prototypeId === 'boxedPanel' ? selectedRisk.evidence.map((evidence, index) => (
          <button className={`scene-clue-marker clue-marker-${index}`} style={{ borderColor: selectedRisk.color }} type="button" key={text(evidence)} onClick={() => selectRisk(selectedRisk)}>
            <span>{index + 1}</span>{text(evidence)}
          </button>
        )) : null}
        {prototypeId === 'hint' ? DESK_RISKS.map((risk, index) => (
          <button className={`scene-hint marker-${index}`} type="button" key={risk.id} onClick={() => selectRisk(risk)}>{text(risk.label)} · {risk.score}%</button>
        )) : null}
        {prototypeId === 'contained' ? DESK_RISKS.map((risk, index) => (
          <article className={`scene-contained marker-${index} ${risk.id === selectedRisk.id ? 'expanded' : ''}`} style={{ borderColor: risk.color }} key={risk.id}>
            <strong style={{ backgroundColor: risk.color }}>{text(risk.label)} · {risk.score}%</strong>
            {risk.id === selectedRisk.id ? <><p>{text(risk.inference)}</p><div><button type="button" onClick={() => act('address', risk)}>{tx('处理', 'Address')}</button><button type="button" onClick={() => act('allow', risk)}>{tx('允许', 'Allow')}</button><button type="button" onClick={() => act('later', risk)}>{tx('稍后', 'Later')}</button></div></> : <button type="button" onClick={() => selectRisk(risk)}>{tx('查看', 'View')}</button>}
          </article>
        )) : null}
        {addressedRisks.flatMap((risk) => sceneClues[risk.id].map((clue) => <div className={`scene-risk-protection ${clue.className}`} style={{ '--risk-color': risk.color } as React.CSSProperties} key={`${risk.id}-${clue.id}`}><span>✓</span><small>{tx(clue.zh, clue.en)}</small></div>))}
        {selectedAction ? <aside className={`scene-action-feedback is-${selectedAction}`} role="status" aria-live="polite"><strong>{actionLabel(selectedAction)}</strong><span>{actionFeedback(selectedRisk, selectedAction)}</span></aside> : null}
      </div>
    </section>
  )

  const renderPrototype = () => {
    if (prototypeId === 'panel') return (
      <div className="react-prototype-content panel-layout">
        <div className="react-risk-list">
          {DESK_RISKS.map((risk) => (
            <button className={`risk-row ${risk.id === selectedRisk.id ? 'active' : ''}`} type="button" key={risk.id} onClick={() => selectRisk(risk)}>
              <span><strong>{text(risk.label)}</strong><small>{text(risk.inference)}</small><em className={`risk-row-status is-${riskAction(risk) ?? 'none'}`}>{shortStatus(risk)}</em></span><b>{risk.score}</b>
            </button>
          ))}
        </div>
        {renderEvidence()}
        {renderDecisionActions()}
      </div>
    )

    if (prototypeId === 'dialog') return (
      <div className="react-prototype-content">
        {renderRiskTabs()}
        <div className="react-chat">
          <p>{tx('系统检测到', 'The system detected')} “{text(selectedRisk.label)}” {tx('可能由这些线索共同推断。', 'may be inferred from these clues.')}</p>
          <p>{tx('我想降低风险，但不想破坏主要任务。', 'I want to reduce the risk without disrupting my main task.')}</p>
          <p>{tx('可以只处理相关线索并保留画面主体。', 'You can address only the related clues and keep the main scene.')}</p>
        </div>
        {renderEvidence()}
        {renderDecisionActions()}
      </div>
    )

    if (prototypeId === 'boxedPanel') return (
      <div className="react-prototype-content boxed-layout">
        {renderRiskTabs()}
        {renderEvidence()}
        <ol className="evidence-path">
          {selectedRisk.evidence.map((item, index) => <li key={text(item)}><strong>{index + 1}. {text(item)}</strong><span>{tx('视觉或文字线索被系统识别并参与推断。', 'A visible or textual clue was recognized and used in the inference.')}</span></li>)}
        </ol>
        {renderDecisionActions()}
      </div>
    )

    if (prototypeId === 'timeline') return (
      <div className="react-prototype-content timeline-layout">
        {renderRiskTabs()}
        <div className="react-timeline">
          {timelineSteps.map(([zh, en], index) => <button type="button" className={timelineStep === index ? 'active' : ''} key={zh} onClick={() => setTimelineStep(index)}><strong>Step {index + 1}</strong><span>{tx(zh, en)}</span></button>)}
        </div>
        <article className="timeline-detail"><p>Step {timelineStep + 1}</p><h3>{tx(timelineSteps[timelineStep][0], timelineSteps[timelineStep][1])}</h3><p>{timelineStep < 2 ? tx('系统仍在识别和组合线索，尚未确定个人判断。', 'The system is still recognizing and combining clues; no personal inference is confirmed yet.') : text(selectedRisk.inference)}</p></article>
        {renderDecisionActions()}
      </div>
    )

    if (prototypeId === 'hint') return (
      <div className="react-prototype-content hint-layout">
        <div className="hint-list">
          {DESK_RISKS.map((risk) => <button type="button" className={`hint-item ${risk.id === selectedRisk.id ? 'active' : ''}`} key={risk.id} onClick={() => selectRisk(risk)}><span className="hint-dot" style={{ background: risk.color }} /><span><strong>{text(risk.label)} · {risk.score}%</strong><small>{text(risk.evidence[0])} {tx('正在提高推断风险', 'is increasing inference risk')}</small></span><b>›</b></button>)}
        </div>
        {renderEvidence()}
        {renderDecisionActions()}
      </div>
    )

    return (
      <div className="react-prototype-content contained-info">
        {renderEvidence()}
        <p>{tx('三种设计使用相同操作；请直接在上方风险框内选择处理、允许或稍后提醒。', 'All three designs use the same actions. Choose Address, Allow, or Later directly in the risk box above.')}</p>
      </div>
    )
  }

  return (
    <section className="embedded-prototype-shell react-prototype-shell" aria-label={`${text(prototype.title)} · ${tx('可交互原型', 'Interactive prototype')}`}>
      <header className="embedded-prototype-header">
        <div>
          <p className="eyebrow">{text(prototype.meta)}</p>
          <h2>{text(prototype.title)}</h2>
          <p>{tx('本轮固定使用工作桌面场景。请找到“健康状态”风险、查看依据，并选择一种处理方式。', 'This round uses the fixed work-desk scene. Find the Health status risk, inspect its evidence, and choose one action.')}</p>
        </div>
        <div className="embedded-fixed-scenario"><span>{tx('本轮统一场景', 'Fixed scene for this round')}</span><strong>{tx('工作桌面', 'Work desk')}</strong></div>
      </header>
      <aside className="simulation-banner"><strong>{tx('模拟演示', 'Simulated demo')}</strong><span>{tx('画面、风险项目和百分比均为预先制作的研究材料，不代表真实 AI 判断或准确率。', 'The scene, risk items, and percentages are pre-made research materials and do not represent real AI judgments or accuracy.')}</span></aside>
      <div className="react-lab-grid">
        {renderScene()}
        <section className="react-prototype-panel"><header><p>{text(prototype.meta)}</p><h2>{text(prototype.title)}</h2></header>{renderPrototype()}</section>
      </div>
    </section>
  )
}
