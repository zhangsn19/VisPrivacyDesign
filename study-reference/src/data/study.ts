import type {
  LocalizedText,
  PrototypeDefinition,
  PrototypeId,
  RatingQuestion,
  Risk,
  StoryStep,
} from '../types'

const l = (zh: string, en: string): LocalizedText => ({ zh, en })
const step = (zhTitle: string, enTitle: string, zhBody: string, enBody: string): StoryStep => ({
  title: l(zhTitle, enTitle),
  body: l(zhBody, enBody),
})

export const PROTOTYPES: PrototypeDefinition[] = [
  {
    id: 'panel',
    title: l('集中风险清单', 'Central risk list'),
    meta: l('集中查看，不遮挡原图', 'One list beside the image'),
    short: l('把所有可能猜出的个人信息集中列在画面旁边，适合一次看完并统一处理。', 'Lists all possible personal inferences beside the scene for review and action in one place.'),
    concept: l('系统不直接遮挡当前画面，而是在旁边列出可能猜出的个人信息。用户先看风险类别，再展开原因和处理动作。', 'The scene stays visible while possible personal inferences appear in a separate list with evidence and actions.'),
    storyboardImage: '/assets/storyboards/01-central-list-clean.png',
    storyboardSummary: l('当下不弹出提醒；稍后在配套手机的集中清单中回顾跨场景形成的健康、位置等推断。', 'No alert interrupts the current task; later, a companion-phone list consolidates health, location, and other inferences formed across contexts.'),
    storyboard: [
      step('人物', 'Person', 'Alice 日常佩戴智能眼镜，让 AI 协助记录路线、识别环境并管理日程。', 'Alice wears smart glasses in daily life and uses AI to record routes, recognize surroundings, and manage her schedule.'),
      step('事件与场景', 'Event and setting', '一天中，眼镜先后看到诊所标志、就诊信息和频繁经过的路线；这些都不是她主动提供的健康资料。', 'During the day, the glasses see a clinic sign, appointment information, and a frequently traveled route—none of which Alice intentionally provided as health data.'),
      step('方法出现', 'Design appears', '系统当下不弹出提醒。稍后，配套手机用集中面板列出健康、位置等可能的隐私推断。', 'The system does not interrupt her immediately. Later, a companion phone lists possible health, location, and other privacy inferences in one panel.'),
      step('用户交互', 'User interaction', 'Alice 点开“健康状态”，逐层查看诊所位置、就诊文字等证据及可能影响。', 'Alice opens Health status and reviews supporting evidence such as the clinic location and appointment text, along with possible consequences.'),
      step('结果', 'Outcome', '她删除健康推断，同时关闭系统继续使用诊所位置和就诊文字的权限。', 'She deletes the health inference and prevents the system from continuing to use the clinic location and appointment text.'),
    ],
  },
  {
    id: 'dialog',
    title: l('用对话一起处理', 'Discuss and decide in a chat'),
    meta: l('边问边解释，不遮挡原图', 'Ask questions without covering the scene'),
    short: l('像聊天一样说明风险。用户可以继续追问，并选择更保守或更轻量的处理。', 'Explains the risk in a chat where the user can ask why and choose an action.'),
    concept: l('把隐私风险变成一段可以继续追问的对话。系统给出建议，用户可以问为什么，也可以选择不同处理程度。', 'Turns the risk into a conversation with follow-up explanations and different levels of action.'),
    storyboardImage: '/assets/storyboards/02-conversation-clean.png',
    storyboardSummary: l('任务结束后再通过对话解释健康推断；用户可以追问依据、用途和长期影响后再决定。', 'After the task, a conversation explains the health inference and lets the user ask about evidence, use, and longer-term effects before deciding.'),
    storyboard: [
      step('人物', 'Person', 'Alice 佩戴智能眼镜整理工作桌面，希望 AI 只帮助识别和归类物品。', 'Alice wears smart glasses while organizing a work desk and wants AI only to identify and categorize objects.'),
      step('事件与场景', 'Event and setting', '眼镜同时看到药瓶、复诊提醒和深夜办公时间，这些线索超出了当前整理任务。', 'The glasses also see medicine, a follow-up reminder, and late-night work—clues beyond the current organization task.'),
      step('方法出现', 'Design appears', '任务结束后，AI 在配套设备中发起对话，提示多个线索可能形成健康状态判断。', 'After the task, AI starts a conversation on a companion device and explains that multiple clues may form a health-status judgment.'),
      step('用户交互', 'User interaction', 'Alice 追问“为什么”和“会怎样使用”，系统用药瓶、日历等证据逐步解释。', 'Alice asks why the judgment was made and how it may be used; the system explains step by step with evidence such as medicine and a calendar.'),
      step('结果', 'Outcome', '理解影响后，她在对话中要求忘记该推断，并阻止相关线索进入长期记忆。', 'After understanding the impact, she asks the system to forget the inference and keep the related clues out of long-term memory.'),
    ],
  },
  {
    id: 'boxedPanel',
    title: l('在原图中标出线索', 'Mark clues in the original scene'),
    meta: l('原图标记 + 旁边解释', 'Scene markers with a side explanation'),
    short: l('先在画面中框出相关物品，再在旁边解释这些线索怎样组合成个人信息。', 'Marks relevant objects in the scene and explains how the clues combine.'),
    concept: l('直接在画面里框出线索，同时在旁边解释“看到了什么、怎样联系、可能猜出什么”。', 'Shows where each clue is and how the clues lead to a possible personal inference.'),
    storyboardImage: '/assets/storyboards/03-marked-clues-clean.png',
    storyboardSummary: l('直接在原始画面中框出线索，并用侧边面板把对象、证据、推断和处理结果对应起来。', 'Clues are marked directly in the original scene, while a side panel links objects, evidence, inference, and action results.'),
    storyboard: [
      step('人物', 'Person', 'Alice 佩戴智能眼镜整理桌面，AI 持续辅助识别眼前物品。', 'Alice wears smart glasses while organizing a desk, with AI continuously identifying objects in view.'),
      step('事件与场景', 'Event and setting', '视野里同时出现药盒、时间信息和外卖包装等可能关联健康与生活习惯的线索。', 'Medicine, time information, and delivery packaging appear together and may reveal health or daily-routine information.'),
      step('方法出现', 'Design appears', '眼镜在原始画面中框出相关对象，并用侧边层次面板说明它们可能形成健康状态推断。', 'The glasses mark relevant objects in the original scene, while a layered side panel explains how they may support a health-status inference.'),
      step('用户交互', 'User interaction', 'Alice 在侧边面板中选择需要限制或遮挡的具体对象。', 'Alice uses the side panel to select the specific objects that should be restricted or masked.'),
      step('结果', 'Outcome', '相关区域被遮挡，面板随之更新并显示推断风险已经降低。', 'The selected areas are masked, and the panel updates to show that the inference risk has decreased.'),
    ],
  },
  {
    id: 'timeline',
    title: l('按步骤展示推断过程', 'Show the inference step by step'),
    meta: l('分四步说明风险怎样形成', 'Four steps explain how the risk forms'),
    short: l('把“识别线索、组合线索、形成判断、给出处理”分成四步展示。', 'Separates clue recognition, evidence combination, inference, and action into four steps.'),
    concept: l('把推断过程拆成连续步骤，帮助用户分清“只是识别物品”还是“已经猜出了个人信息”。', 'Distinguishes recognizing objects from forming a personal inference.'),
    storyboardImage: '/assets/storyboards/04-timeline-clean.png',
    storyboardSummary: l('用时间轴连接不同时刻出现的普通线索，说明健康推断在何时形成以及处理后怎样变化。', 'A timeline connects ordinary clues seen at different times and shows when a health inference forms and how it changes after action.'),
    storyboard: [
      step('人物', 'Person', 'Alice 长期佩戴智能眼镜处理工作和生活事务。', 'Alice wears smart glasses over time while handling work and everyday activities.'),
      step('事件与场景', 'Events over time', '在不同时刻，眼镜分别看到药瓶、复诊提醒、外卖和深夜工作；单个线索看起来并不敏感。', 'At different times, the glasses see medicine, a follow-up reminder, deliveries, and late-night work; each clue alone appears ordinary.'),
      step('方法出现', 'Design appears', '眼镜显示一条平面时间轴，把不同时刻的线索连接起来，并标出健康推断何时形成。', 'The glasses show a timeline that connects clues across moments and marks when the health inference forms.'),
      step('用户交互', 'User interaction', 'Alice 拖动时间轴回看关键片段，选择移除或限制参与推断的线索。', 'Alice moves along the timeline to revisit key moments and selects clues to remove or restrict.'),
      step('结果', 'Outcome', '时间轴随处理结果更新，相关健康推断的风险随之下降。', 'The timeline updates after her actions, and the associated health-inference risk decreases.'),
    ],
  },
  {
    id: 'hint',
    title: l('在线索旁轻轻提醒', 'Show a subtle hint beside a clue'),
    meta: l('靠近物品的简短提示', 'A short hint near the relevant object'),
    short: l('在相关物品附近显示一句简短提醒，只在风险较高时出现，尽量不打断当前任务。', 'Shows a short nearby hint for higher risks while minimizing interruption.'),
    concept: l('把提醒做成靠近相关物品的短标签，不主动展开长篇解释，让用户先注意到风险。', 'Uses a small label near a clue and reveals detail only when requested.'),
    storyboardImage: '/assets/storyboards/05-subtle-hints-clean.png',
    storyboardSummary: l('移动中只显示靠近相关位置的轻量标记；用户注视后才展开风险说明和处理选项。', 'While the user is moving, only a lightweight marker appears near a relevant location; details and actions expand only when requested.'),
    storyboard: [
      step('人物', 'Person', 'Alice 佩戴智能眼镜在街区行走，使用导航和环境识别功能。', 'Alice walks through a neighborhood wearing smart glasses and uses navigation and scene-recognition features.'),
      step('事件与场景', 'Event and setting', '她经过诊所、住宅入口和其他可能暴露身份或健康状况的地点。', 'She passes a clinic, a residential entrance, and other places that may reveal identity or health information.'),
      step('方法出现', 'Design appears', '相关位置旁只出现轻量圆点和盾牌，提示这里可能关联健康或身份信息。', 'A lightweight dot and shield appear beside relevant locations to signal a possible link to health or identity information.'),
      step('用户交互', 'User interaction', 'Alice 注视其中一个提示后，才展开简短的风险说明和处理选项。', 'Only after Alice looks at a hint does it expand into a short risk explanation and action options.'),
      step('结果', 'Outcome', '她快速隐藏相关位置线索；提示缩回为已保护状态，她继续原来的任务。', 'She quickly hides the location clue; the hint collapses into a protected state, and she continues her original task.'),
    ],
  },
  {
    id: 'contained',
    title: l('直接在风险区域处理', 'Act directly in the risk area'),
    meta: l('说明和按钮都放在原图中', 'Explanation and actions stay in the scene'),
    short: l('把线索、可能猜出的信息和处理按钮放在同一个风险框里，适合需要马上处理的情况。', 'Places clues, inference, and actions in one risk box for immediate handling.'),
    concept: l('每个高风险区域都带有解释和处理按钮，用户不用来回对照就能完成判断。', 'Each high-risk area contains its explanation and actions, reducing visual switching.'),
    storyboardImage: '/assets/storyboards/06-in-place-action-clean.png',
    storyboardSummary: l('风险说明和操作直接出现在相关对象内部，用户不需要切换到侧边面板即可完成保护。', 'Risk explanation and actions appear directly within the relevant object, so protection can be completed without switching to a side panel.'),
    storyboard: [
      step('人物', 'Person', 'Alice 佩戴智能眼镜在桌前工作，AI 帮助识别眼前物品。', 'Alice works at a desk wearing smart glasses while AI helps identify objects in view.'),
      step('事件与场景', 'Event and setting', '当她看向药瓶和复诊材料时，系统检测到这些对象可能包含敏感健康线索。', 'When she looks at medicine and follow-up materials, the system detects that these objects may contain sensitive health clues.'),
      step('方法出现', 'Design appears', '风险框直接贴在相关对象上，并在框内逐层展示对象、证据和可能的健康推断。', 'A risk box attaches directly to the relevant object and reveals the object, evidence, and possible health inference within the box.'),
      step('用户交互', 'User interaction', 'Alice 不用切换到侧边面板，直接在同一个风险框内选择处理。', 'Without switching to a side panel, Alice chooses an action directly inside the same risk box.'),
      step('结果', 'Outcome', '敏感内容被遮挡，风险框收起，不再影响她的视野。', 'The sensitive content is masked, and the risk box collapses so it no longer obstructs her view.'),
    ],
  },
]

export const DESK_RISKS: Risk[] = [
  { id: 'health', label: l('健康状态', 'Health status'), score: 84, color: '#dc2626', evidence: [l('药品标签', 'Medicine label'), l('复诊提醒', 'Follow-up reminder'), l('晚间时间', 'Late-work time')], inference: l('药品文字、复诊日程和晚间时间共同指向近期就医或慢性病管理。', 'Medicine text, follow-up details, and a late-work time together may suggest recent treatment or chronic-condition management.'), action: l('遮挡药品标签、复诊提醒和晚间时间', 'Hide the medicine label, follow-up reminder, and late-work time') },
  { id: 'work', label: l('工作身份', 'Work identity'), score: 67, color: '#c77803', evidence: [l('访客证', 'Visitor badge'), l('桌上文件', 'Desk documents'), l('办公用品', 'Work materials')], inference: l('访客证、桌上文件和办公用品可能透露工作场所或组织关联。', 'A visitor badge, desk documents, and work materials may reveal a workplace or organizational connection.'), action: l('遮挡访客证并模糊桌上文件和办公用品', 'Hide the visitor badge and blur desk documents and work materials') },
  { id: 'routine', label: l('生活节律', 'Daily routine'), score: 48, color: '#159570', evidence: [l('咖啡杯', 'Coffee cup'), l('多份饮品', 'Repeated drinks'), l('晚间时间', 'Late-work time')], inference: l('饮品习惯和晚间时间可能透露日常作息模式。', 'Drinking habits and a late-work time may reveal a daily routine.'), action: l('模糊饮品区域并隐藏晚间时间', 'Blur the drink area and hide the late-work time') },
]

export const RATING_QUESTIONS: RatingQuestion[] = [
  { id: 'relate', text: l('您能代入故事中这位用户对隐私问题的顾虑吗？', 'Can you relate to the user’s privacy concern in this story?'), low: l('完全不能', 'Not at all'), high: l('完全能', 'Completely') },
  { id: 'understand', text: l('这种隐私风险提醒与处理方式帮助我理解系统可能推断出关于我的哪些信息', 'This notification approach helps me understand what the system may infer about me'), low: l('强烈不同意', 'Strongly disagree'), high: l('强烈同意', 'Strongly agree') },
  { id: 'control', text: l('这种隐私风险提醒与处理方式让我觉得自己能控制隐私风险', 'This notification approach makes me feel able to control privacy risks'), low: l('强烈不同意', 'Strongly disagree'), high: l('强烈同意', 'Strongly agree') },
  { id: 'nonInterruption', text: l('这个设计不会打扰我当前正在完成的任务', 'This design would not interrupt the task I am currently completing'), low: l('强烈不同意', 'Strongly disagree'), high: l('强烈同意', 'Strongly agree') },
  { id: 'trust', text: l('我愿意信任使用这种隐私风险提醒与处理方式的系统', 'I would trust a system that uses this notification approach'), low: l('强烈不同意', 'Strongly disagree'), high: l('强烈同意', 'Strongly agree') },
  { id: 'overall', text: l('总体来说，这是一个好的隐私风险提醒与处理方式', 'Overall, this is a good notification approach'), low: l('强烈不同意', 'Strongly disagree'), high: l('强烈同意', 'Strongly agree') },
]

export const prototypeById = (id: PrototypeId) => PROTOTYPES.find((item) => item.id === id) ?? PROTOTYPES[0]

export function allTrios(): PrototypeId[][] {
  const combinations: PrototypeId[][] = []
  for (let a = 0; a < PROTOTYPES.length - 2; a += 1) {
    for (let b = a + 1; b < PROTOTYPES.length - 1; b += 1) {
      for (let c = b + 1; c < PROTOTYPES.length; c += 1) combinations.push([PROTOTYPES[a].id, PROTOTYPES[b].id, PROTOTYPES[c].id])
    }
  }
  return combinations
}

export function allOrders(items: PrototypeId[]): PrototypeId[][] {
  return [
    [items[0], items[1], items[2]],
    [items[0], items[2], items[1]],
    [items[1], items[0], items[2]],
    [items[1], items[2], items[0]],
    [items[2], items[0], items[1]],
    [items[2], items[1], items[0]],
  ]
}

export function participantBlock(id: string): number {
  const match = id.match(/(\d+)\s*$/)
  if (match) return Math.max(0, Number(match[1]) - 1)
  let hash = 2166136261
  for (const character of id || 'participant') {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}
