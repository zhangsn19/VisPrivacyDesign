import { useEffect, useMemo, useState } from 'react'
import { PROTOTYPES, prototypeById } from '../data/study'
import { usePersistentState } from '../hooks/usePersistentState'
import { useLanguage } from '../useLanguage'
import type { PrototypeId } from '../types'
import { downloadJson } from '../utils/download'
import { StickyNav, StudyLayout } from '../components/StudyLayout'
import { Storyboard } from '../components/Storyboard'
import { VoiceTextInput } from '../components/VoiceTextInput'

type StoryResponse = {
  title: string
  answer: string
  confusion: string
  clarity: number | null
}

type TestState = {
  version: 3
  stage: 'start' | 'item' | 'complete'
  participantId: string
  order: PrototypeId[]
  index: number
  responses: Partial<Record<PrototypeId, StoryResponse>>
  startedAt: string | null
  completedAt: string | null
}

const createTest = (): TestState => ({ version: 3, stage: 'start', participantId: '', order: [], index: 0, responses: {}, startedAt: null, completedAt: null })

function orderedIds(participantId: string): PrototypeId[] {
  const items = PROTOTYPES.map((item) => item.id)
  let seed = 0
  for (const character of participantId || 'participant') seed = (Math.imul(31, seed) + character.charCodeAt(0)) | 0
  seed = Math.abs(seed) || 1
  for (let index = items.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0
    const swap = seed % (index + 1)
    ;[items[index], items[swap]] = [items[swap], items[index]]
  }
  return items
}

export function StoryboardTestPage() {
  const { lang, text, tx } = useLanguage()
  const [test, setTest, clearTest] = usePersistentState('infer-vis-react-storyboard-test-v3', createTest)
  const [status, setStatus] = useState('')
  const [saveStatus, setSaveStatus] = useState(() => test.stage === 'start' ? tx('尚未开始', 'Not started') : tx('已恢复上次未完成的回答', 'Restored unfinished responses'))

  useEffect(() => {
    document.title = tx('Storyboard 材料测试｜智能眼镜隐私提醒', 'Storyboard Material Test | Smart Glasses Privacy Alerts')
  }, [tx])

  useEffect(() => {
    setSaveStatus(test.stage === 'start'
      ? tx('尚未开始', 'Not started')
      : test.stage === 'complete'
        ? tx('材料测试已完成', 'Material test complete')
        : tx('回答已自动保存', 'Responses autosaved'))
  }, [lang, test.stage, tx])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [test.stage, test.index])

  const itemId = test.order[test.index]
  const item = itemId ? prototypeById(itemId) : null
  const response = itemId ? test.responses[itemId] ?? { title: '', answer: '', confusion: '', clarity: null } : null
  const progress = test.stage === 'start' ? 0 : test.stage === 'complete' ? 100 : Math.round(((test.index + 1) / 7) * 100)

  const persist = (next: TestState, message?: string) => {
    setTest(next)
    setSaveStatus(message ?? tx('回答已自动保存', 'Responses autosaved'))
  }

  const updateResponse = (patch: Partial<StoryResponse>) => {
    if (!itemId || !item || !response) return
    persist({ ...test, responses: { ...test.responses, [itemId]: { ...response, title: text(item.title), ...patch } } })
  }

  const start = () => {
    const id = test.participantId.trim()
    if (!id) {
      setStatus(tx('请先填写参与者编号。', 'Enter a participant ID first.'))
      return
    }
    persist({ ...createTest(), stage: 'item', participantId: id, order: orderedIds(id), startedAt: new Date().toISOString() }, tx('材料测试已开始，回答已保存', 'Material test started and responses saved'))
    setStatus('')
  }

  const result = useMemo(() => ({
    schemaVersion: 1,
    studyVersion: 'infer-vis-react-storyboard-comprehension-v3',
    framework: 'react-vite-typescript',
    uiLanguage: lang,
    participantId: test.participantId,
    startedAt: test.startedAt,
    completedAt: test.completedAt,
    presentationOrder: test.order,
    responses: test.responses,
    method: tx('参与者只查看六种静态五步故事板及文字说明，并在每种材料后用自己的话描述技术能帮助用户做什么；本阶段不展示交互原型，也不进行偏好评分。', 'Participants view only six static five-step storyboards and written explanations, then describe in their own words what each technology helps a user do. No interactive prototype or preference rating is shown in this stage.'),
  }), [lang, test, tx])

  const next = () => {
    setStatus('')
    if (test.stage === 'start') return start()
    if (test.stage !== 'item' || !response) return
    if (!response.answer.trim()) {
      setStatus(tx('请先用自己的话回答问题。', 'Please answer the question in your own words first.'))
      return
    }
    if (response.clarity === null) {
      setStatus(tx('请为故事板的清楚程度评分。', 'Please rate how clearly the storyboard communicates its idea.'))
      return
    }
    if (test.index < 5) persist({ ...test, index: test.index + 1 })
    else {
      const completed = { ...test, stage: 'complete' as const, completedAt: new Date().toISOString() }
      persist(completed, tx('材料测试已完成', 'Material test complete'))
    }
  }

  const back = () => {
    if (test.stage === 'item' && test.index > 0) persist({ ...test, index: test.index - 1 })
  }

  const reset = () => {
    if (test.stage !== 'start' && !window.confirm(tx('重新开始会清除当前未完成的回答。确定继续吗？', 'Starting over will clear unfinished responses. Continue?'))) return
    clearTest(createTest())
    setSaveStatus(tx('尚未开始', 'Not started'))
    setStatus('')
  }

  const startCard = (
    <article className="study-flow-card study-start-card">
      <p className="eyebrow">{tx('正式实验前的材料测试', 'Material test before the main study')}</p>
      <h1>{tx('请帮助我们检查故事板是否表达清楚', 'Please help us check whether the storyboards are clear')}</h1>
      <p className="study-lead">{tx('你会依次看到六种隐私风险提醒与处理方式的五步故事板和文字说明。每看完一种，请立即用自己的话说明：你认为这个技术能帮助用户做什么。', 'You will see a five-step storyboard and written explanation for each of six privacy-risk notification approaches. After each one, explain in your own words what the technology can help a user do.')}</p>
      <div className="study-plain-grid"><article><strong>{tx('这不是偏好评分', 'This is not a preference rating')}</strong><p>{tx('我们只想知道故事是否让你理解了设计的作用。', 'We only want to know whether the story explains what the design does.')}</p></article><article><strong>{tx('请用自己的话回答', 'Answer in your own words')}</strong><p>{tx('不要只复述标题。即使不确定，也请写出目前的理解。', 'Do not repeat only the title. Even if unsure, describe your current understanding.')}</p></article><article><strong>{tx('每种都可以指出困惑', 'You may identify confusion for each style')}</strong><p>{tx('如果某一步、某个词或某张图不清楚，请具体说明。', 'If a step, term, or image is unclear, describe it specifically.')}</p></article></div>
      <div className="study-field"><label htmlFor="storyboard-participant-id"><span>{tx('参与者编号', 'Participant ID')} <em>{tx('必填', 'Required')}</em></span></label><VoiceTextInput id="storyboard-participant-id" value={test.participantId} placeholder={tx('例如 T01', 'For example, T01')} ariaLabel={tx('参与者编号', 'Participant ID')} onValueChange={(participantId) => setTest({ ...test, participantId })} /></div>
      <aside className="study-data-note"><strong>{tx('回答会自动保存在当前浏览器', 'Responses are autosaved in this browser')}</strong><p>{tx('完成六种材料后，可以下载一份用于研究者整理的 JSON 记录。', 'After all six materials, you can download a JSON record for the research team.')}</p></aside>
    </article>
  )

  const itemCard = item && response ? (
    <article className="study-flow-card study-material-card storyboard-test-card">
      <header className="study-material-header"><div><p className="eyebrow">{tx('材料', 'Material')} {test.index + 1} / 6</p><h1>{text(item.title)}</h1><p>{tx('请只根据下面的五步故事板和文字说明回答问题。', 'Answer using only the five-step storyboard and written explanation below.')}</p></div><span className="study-count-badge">{test.index + 1} / 6</span></header>
      <section className="study-storyboard"><Storyboard title={item.title} summary={item.storyboardSummary} image={item.storyboardImage} steps={item.storyboard} /></section>
      <div className="study-open-field"><label htmlFor={`story-answer-${itemId}`}><span>{tx('根据你的理解，这个技术能帮助用户做什么？', 'Based on your understanding, what can this technology help a user do?')} <em>{tx('必答', 'Required')}</em></span></label><VoiceTextInput id={`story-answer-${itemId}`} value={response.answer} multiline placeholder={tx('请用自己的话描述这个设计帮助用户发现、理解或处理什么。', 'In your own words, describe what this design helps a user notice, understand, or address.')} ariaLabel={tx('根据你的理解，这个技术能帮助用户做什么？', 'Based on your understanding, what can this technology help a user do?')} onValueChange={(answer) => updateResponse({ answer })} /></div>
      <div className="study-open-field"><label htmlFor={`story-confusion-${itemId}`}><span>{tx('哪里让你感到困惑？', 'What, if anything, was confusing?')} <small>{tx('选填', 'Optional')}</small></span></label><VoiceTextInput id={`story-confusion-${itemId}`} value={response.confusion} multiline ariaLabel={tx('哪里让你感到困惑？', 'What, if anything, was confusing?')} onValueChange={(confusion) => updateResponse({ confusion })} /></div>
      <fieldset className="study-question story-clarity-field"><legend>{tx('你觉得这个故事板表达得多清楚？', 'How clearly does this storyboard communicate its idea?')} <em>{tx('必答', 'Required')}</em></legend><div className="scale" role="radiogroup">{[1,2,3,4,5].map((value) => <label key={value}><input type="radio" name="clarity" value={value} checked={response.clarity === value} onChange={() => updateResponse({ clarity: value })} /><span>{value}</span></label>)}</div><div className="scale-anchors"><span>{tx('非常不清楚', 'Very unclear')}</span><span>{tx('非常清楚', 'Very clear')}</span></div></fieldset>
    </article>
  ) : null

  const completeCard = (
    <article className="study-flow-card study-complete-card"><div className="study-complete-mark" aria-hidden="true">✓</div><p className="eyebrow">{tx('材料测试已完成', 'Material test complete')}</p><h1>{tx('感谢你的回答', 'Thank you for your responses')}</h1><p className="study-lead">{tx('六种故事板的理解回答已经记录。请下载记录并交给研究人员。', 'Your comprehension responses for all six storyboards have been recorded. Download the record and give it to the researcher.')}</p><div className="study-result-actions"><button className="primary-btn" type="button" onClick={() => downloadJson(`${test.participantId}-react-storyboard-test.json`, result)}>{tx('下载材料测试记录', 'Download material-test record')}</button></div></article>
  )

  const stageLabel = tx('材料测试', 'Material test')
  const stepLabel = test.stage === 'start' ? tx('准备开始', 'Ready to begin') : test.stage === 'complete' ? tx('测试完成', 'Test complete') : `${tx('材料', 'Material')} ${test.index + 1} / 6`
  const nextLabel = test.stage === 'start' ? tx('开始材料测试', 'Start material test') : test.index === 5 ? tx('完成材料测试', 'Finish material test') : tx('保存并查看下一种', 'Save and view the next notification approach')

  return <StudyLayout stageLabel={stageLabel} stepLabel={stepLabel} progress={progress} saveStatus={saveStatus} onRestart={reset}>{test.stage === 'start' ? startCard : test.stage === 'item' ? itemCard : completeCard}{test.stage !== 'complete' ? <StickyNav hideBack={test.stage === 'start' || test.index === 0} backLabel={tx('上一个', 'Previous')} nextLabel={nextLabel} status={status} onBack={back} onNext={next} /> : null}</StudyLayout>
}
