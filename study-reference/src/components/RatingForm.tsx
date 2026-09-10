import { RATING_QUESTIONS } from '../data/study'
import { useLanguage } from '../useLanguage'
import type { PrototypeResponse, RatingQuestion } from '../types'
import { VoiceTextInput } from './VoiceTextInput'

export function RatingForm({
  response,
  locked,
  onChange,
}: {
  response: PrototypeResponse
  locked: boolean
  onChange: (next: PrototypeResponse) => void
}) {
  const { lang, text, tx } = useLanguage()
  const complete = RATING_QUESTIONS.every((question) => response.ratings[question.id]) && Boolean(response.open.trim())

  const setRating = (question: RatingQuestion, value: number) => {
    onChange({ ...response, ratings: { ...response.ratings, [question.id]: value } })
  }

  return (
    <section className={`study-rating-section ${locked ? 'is-locked' : ''}`}>
      <header>
        <div>
          <p className="eyebrow">{tx('完成操作后评分', 'Rate after completing the task')}</p>
          <h2>{tx('根据刚才的实际体验作答', 'Answer based on the interaction you just completed')}</h2>
        </div>
        <span>{locked ? tx('尚未解锁', 'Locked') : complete ? tx('六道题已完成', 'All six items complete') : tx('评分已解锁', 'Ratings unlocked')}</span>
      </header>

      <div className="study-rating-list">
        {RATING_QUESTIONS.map((question, index) => (
          <fieldset className="rating" key={question.id} data-question-id={question.id}>
            <legend>{index + 1}. {text(question.text)} <em>{tx('必答', 'Required')}</em></legend>
            <p className="rating-scale-note">{lang === 'zh' ? `评分说明：1 = ${text(question.low)}；5 = ${text(question.high)}` : `Scale: 1 = ${text(question.low)}; 5 = ${text(question.high)}`}</p>
            <div className="scale" role="radiogroup" aria-label={text(question.text)}>
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`rating-${question.id}`}
                    value={value}
                    checked={response.ratings[question.id] === value}
                    disabled={locked}
                    onChange={() => setRating(question, value)}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="study-open-field">
        <label htmlFor="rating-additional-comments"><span>{tx('补充说明', 'Additional comments')} <em>{tx('必答', 'Required')}</em></span></label>
        <VoiceTextInput
          id="rating-additional-comments"
          value={response.open}
          disabled={locked}
          required
          multiline
          ariaLabel={tx('补充说明', 'Additional comments')}
          placeholder={tx('为什么这种隐私风险提醒与处理方式有效或无效？它适合什么情境？', 'Why is this notification approach effective or ineffective? What situations suit it?')}
          onValueChange={(open) => onChange({ ...response, open })}
        />
      </div>
    </section>
  )
}
