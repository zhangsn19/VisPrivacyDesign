import { useLanguage } from '../useLanguage'
import type { LocalizedText, StoryStep } from '../types'

type StoryboardProps = {
  title: LocalizedText
  summary: LocalizedText
  image: string
  steps: StoryStep[]
  standardized?: boolean
}

function frameImage(image: string, index: number) {
  return image.replace(/-clean\.png$/, `-clean-${index + 1}.png`)
}

export function Storyboard({ title, summary, image, steps, standardized = false }: StoryboardProps) {
  const { text, tx } = useLanguage()

  return (
    <section className="storyboard-feature compact react-storyboard">
      <header className="storyboard-heading">
        <div>
          <p className="eyebrow">{standardized ? tx('统一五步情境', 'Shared five-step scenario') : tx('五步故事 · 看它怎样进入日常使用', 'Five-step story · See how it fits into everyday use')}</p>
          <h2>{text(title)}</h2>
          <p>{text(summary)}</p>
        </div>
      </header>
      <ol className="storyboard-strip" aria-label={`${text(title)} — ${tx('五个故事步骤', 'five story steps')}`}>
        {steps.map((item, index) => (
          <li className="storyboard-step" key={`${text(item.title)}-${index}`}>
            <div className="storyboard-frame">
              <img src={frameImage(image, index)} alt={`${text(title)} ${tx('分镜', 'storyboard')} ${index + 1}`} loading="lazy" />
              <span className="storyboard-frame-index">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="storyboard-step-copy">
              <strong>{text(item.title)}</strong>
              <p>{text(item.body)}</p>
            </div>
          </li>
        ))}
      </ol>
      {standardized ? <p className="storyboard-note">{tx('这段故事用于说明共同情境；请结合下方的交互体验回答评分题。', 'This story establishes the shared situation. Answer the rating questions using the interaction below.')}</p> : null}
    </section>
  )
}
