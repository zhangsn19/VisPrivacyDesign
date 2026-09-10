import { useEffect, useMemo, useState } from 'react'
import { allOrders, allTrios, participantBlock, prototypeById, RATING_QUESTIONS } from '../data/study'
import { usePersistentState } from '../hooks/usePersistentState'
import { useLanguage } from '../useLanguage'
import type { PrototypeId, PrototypeInteraction, PrototypeResponse } from '../types'
import { downloadJson } from '../utils/download'
import { PrototypeLab } from '../components/PrototypeLab'
import { RatingForm } from '../components/RatingForm'
import { StickyNav, StudyLayout } from '../components/StudyLayout'
import { Storyboard } from '../components/Storyboard'
import { VoiceTextInput } from '../components/VoiceTextInput'
import { prolificRequest, readProlificEntry } from '../prolific'
import type { ProlificIdentity } from '../prolific'

type Stage = 'start' | 'pilot' | 'check' | 'rating' | 'ranking' | 'complete'

type FlowState = {
  version: 6
  stage: Stage
  participantId: string
  conditionCode: string
  ratingIds: PrototypeId[]
  orderPermutationIndex: number
  comprehension: {
    focus: string
    control: string
    checked: boolean
    score: number
    attemptCount: number
    firstAnswers: { focus: string; control: string } | null
    attempts: Array<{
      focus: string
      control: string
      score: number
      submittedAt: string
    }>
  }
  ratingIndex: number
  responses: Partial<Record<PrototypeId, PrototypeResponse>>
  ranking: Array<PrototypeId | ''>
  rankingReason: string
  rankingConfirmed: boolean
  startedAt: string | null
  completedAt: string | null
}

const emptyResponse = (): PrototypeResponse => ({
  riskViewed: false,
  actionCompleted: false,
  ratings: {},
  open: '',
})

const createFlow = (conditionCode: string): FlowState => ({
  version: 6,
  stage: 'start',
  participantId: '',
  conditionCode,
  ratingIds: [],
  orderPermutationIndex: 0,
  comprehension: { focus: '', control: '', checked: false, score: 0, attemptCount: 0, firstAnswers: null, attempts: [] },
  ratingIndex: 0,
  responses: {},
  ranking: ['', '', ''],
  rankingReason: '',
  rankingConfirmed: false,
  startedAt: null,
  completedAt: null,
})

function resolveCondition() {
  const requested = new URLSearchParams(window.location.search).get('condition') ?? ''
  const number = Number(requested.replace('c', ''))
  const index = Number.isInteger(number) && number >= 1 && number <= 20 ? number - 1 : null
  return {
    code: index === null ? 'adhoc' : `c${String(index + 1).padStart(2, '0')}`,
    index,
  }
}

const inferenceCheckOptions = [
  { value: 'recognition', zh: '识别出画面中出现了药瓶、文字和时间', en: 'Recognizing medicine, text, and time in the scene' },
  { value: 'inference', zh: '把多个线索联系起来，形成画面中没有直接写出的健康判断', en: 'Connecting multiple clues to form a health judgment not explicitly shown' },
  { value: 'sorting', zh: '根据用户指令，把桌面上的物品进行分类', en: 'Sorting the objects on the desk according to the user’s request' },
]

const ratingCheckOptions = [
  { value: 'experience', zh: '故事中的隐私风险提醒与处理方式，以及实际操作体验', en: 'The privacy-risk notification approach in the story and the hands-on interaction experience' },
  { value: 'accuracy', zh: 'AI 对健康状态的判断在现实中是否准确', en: 'Whether the AI’s health-status judgment is accurate in real life' },
  { value: 'appearance', zh: '眼镜或桌面画面看起来是否美观', en: 'Whether the glasses or desk scene looks visually appealing' },
]

function rotateOptions<T>(items: T[], offset: number): T[] {
  const index = ((offset % items.length) + items.length) % items.length
  return [...items.slice(index), ...items.slice(0, index)]
}

export function StudyFlowPage() {
  const { lang, text, tx } = useLanguage()
  const condition = useMemo(resolveCondition, [])
  const prolificEntry = useMemo(() => readProlificEntry(), [])
  const draftIdentity = prolificEntry.identity?.sessionId ?? 'local'
  const draftKey = `infer-vis-react-flow-v7-${condition.code}-${draftIdentity}`
  const [flow, setFlow, clearFlow] = usePersistentState(draftKey, () => createFlow(condition.code))
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [saveStatus, setSaveStatus] = useState(() => flow.stage === 'start' ? tx('尚未开始', 'Not started') : tx('已恢复上次未完成的进度', 'Restored unfinished progress'))

  useEffect(() => {
    document.title = tx('正式研究流程｜智能眼镜隐私提醒', 'Study Flow | Smart Glasses Privacy Alerts')
  }, [tx])

  useEffect(() => {
    setSaveStatus(flow.stage === 'start'
      ? tx('尚未开始', 'Not started')
      : flow.stage === 'complete'
        ? tx('研究已完成', 'Study complete')
        : tx('进度已自动保存', 'Progress autosaved'))
  }, [lang, flow.stage, tx])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [flow.stage, flow.ratingIndex])

  useEffect(() => {
    const prolificPid = prolificEntry.identity?.prolificPid
    if (flow.stage === 'start' && prolificPid && flow.participantId !== prolificPid) {
      setFlow((current) => current.stage === 'start' ? { ...current, participantId: prolificPid } : current)
    }
  }, [flow.stage, flow.participantId, prolificEntry.identity?.prolificPid, setFlow])

  const persist = (next: FlowState, message?: string) => {
    setFlow(next)
    setSaveStatus(message ?? tx('进度已自动保存', 'Progress autosaved'))
  }

  const currentId = flow.ratingIds[flow.ratingIndex]
  const currentPrototype = currentId ? prototypeById(currentId) : null
  const currentResponse = currentId ? flow.responses[currentId] ?? emptyResponse() : emptyResponse()
  const ratingsMissing = RATING_QUESTIONS.filter((question) => !currentResponse.ratings[question.id]).length
  const taskComplete = currentResponse.riskViewed && currentResponse.actionCompleted
  const comprehensionBlock = participantBlock(flow.participantId)
  const orderedInferenceOptions = rotateOptions(inferenceCheckOptions, comprehensionBlock % inferenceCheckOptions.length)
  const orderedRatingOptions = rotateOptions(ratingCheckOptions, (comprehensionBlock + 1) % ratingCheckOptions.length)

  const progress = flow.stage === 'start' ? 0
    : flow.stage === 'pilot' ? 14
      : flow.stage === 'check' ? 29
        : flow.stage === 'rating' ? 43 + flow.ratingIndex * 14
          : flow.stage === 'ranking' ? 86
            : 100

  const stageLabel = flow.stage === 'ranking'
    ? tx('第三部分 · 综合比较', 'Part 3 · Overall comparison')
    : flow.stage === 'rating'
      ? tx('第二部分 · 正式评分', 'Part 2 · Formal ratings')
      : flow.stage === 'complete'
        ? tx('研究完成', 'Study complete')
        : flow.stage === 'start'
          ? tx('研究流程', 'Study flow')
          : tx('第一部分 · 了解研究', 'Part 1 · Understand the study')

  const stepLabel = flow.stage === 'start' ? tx('准备开始', 'Ready to begin')
    : flow.stage === 'pilot' ? tx('认识智能眼镜与隐私推断', 'Learn about smart glasses and privacy inference')
      : flow.stage === 'check' ? tx('完成两道理解题', 'Complete two comprehension questions')
        : flow.stage === 'rating' ? `${tx('独立评分', 'Independent rating')} ${flow.ratingIndex + 1} / 3`
          : flow.stage === 'ranking' ? tx('完成最终排序', 'Complete the final ranking')
            : tx('感谢你的参与', 'Thank you for participating')

  const assignCondition = (participantId: string) => {
    const block = participantBlock(participantId)
    const trios = allTrios()
    const trioIndex = condition.index ?? block % trios.length
    const orderIndex = condition.index === null
      ? Math.floor(block / trios.length) % 6
      : block % 6
    return {
      conditionCode: `c${String(trioIndex + 1).padStart(2, '0')}`,
      ratingIds: allOrders(trios[trioIndex])[orderIndex],
      orderIndex,
    }
  }

  const startStudy = async () => {
    if (prolificEntry.error) {
      setStatus(prolificEntry.error)
      return
    }
    const participantId = prolificEntry.identity?.prolificPid ?? flow.participantId.trim()
    if (!participantId) {
      setStatus(tx('请先填写参与者编号。', 'Enter a participant ID first.'))
      return
    }
    const assignment = assignCondition(participantId)
    if (prolificEntry.identity) {
      setSubmitting(true)
      setStatus(tx('正在安全登记 Prolific 参与信息…', 'Securely registering your Prolific participation…'))
      try {
        const response = await prolificRequest<{ redirectUrl?: string }>('/api/prolific/start', {
          prolific: prolificEntry.identity,
          conditionCode: assignment.conditionCode,
        })
        if (response.redirectUrl) {
          window.location.assign(response.redirectUrl)
          return
        }
      } catch (error) {
        setSubmitting(false)
        setStatus(error instanceof Error ? error.message : tx('参与信息无法保存，请重试。', 'Participation details could not be saved. Please try again.'))
        return
      }
      setSubmitting(false)
    }
    persist({
      ...createFlow(assignment.conditionCode),
      stage: 'pilot',
      participantId,
      ratingIds: assignment.ratingIds,
      orderPermutationIndex: assignment.orderIndex,
      startedAt: new Date().toISOString(),
    }, tx('研究已开始，进度已保存', 'Study started and progress saved'))
    setStatus('')
  }

  const next = async () => {
    if (submitting) return
    setStatus('')
    if (flow.stage === 'start') return await startStudy()
    if (flow.stage === 'pilot') return persist({ ...flow, stage: 'check' })
    if (flow.stage === 'check') {
      if (!flow.comprehension.focus || !flow.comprehension.control) {
        setStatus(tx('请先回答两道理解题。', 'Answer both comprehension questions first.'))
        return
      }
      const score = Number(flow.comprehension.focus === 'inference') + Number(flow.comprehension.control === 'experience')
      if (!flow.comprehension.checked) {
        const submittedAt = new Date().toISOString()
        const firstAnswers = flow.comprehension.firstAnswers ?? { focus: flow.comprehension.focus, control: flow.comprehension.control }
        persist({
          ...flow,
          comprehension: {
            ...flow.comprehension,
            checked: true,
            score,
            attemptCount: flow.comprehension.attemptCount + 1,
            firstAnswers,
            attempts: [...flow.comprehension.attempts, { focus: flow.comprehension.focus, control: flow.comprehension.control, score, submittedAt }],
          },
        })
        return
      }
      if (score !== 2) {
        setStatus(tx('请根据提示重新选择，理解正确后再继续。', 'Use the feedback to choose again; continue after both answers are correct.'))
        return
      }
      return persist({ ...flow, stage: 'rating', ratingIndex: 0 })
    }
    if (flow.stage === 'rating') {
      if (!taskComplete) {
        setStatus(tx('请先完成上方两步操作。', 'Complete the two interaction steps above first.'))
        return
      }
      if (ratingsMissing > 0 || !currentResponse.open.trim()) {
        setStatus(tx(ratingsMissing > 0 ? `还有 ${ratingsMissing} 道必答题未完成。` : '请填写必答的补充说明。', ratingsMissing > 0 ? `${ratingsMissing} required items remain.` : 'Please complete the required additional comments.'))
        return
      }
      return persist(flow.ratingIndex < 2 ? { ...flow, ratingIndex: flow.ratingIndex + 1 } : { ...flow, stage: 'ranking' })
    }
    if (flow.stage === 'ranking') {
      const selected = flow.ranking.filter(Boolean)
      if (selected.length !== 3 || new Set(selected).size !== 3) {
        setStatus(tx('请为三个名次分别选择不同的提醒与处理方式。', 'Choose a different notification approach for each rank.'))
        return
      }
      if (!flow.rankingReason.trim()) {
        setStatus(tx('请填写排序理由。', 'Explain your ranking.'))
        return
      }
      if (!flow.rankingConfirmed) {
        setStatus(tx('请检查排序并勾选确认。', 'Review the ranking and check the confirmation box.'))
        return
      }
      const completed = { ...flow, stage: 'complete' as const, completedAt: new Date().toISOString() }
      if (prolificEntry.identity) {
        setSubmitting(true)
        setStatus(tx('正在保存全部研究数据并返回 Prolific…', 'Saving all study data and returning to Prolific…'))
        try {
          const response = await prolificRequest<{ redirectUrl: string }>('/api/prolific/complete', {
            prolific: prolificEntry.identity,
            conditionCode: flow.conditionCode,
            result: buildResult(completed, prolificEntry.identity, lang),
          })
          persist(completed, tx('研究已保存，正在返回 Prolific', 'Study saved; returning to Prolific'))
          window.location.assign(response.redirectUrl)
        } catch (error) {
          setSubmitting(false)
          setStatus(error instanceof Error ? error.message : tx('研究数据无法保存，请重试。', 'The study data could not be saved. Please try again.'))
        }
        return
      }
      persist(completed, tx('研究已完成', 'Study complete'))
    }
  }

  const back = () => {
    setStatus('')
    if (flow.stage === 'pilot') persist({ ...flow, stage: 'start' })
    else if (flow.stage === 'check') persist({ ...flow, stage: 'pilot' })
    else if (flow.stage === 'rating' && flow.ratingIndex > 0) persist({ ...flow, ratingIndex: flow.ratingIndex - 1 })
    else if (flow.stage === 'ranking') persist({ ...flow, stage: 'rating', ratingIndex: 2 })
  }

  const reset = () => {
    if (flow.stage !== 'start' && !window.confirm(tx('重新开始会清除当前未完成的作答。确定继续吗？', 'Starting over will clear unfinished responses. Continue?'))) return
    clearFlow(createFlow(condition.code))
    setSaveStatus(tx('尚未开始', 'Not started'))
    setStatus('')
  }

  const setResponse = (response: PrototypeResponse) => {
    if (!currentId) return
    persist({ ...flow, responses: { ...flow.responses, [currentId]: response } })
  }

  const buildResult = (currentFlow: FlowState, prolific: ProlificIdentity | null, uiLanguage: string) => ({
    schemaVersion: 2,
    studyVersion: 'infer-vis-react-prototype-specific-storyboards-v7',
    framework: 'react-vite-typescript',
    uiLanguage,
    participantId: currentFlow.participantId,
    prolific,
    conditionCode: currentFlow.conditionCode,
    presentationOrder: currentFlow.ratingIds,
    orderPermutationIndex: currentFlow.orderPermutationIndex,
    startedAt: currentFlow.startedAt,
    completedAt: currentFlow.completedAt,
    storyboardPresentation: 'prototype-specific',
    comprehension: {
      ...currentFlow.comprehension,
      optionOrder: {
        focus: orderedInferenceOptions.map((option) => option.value),
        control: orderedRatingOptions.map((option) => option.value),
      },
    },
    responses: currentFlow.responses,
    ranking: currentFlow.ranking,
    rankingReason: currentFlow.rankingReason,
  })

  const result = buildResult(flow, prolificEntry.identity, lang)
  const conditionNote = condition.index === null
    ? tx('系统会根据参与编号稳定分配一个实验条件。', 'The system will assign one study condition consistently from your participant ID.')
    : tx(`本链接的实验条件为 ${condition.code.toUpperCase()}。`, `This link uses condition ${condition.code.toUpperCase()}.`)

  const renderStart = () => (
    <article className="study-flow-card study-start-card">
      <p className="eyebrow">{tx('欢迎参加研究', 'Welcome to the study')}</p>
      <h1>{tx('了解隐私推断后，独立评价三种设计', 'After learning about privacy inference, independently rate three designs')}</h1>
      <div className="study-route" aria-label={tx('研究流程概览', 'Study flow overview')}>
        {[
          ['01', '了解概念', 'Learn the concept', '用日常例子认识隐私推断', 'Learn privacy inference through an everyday example'],
          ['02', '完成理解检查', 'Complete a comprehension check', '确认你理解研究关注的风险', 'Confirm you understand the risk studied here'],
          ['03', '评价三种设计', 'Rate three designs', '阅读每种设计的故事、体验原型后评分', 'Read each design’s story, try its prototype, then rate it'],
          ['04', '排序并完成', 'Rank and finish', '比较三种设计并说明理由', 'Compare the three designs and explain your reasoning'],
        ].map(([number, zhTitle, enTitle, zhBody, enBody]) => <article key={number}><span>{number}</span><strong>{tx(zhTitle, enTitle)}</strong><p>{tx(zhBody, enBody)}</p></article>)}
      </div>
      {prolificEntry.identity ? <aside className="study-data-note"><strong>{tx('已从 Prolific 安全读取参与编号', 'Your participant ID was securely received from Prolific')}</strong><p>{conditionNote} {tx('刷新后可以继续；完成时研究数据会保存到服务器并自动返回 Prolific。', 'You can resume after refreshing; at completion, your data will be saved to the server and you will automatically return to Prolific.')}</p></aside> : <><div className="study-field"><label htmlFor="study-participant-id"><span>{tx('参与者编号', 'Participant ID')} <em>{tx('必填', 'Required')}</em></span></label><VoiceTextInput id="study-participant-id" value={flow.participantId} autoComplete="off" placeholder={tx('例如 P01', 'For example, P01')} ariaLabel={tx('参与者编号', 'Participant ID')} onValueChange={(participantId) => setFlow({ ...flow, participantId })} /></div><aside className="study-data-note"><strong>{tx('你的进度会自动保存在当前浏览器', 'Your progress is autosaved in this browser')}</strong><p>{conditionNote} {tx('刷新后可以继续；完成后可下载 JSON 研究记录。', 'You can resume after refreshing and download a JSON record at the end.')}</p></aside></>}
      {prolificEntry.error ? <p className="study-result-status" role="alert">{prolificEntry.error}</p> : null}
    </article>
  )

  const renderPilot = () => (
    <article className="study-flow-card study-pilot-card">
      <p className="eyebrow">{tx('先理解我们在研究什么', 'First, understand what this study is about')}</p>
      <h1>{tx('智能眼镜不仅能“看到”，还可能从线索中猜出关于你的信息', 'Smart glasses may not only “see”—they may infer information about you from clues')}</h1>
      <p className="study-lead">{tx('可以把智能眼镜理解为戴在脸上的相机和 AI 助手。你让它帮忙整理桌面，它需要识别物品；但它也可能把任务之外的细节联系起来。', 'Think of smart glasses as a wearable camera and AI assistant. To organize a desk they identify objects, but they may also connect details beyond the task.')}</p>
      <figure className="study-pilot-figure"><img src="/assets/room-office.jpg" alt={tx('有文件、药品和日常用品的工作桌面', 'A work desk with documents, medicine, and everyday items')} /><figcaption>{tx('例子：你只想让 AI 帮忙整理桌面', 'Example: you only want AI to help organize your desk')}</figcaption></figure>
      <div className="study-inference-path" aria-label={tx('隐私推断过程', 'Privacy-inference process')}>
        <article><span>1</span><strong>{tx('眼镜看到', 'Glasses see')}</strong><p>{tx('药瓶、复诊日期、深夜工作', 'Medicine, a follow-up date, and late-night work')}</p></article><b>→</b>
        <article><span>2</span><strong>{tx('AI 联系线索', 'AI connects clues')}</strong><p>{tx('多个普通细节被放在一起', 'Several ordinary details are combined')}</p></article><b>→</b>
        <article><span>3</span><strong>{tx('形成猜测', 'Forms an inference')}</strong><p>{tx('例如近期健康状态或生活规律', 'For example, recent health or daily routines')}</p></article>
      </div>
      <div className="study-plain-grid">
        <article><strong>{tx('“看见”不等于“推断”', '“Seeing” is not the same as “inferring”')}</strong><p>{tx('看见药瓶是识别物品；结合药瓶、复诊日期和作息猜测健康状态，才是推断。', 'Seeing medicine is object recognition; combining it with a follow-up date and routines to guess health is an inference.')}</p></article>
        <article><strong>{tx('推断可能不正确', 'An inference may be wrong')}</strong><p>{tx('风险也来自系统可能在你不知道时形成、保存或使用这种判断。', 'Risk also comes from the system forming, storing, or using this judgment without your awareness.')}</p></article>
        <article><strong>{tx('接下来评价什么', 'What you will evaluate')}</strong><p>{tx('你会阅读每种设计的故事、体验相应的隐私风险提醒与处理方式，然后评价这种体验；不需要判断 AI 的猜测是否真实或准确。', 'You will read each design’s story, try its privacy-risk notification approach, and evaluate that experience; you do not need to decide whether the AI’s inference is true or accurate.')}</p></article>
      </div>
    </article>
  )

  const renderCheck = () => (
    <article className="study-flow-card study-check-card">
      <p className="eyebrow">{tx('两道理解题', 'Two comprehension questions')}</p>
      <h1>{tx('根据刚才的例子回答两题', 'Answer two questions about the example')}</h1>
      <p className="study-lead">{tx('下面的问题用于确认前面的说明是否清楚，不是知识考试。回答后会看到提示；如果有误解，可以重新选择。', 'These questions check whether the explanation was clear; they are not a knowledge test. You will receive feedback and may choose again if needed.')}</p>
      <fieldset className="study-question"><legend>1. {tx('智能眼镜看到药瓶、复诊提醒和晚间工作时间，随后提示“用户近期可能有健康管理需求”。这里所说的“隐私推断”是指什么？', 'Smart glasses see medicine, a follow-up reminder, and late-night work, then suggest that the user may have recent health-management needs. What does “privacy inference” mean here?')} <em>{tx('必答', 'Required')}</em></legend>
        {orderedInferenceOptions.map((option) => <label key={option.value}><input type="radio" name="focus" value={option.value} checked={flow.comprehension.focus === option.value} onChange={(event) => persist({ ...flow, comprehension: { ...flow.comprehension, focus: event.target.value, checked: false } })} /><span>{tx(option.zh, option.en)}</span></label>)}
      </fieldset>
      <fieldset className="study-question"><legend>2. {tx('接下来的正式评分中，你要评价什么？', 'What will you evaluate in the formal rating rounds?')} <em>{tx('必答', 'Required')}</em></legend>
        {orderedRatingOptions.map((option) => <label key={option.value}><input type="radio" name="control" value={option.value} checked={flow.comprehension.control === option.value} onChange={(event) => persist({ ...flow, comprehension: { ...flow.comprehension, control: event.target.value, checked: false } })} /><span>{tx(option.zh, option.en)}</span></label>)}
      </fieldset>
      {flow.comprehension.checked ? <aside className={`study-feedback ${flow.comprehension.score === 2 ? 'is-correct' : 'is-warning'}`}><strong>{flow.comprehension.score === 2 ? tx('理解正确', 'Correct') : tx('请再看一遍概念', 'Review the concept once more')}</strong><p>{tx('我们关注 AI 把多个线索联系起来后可能形成的个人信息推断。正式评分评价的是隐私风险提醒与处理方式的体验，不评价推断在现实中是否准确。', 'We focus on personal information an AI may infer by connecting multiple clues. The formal ratings assess the notification approach and interaction experience, not whether the inference is accurate in real life.')}</p></aside> : null}
    </article>
  )

  const renderRating = () => currentPrototype && currentId ? (
    <article className="study-flow-card study-rating-card">
      <header className="study-material-header"><div><p className="eyebrow">{tx('正式评分', 'Formal rating')} {flow.ratingIndex + 1} / 3</p><h1>{text(currentPrototype.title)}</h1><p>{tx('先阅读这种设计的故事，再体验下方的隐私风险提醒与处理方式，最后完成评分。', 'Read this design’s story, try the privacy-risk notification approach below, then complete the rating.')}</p></div><span className="study-count-badge">{flow.ratingIndex + 1} / 3</span></header>
      <section className="study-storyboard"><Storyboard title={currentPrototype.title} summary={currentPrototype.storyboardSummary} image={currentPrototype.storyboardImage} steps={currentPrototype.storyboard} /></section>
      <section className="study-prototype-experience">
        <section className={`study-interaction-task ${taskComplete ? 'is-complete' : ''}`} data-interaction-task>
          <header className="study-interaction-task-head"><div><p className="eyebrow">{tx('请先完成', 'Before you rate')}</p><h3>{tx('完成这两步即可评分', 'Complete these two steps to rate')}</h3></div><span>{taskComplete ? tx('已完成，可以评分', 'Complete — rating unlocked') : tx('完成后即可评分', 'Rating unlocks after both steps')}</span></header>
          <ol>
            <li className={currentResponse.riskViewed ? 'is-done' : ''}><span>1</span><div><strong>{tx('找到并打开“健康状态”风险', 'Find and open the Health status risk')}</strong><p>{tx('查看药品标签、复诊提醒和晚间时间为何可能形成健康状态推断。', 'Inspect why the medicine label, follow-up reminder, and late-work time may support a health-status inference.')}</p></div><b>✓</b></li>
            <li className={currentResponse.actionCompleted ? 'is-done' : ''}><span>2</span><div><strong>{tx('为“健康状态”选择一种处理方式', 'Choose an action for Health status')}</strong><p>{tx('选择处理、允许本次使用或稍后提醒；请按照真实判断操作。', 'Choose Address, Allow this use, or Remind me later based on your actual judgment.')}</p></div><b>✓</b></li>
          </ol>
        </section>
        <PrototypeLab prototypeId={currentId} interaction={currentResponse} onInteraction={(interaction: PrototypeInteraction) => setResponse({ ...currentResponse, ...interaction })} />
      </section>
      <RatingForm response={currentResponse} locked={!taskComplete} onChange={setResponse} />
    </article>
  ) : null

  const renderRanking = () => (
    <article className="study-flow-card study-ranking-card">
      <p className="eyebrow">{tx('最后一步', 'Final step')}</p><h1>{tx('把刚才三种设计放在一起比较', 'Compare the three designs you just rated')}</h1>
      <p className="study-lead">{tx('请按照“帮助用户发现并处理隐私风险的有效程度”，分别选出第一、第二和第三名。', 'Rank the notification approaches first, second, and third by how effectively they help users notice and address privacy risks.')}</p>
      <div className="study-rank-list">
        {[0, 1, 2].map((rank) => <label className="rank-row" key={rank}><span>{rank + 1}</span><strong>{tx(`第 ${rank + 1} 名`, `Rank ${rank + 1}`)}</strong><select value={flow.ranking[rank]} onChange={(event) => { const ranking = [...flow.ranking]; ranking[rank] = event.target.value as PrototypeId | ''; persist({ ...flow, ranking, rankingConfirmed: false }) }}><option value="">{tx('请选择', 'Select')}</option>{flow.ratingIds.map((id) => <option key={id} value={id}>{text(prototypeById(id).title)}</option>)}</select></label>)}
      </div>
      <div className="study-open-field"><label htmlFor="ranking-reason"><span>{tx('请说明排序理由', 'Explain your ranking')} <em>{tx('必填', 'Required')}</em></span></label><VoiceTextInput id="ranking-reason" value={flow.rankingReason} multiline ariaLabel={tx('请说明排序理由', 'Explain your ranking')} onValueChange={(rankingReason) => persist({ ...flow, rankingReason })} /></div>
      <label className="study-confirm-row"><input type="checkbox" checked={flow.rankingConfirmed} onChange={(event) => persist({ ...flow, rankingConfirmed: event.target.checked })} /><span>{tx('我已检查并确认以上排序', 'I have reviewed and confirmed this ranking')}</span></label>
    </article>
  )

  const renderComplete = () => (
    <article className="study-flow-card study-complete-card">
      <div className="study-complete-mark" aria-hidden="true">✓</div><p className="eyebrow">{tx('研究流程已完成', 'Study flow complete')}</p><h1>{tx('感谢你的参与', 'Thank you for participating')}</h1><p className="study-lead">{tx('所有必答内容已经完成。请按照研究人员的指示下载并提交研究记录。', 'All required items are complete. Download and submit the study record as instructed by the researcher.')}</p>
      <div className="study-complete-summary"><article><span>{tx('正式评价', 'Formal ratings')}</span><strong>{tx('3 种设计', '3 designs')}</strong></article><article><span>{tx('实验条件', 'Condition')}</span><strong>{flow.conditionCode.toUpperCase()}</strong></article></div>
      {!prolificEntry.identity ? <div className="study-result-actions"><button className="primary-btn" type="button" onClick={() => downloadJson(`${flow.participantId}-${flow.conditionCode}-react-study.json`, result)}>{tx('下载研究记录', 'Download study record')}</button><button className="ghost-btn" type="button" onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}>{tx('复制研究记录', 'Copy study record')}</button></div> : null}
    </article>
  )

  const content = flow.stage === 'start' ? renderStart() : flow.stage === 'pilot' ? renderPilot() : flow.stage === 'check' ? renderCheck() : flow.stage === 'rating' ? renderRating() : flow.stage === 'ranking' ? renderRanking() : renderComplete()
  const nextLabel = flow.stage === 'start' ? tx('开始研究', 'Start study') : flow.stage === 'pilot' ? tx('继续理解检查', 'Continue to comprehension check') : flow.stage === 'check' ? flow.comprehension.checked && flow.comprehension.score === 2 ? tx('开始第一种评分', 'Start the first rating') : tx('检查答案', 'Check answers') : flow.stage === 'rating' ? flow.ratingIndex === 2 ? tx('完成三种评分', 'Finish three ratings') : tx('保存并查看下一种', 'Save and view the next notification approach') : tx('确认并完成研究', 'Confirm and finish the study')
  const navStatus = status || (flow.stage === 'rating' ? !taskComplete ? tx('请先完成上方两步操作，评分会自动解锁', 'Complete the two steps above to unlock ratings') : ratingsMissing ? tx(`还有 ${ratingsMissing} 道必答题未完成`, `${ratingsMissing} required items remaining`) : !currentResponse.open.trim() ? tx('请填写必答的补充说明后继续', 'Please complete the required additional comments') : tx('评分和补充说明已完成，可以继续', 'Ratings and required comments are complete. You may continue.') : '')

  const previewFooter = new URLSearchParams(window.location.search).has('preview') ? (
    <footer className="study-researcher-entry react-researcher-entry">
      <details open>
        <summary>{tx('研究者预览入口', 'Researcher preview')}</summary>
        <p>{tx('以下页面不要求先完成正式流程。', 'These pages can be opened without completing the formal flow.')}</p>
        <div><a href="/storyboard-test.html">Storyboard Test</a><a href="/conditions.html">{tx('20 个实验条件', '20 study conditions')}</a><a href="/prototype-gallery.html">{tx('六种交互原型', 'Six interactive prototypes')}</a></div>
      </details>
    </footer>
  ) : null

  return (
    <StudyLayout stageLabel={stageLabel} stepLabel={stepLabel} progress={progress} saveStatus={saveStatus} onRestart={reset} footer={previewFooter}>
      {content}
      {flow.stage !== 'complete' ? <StickyNav hideBack={flow.stage === 'start' || (flow.stage === 'rating' && flow.ratingIndex === 0)} backLabel={tx('上一步', 'Back')} nextLabel={nextLabel} status={navStatus} onBack={back} onNext={next} /> : null}
    </StudyLayout>
  )
}
