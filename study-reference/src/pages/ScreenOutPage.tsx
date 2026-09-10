import { useMemo, useState } from 'react'
import { StudyLayout } from '../components/StudyLayout'
import { prolificRequest, readProlificEntry } from '../prolific'
import { useLanguage } from '../useLanguage'

function conditionCode() {
  const value = (new URLSearchParams(window.location.search).get('condition') ?? 'adhoc').toLowerCase()
  return /^c(?:0[1-9]|1[0-9]|20)$/.test(value) ? value : 'adhoc'
}

export function ScreenOutPage() {
  const { tx } = useLanguage()
  const entry = useMemo(() => readProlificEntry(), [])
  const condition = useMemo(conditionCode, [])
  const [status, setStatus] = useState(entry.error ?? '')
  const [submitting, setSubmitting] = useState(false)

  const finish = async () => {
    if (!entry.identity || submitting) return
    setSubmitting(true)
    setStatus(tx('正在安全保存筛选结果…', 'Securely saving the screening outcome…'))
    try {
      const response = await prolificRequest<{ redirectUrl: string }>('/api/prolific/screen-out', {
        prolific: entry.identity,
        conditionCode: condition,
        reason: 'not_eligible',
      })
      window.location.assign(response.redirectUrl)
    } catch (error) {
      setSubmitting(false)
      setStatus(error instanceof Error ? error.message : tx('无法保存筛选结果，请重试。', 'The screening outcome could not be saved. Please try again.'))
    }
  }

  return (
    <StudyLayout stageLabel={tx('资格筛选', 'Eligibility screening')} stepLabel={tx('筛选结束', 'Screening complete')} progress={100} saveStatus={status || tx('等待返回 Prolific', 'Ready to return to Prolific')}>
      <article className="study-flow-card study-complete-card">
        <p className="eyebrow">{tx('感谢你的时间', 'Thank you for your time')}</p>
        <h1>{tx('你不符合本研究当前的参与条件', 'You are not eligible for this study')}</h1>
        <p className="study-lead">{tx('你的筛选结果将被记录，然后你会返回 Prolific。筛选报酬由 Prolific 的 Screened out completion path 处理。', 'Your screening outcome will be recorded, then you will return to Prolific. The screening payment is handled by the study’s Screened out completion path.')}</p>
        {entry.identity ? <div className="study-result-actions"><button className="primary-btn" type="button" disabled={submitting} onClick={finish}>{submitting ? tx('正在返回…', 'Returning…') : tx('返回 Prolific', 'Return to Prolific')}</button></div> : null}
        {status ? <p className="study-result-status" role="status">{status}</p> : null}
      </article>
    </StudyLayout>
  )
}
