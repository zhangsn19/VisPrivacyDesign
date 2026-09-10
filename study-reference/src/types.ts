export type Language = 'zh' | 'en'

export type LocalizedText = {
  zh: string
  en: string
}

export type PrototypeId =
  | 'panel'
  | 'dialog'
  | 'boxedPanel'
  | 'timeline'
  | 'hint'
  | 'contained'

export type RiskId = 'health' | 'work' | 'routine'
export type RiskAction = 'address' | 'allow' | 'later'

export type StoryStep = {
  title: LocalizedText
  body: LocalizedText
}

export type PrototypeDefinition = {
  id: PrototypeId
  title: LocalizedText
  meta: LocalizedText
  short: LocalizedText
  concept: LocalizedText
  storyboardImage: string
  storyboardSummary: LocalizedText
  storyboard: StoryStep[]
}

export type Risk = {
  id: RiskId
  label: LocalizedText
  score: number
  color: string
  evidence: LocalizedText[]
  inference: LocalizedText
  action: LocalizedText
}

export type RatingQuestion = {
  id: 'relate' | 'understand' | 'control' | 'nonInterruption' | 'trust' | 'overall'
  text: LocalizedText
  low: LocalizedText
  high: LocalizedText
}

export type PrototypeInteraction = {
  riskViewed: boolean
  actionCompleted: boolean
  action?: RiskAction
  riskViewedAt?: string
  actionCompletedAt?: string
  riskActions?: Partial<Record<RiskId, {
    action: RiskAction
    completedAt: string
  }>>
}

export type PrototypeResponse = PrototypeInteraction & {
  ratings: Partial<Record<RatingQuestion['id'], number>>
  open: string
}
