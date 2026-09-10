const PROTOTYPES = [
  {
    id: "panel",
    title: "平面上的面板",
    meta: "层次 / Not in-situ",
    short: "把所有推断风险集中放在独立面板里，适合发布前回顾和统一处理。",
    icon: "icon-panel",
    concept: "系统不直接打断当前画面，而是在旁侧生成一个隐私画像面板。用户先看到风险类别，再展开证据链和处理动作。",
    storyboard: [
      ["Context", "用户准备把工作桌面照片发给 AI，总体任务只是询问文档整理。"],
      ["Problem", "桌上的药瓶、复诊提醒和访客证可能组合成健康状态与工作身份。"],
      ["Concept", "发布前出现独立风险面板，按画像类别列出风险、证据和置信度。"],
      ["Resolution", "用户统一隐藏高风险线索，再决定是否继续发送。"]
    ]
  },
  {
    id: "dialog",
    title: "对话解决隐私问题",
    meta: "对话 + 平面 / Not in-situ",
    short: "用可追问的方式解释推断路径，让用户把隐私目标说出来再执行。",
    icon: "icon-dialog",
    concept: "把隐私风险转成一段可协商的对话。系统给出建议，用户可以追问为什么、选择保守或宽松策略。",
    storyboard: [
      ["Context", "用户不确定哪些线索会被 AI 用来推断个人信息。"],
      ["Problem", "静态提示太抽象，用户不知道该隐藏什么、保留什么。"],
      ["Concept", "隐私助手通过对话解释风险来源，并提供几个自然语言处理目标。"],
      ["Resolution", "用户选择“只隐藏健康线索”，系统即时反馈风险下降幅度。"]
    ]
  },
  {
    id: "boxedPanel",
    title: "在画面内框出 + 面板展示",
    meta: "层次 / In-situ",
    short: "先在原画面定位证据，再用小面板解释证据如何连接成敏感结论。",
    icon: "icon-boxed",
    concept: "将证据框直接贴在画面里，同时保留一块解释面板，连接“对象 -> 中间推断 -> 敏感画像”。",
    storyboard: [
      ["Context", "用户拍下房间桌面给 AI 帮忙整理资料，画面里包含文件、水瓶和书架。"],
      ["Problem", "用户看到的是普通房间，却不知道哪些局部会共同暴露工作身份和生活节律。"],
      ["Concept", "系统框出局部证据，并在旁边展示 inferential risk path。"],
      ["Resolution", "用户点击阻断路径，系统模糊文件抬头和可识别标签，但保留房间主体。"]
    ]
  },
  {
    id: "timeline",
    title: "时间轴面板展示推断",
    meta: "平面 / In-situ",
    short: "把推断从采集、组合、生成画像到外发的过程拆成时间轴。",
    icon: "icon-timeline",
    concept: "把二跳推断过程摊开成连续步骤，帮助用户理解“现在只是识别对象”还是“已经形成画像”。",
    storyboard: [
      ["Context", "用户让 AI 分析多张生活照片，系统持续处理画面。"],
      ["Problem", "风险不是单帧出现，而是在多个时间点逐步累积。"],
      ["Concept", "时间轴标出采集、证据组合、画像形成和可采取动作。"],
      ["Resolution", "用户定位风险形成的阶段，并执行对应的线索保护动作。"]
    ]
  },
  {
    id: "hint",
    title: "Contextual hint",
    meta: "平面 / In-situ",
    short: "在对象附近给轻量提示，只在风险升高时出现，减少中断感。",
    icon: "icon-hint",
    concept: "把提示做成靠近证据的短标签，不展开完整解释，让用户在不中断任务的情况下感知风险。",
    storyboard: [
      ["Context", "用户在房间里快速拍照上传，希望 AI 只关注桌面整理任务。"],
      ["Problem", "完整弹窗会打断拍摄，但完全不提示又会让推断风险不可见。"],
      ["Concept", "对象旁出现短提示，例如“文件可推断工作身份”。"],
      ["Resolution", "用户轻点提示即可应用推荐遮挡，或继续保持原画面。"]
    ]
  },
  {
    id: "contained",
    title: "完全框内展示",
    meta: "层次 / In-situ",
    short: "把证据、推断和操作都包在画面内的局部框里，适合强风险现场。",
    icon: "icon-contained",
    concept: "每个高风险区域自带解释和处理动作，用户不必离开上下文就能完成判断。",
    storyboard: [
      ["Context", "房间照片里同时出现文件堆、书架资料、收纳箱和可重复识别的生活用品。"],
      ["Problem", "敏感信息散落在不同区域，单个面板会让用户来回比对。"],
      ["Concept", "每个风险区域内部直接展示推断结论、置信度和处理按钮。"],
      ["Resolution", "用户直接在风险框内处理相应区域，其他区域保持原样。"]
    ]
  }
];

const ENGLISH_PROTOTYPES = {
  panel: ["Standalone Risk Panel", "Hierarchical / Not in-situ", "Collects all inference risks in a separate panel for review and treatment before sharing.", [["Context", "The user is about to send a work-desk photo to an AI for help organizing documents."], ["Problem", "A medicine bottle, appointment reminder, and visitor badge may jointly reveal health and work identity."], ["Concept", "A pre-sharing risk panel lists profile categories, evidence, and confidence."], ["Resolution", "The user hides high-risk cues before deciding whether to continue."]]],
  dialog: ["Conversational Privacy Assistant", "Conversational + Flat / Not in-situ", "Explains inference paths through dialogue and lets users state a privacy goal before action.", [["Context", "The user is unsure which visible cues an AI may use to infer personal information."], ["Problem", "Static notices are too abstract to show what should be hidden or retained."], ["Concept", "A privacy assistant explains risk sources and offers natural-language protection goals."], ["Resolution", "The user selects “hide health cues only,” and the system shows the resulting risk reduction."]]],
  boxedPanel: ["In-image Boxes with Explanation Panel", "Hierarchical / In-situ", "Locates evidence in the image and explains how cues connect to a sensitive conclusion.", [["Context", "The user photographs a desk containing documents, bottles, and shelves."], ["Problem", "Ordinary-looking details can jointly reveal work identity and daily routine."], ["Concept", "The system marks local evidence and displays an inference-risk path beside it."], ["Resolution", "The user blocks the path, blurring identifiable labels while retaining the main scene."]]],
  timeline: ["Inference Timeline", "Flat / In-situ", "Shows how collection, combination, profiling, and disclosure unfold over time.", [["Context", "The user asks an AI to analyze several everyday photos."], ["Problem", "Risk accumulates across images rather than appearing in a single frame."], ["Concept", "A timeline marks cue collection, evidence combination, profile formation, and available actions."], ["Resolution", "The user identifies the stage where risk forms and protects the contributing cues."]]],
  hint: ["Contextual Hint", "Flat / In-situ", "Shows lightweight hints near evidence only when risk rises, minimizing interruption.", [["Context", "The user quickly uploads a room photo and wants the AI to focus only on desk organization."], ["Problem", "A full dialog interrupts the task, while no notice leaves inference risk invisible."], ["Concept", "Short labels appear near evidence, such as “document may reveal work identity.”"], ["Resolution", "The user taps a hint to apply recommended masking or leaves the image unchanged."]]],
  contained: ["Fully Contained In-image Explanation", "Hierarchical / In-situ", "Places evidence, inference, and actions inside local regions for immediate high-risk decisions.", [["Context", "A room photo contains documents, shelf materials, storage boxes, and repeated personal items."], ["Problem", "Sensitive cues are spread across the image and are difficult to compare with a separate panel."], ["Concept", "Each risk region contains its inferred conclusion, confidence, and treatment action."], ["Resolution", "The user treats each risky region in place while leaving other areas unchanged."]]]
};
PROTOTYPES.forEach((prototype) => {
  const translated = ENGLISH_PROTOTYPES[prototype.id];
  if (translated) [prototype.title, prototype.meta, prototype.short, prototype.storyboard] = translated;
});

const SCENARIOS = {
  desk: {
    title: "工作桌面",
    risks: [
      {
        id: "health",
        label: "健康状态",
        score: 84,
        color: "#dc2626",
        evidence: ["药瓶 RX", "复诊提醒", "晚间办公"],
        inference: "药品文字与日程文字共同指向近期就医或慢性病管理。",
        action: "模糊药瓶标签和日程关键词",
        box: { x: "71%", y: "55%", w: "92px", h: "126px" }
      },
      {
        id: "work",
        label: "工作身份",
        score: 67,
        color: "#c77803",
        evidence: ["访客证", "报销单", "显示器内容"],
        inference: "访客证编号与屏幕文件标题可能暴露单位或项目角色。",
        action: "遮挡编号并替换文件标题",
        box: { x: "48%", y: "54%", w: "118px", h: "142px" }
      },
      {
        id: "routine",
        label: "生活节律",
        score: 48,
        color: "#159570",
        evidence: ["咖啡杯", "夜间时间", "重复摆放"],
        inference: "固定饮品和夜间办公线索可推断作息模式。",
        action: "保留画面但移除时间戳",
        box: { x: "82%", y: "35%", w: "112px", h: "112px" }
      }
    ]
  },
  street: {
    title: "客厅角落",
    risks: [
      {
        id: "home",
        label: "家庭环境",
        score: 88,
        color: "#dc2626",
        evidence: ["窗台结构", "采光方向", "室内布局"],
        inference: "窗台、采光和室内布局组合后，可能暴露房间类型与居住环境。",
        action: "裁掉窗边区域并降低背景清晰度",
        box: { x: "18%", y: "33%", w: "132px", h: "72px" }
      },
      {
        id: "health",
        label: "文件内容",
        score: 76,
        color: "#c77803",
        evidence: ["纸张抬头", "表格格式", "手写备注"],
        inference: "桌面纸张的抬头、表格和备注可能暴露工作事务或个人安排。",
        action: "模糊纸张文字和手写备注",
        box: { x: "62%", y: "35%", w: "136px", h: "72px" }
      },
      {
        id: "car",
        label: "生活习惯",
        score: 62,
        color: "#2563eb",
        evidence: ["水瓶数量", "桌面耗材", "物品摆放"],
        inference: "重复用品、耗材和摆放方式可能暴露作息与消费习惯。",
        action: "保留主体但弱化背景物品",
        box: { x: "48%", y: "64%", w: "126px", h: "62px" }
      }
    ]
  },
  venue: {
    title: "共享办公室",
    risks: [
      {
        id: "crowd",
        label: "空间身份",
        score: 82,
        color: "#dc2626",
        evidence: ["窗边位置", "桌面配置", "收纳箱"],
        inference: "房间配置和收纳习惯可能暴露工作空间类型或个人使用区域。",
        action: "对边缘区域做背景虚化",
        box: { x: "14%", y: "64%", w: "142px", h: "78px" }
      },
      {
        id: "screen",
        label: "资料关联",
        score: 91,
        color: "#dc2626",
        evidence: ["书架资料", "文件堆", "纸张边角"],
        inference: "书架资料和文件堆可能把用户与具体项目、职业或兴趣关联起来。",
        action: "遮挡资料名称和文件抬头",
        box: { x: "18%", y: "24%", w: "150px", h: "92px" }
      },
      {
        id: "phone",
        label: "社交画像",
        score: 70,
        color: "#c77803",
        evidence: ["书籍类型", "装饰物", "重复出现物品"],
        inference: "书籍、装饰物和重复物品可能被用来推断兴趣、消费水平或生活方式。",
        action: "只保留任务相关桌面区域",
        box: { x: "73%", y: "31%", w: "116px", h: "156px" }
      }
    ]
  }
};

// English labels used by the fixed work-desk scenario in the study.
SCENARIOS.desk.title = "Work desk";
SCENARIOS.desk.risks.forEach((risk, index) => {
  const labels = ["Health status", "Work identity", "Daily routine"];
  const evidence = [["RX medicine bottle", "Appointment reminder", "Late-night work"], ["Visitor badge", "Expense form", "Screen content"], ["Coffee cup", "Night-time timestamp", "Repeated placement"]];
  const inferences = ["Medicine and schedule text together suggest recent treatment or chronic-care management.", "A visitor-badge number and document title may reveal an employer or project role.", "Repeated drinks and late-night work cues may reveal a daily routine."];
  const actions = ["Blur medicine labels and schedule keywords", "Mask the badge number and replace the document title", "Keep the scene but remove the timestamp"];
  risk.label = labels[index]; risk.evidence = evidence[index]; risk.inference = inferences[index]; risk.action = actions[index];
});
// Keep every scenario participant-facing in English, including the optional lab views.
const scenarioEnglish = {
  street: {
    title: "Living-room corner",
    labels: ["Home environment", "Document content", "Daily habits"],
    evidence: [["Window structure", "Light direction", "Room layout"], ["Paper heading", "Table format", "Handwritten notes"], ["Bottle count", "Desk supplies", "Object placement"]],
    inferences: ["Window, lighting, and layout cues may reveal the type of room and living environment.", "Paper headings, tables, and notes may reveal work matters or personal plans.", "Repeated supplies and placement may reveal routines and consumption habits."],
    actions: ["Crop the window area and soften the background", "Blur paper text and handwritten notes", "Keep the main scene but soften background objects"]
  },
  venue: {
    title: "Shared office",
    labels: ["Space identity", "Linked materials", "Social profile"],
    evidence: [["Window position", "Desk setup", "Storage box"], ["Shelf materials", "Document stack", "Paper edges"], ["Book types", "Decorations", "Repeated objects"]],
    inferences: ["Room setup and storage habits may reveal the type of workspace or personal area.", "Shelf materials and documents may link the user to a project, occupation, or interest.", "Books, decorations, and repeated objects may suggest interests, spending level, or lifestyle."],
    actions: ["Soften the edges of the scene", "Mask material names and document headings", "Keep only the task-relevant desk area"]
  }
};
Object.entries(scenarioEnglish).forEach(([id, translation]) => {
  const scenario = SCENARIOS[id];
  if (!scenario) return;
  scenario.title = translation.title;
  scenario.risks.forEach((risk, index) => {
    risk.label = translation.labels[index];
    risk.evidence = translation.evidence[index];
    risk.inference = translation.inferences[index];
    risk.action = translation.actions[index];
  });
});

const QUESTIONS = [
  { id: "relate", text: "Can you relate to the user's privacy concerns in this story?", lo: "Not at all", hi: "Completely" },
  { id: "understand", text: "This design helps me understand what the system knows about me.", lo: "Strongly disagree", hi: "Strongly agree" },
  { id: "control", text: "This design gives me sufficient privacy control.", lo: "Strongly disagree", hi: "Strongly agree" },
  { id: "nonInterruption", text: "This design would not interrupt my everyday activities.", lo: "Strongly disagree", hi: "Strongly agree" },
  { id: "trust", text: "I would trust this system.", lo: "Strongly disagree", hi: "Strongly agree" },
  { id: "overall", text: "Overall, this is a good design.", lo: "Strongly disagree", hi: "Strongly agree" }
];

// Pre-test instruments: OPLIS-12-US knowledge items, IUIPC-10, and
// Jian, Bisantz & Drury's trust-in-automation scale (12 items).
const OPLIS_ITEMS = [
  ["inp03", "Data collected by social network operators are deleted after five years.", "false"],
  ["inp04", "Companies combine data traces from different websites to create user profiles.", "true"],
  ["inp05", "Emails commonly pass through several computers before reaching the receiver.", "true"],
  ["tea02", "What is a cookie?", "a", [["a", "A text file that helps a website recognize a returning user"], ["b", "A program that disables data collection"], ["c", "A computer virus transferred by websites"], ["d", "A browser plugin for safe browsing"]]],
  ["tea03", "What does cache mean?", "a", [["a", "Buffer storage that can make browsing faster"], ["b", "Software that sends user data to third parties"], ["c", "Software that backs up data externally"], ["d", "A plugin that encrypts browsing data"]]],
  ["tea04", "What is a trojan?", "a", [["a", "A program disguised as useful software that performs another function"], ["b", "Software that protects against malware"], ["c", "A harmless program made for fun"], ["d", "A virus that no longer exists"]]],
  ["dpl04", "The phrase “right to be left alone” is written into the U.S. Constitution.", "false"],
  ["dpl03", "The USA FREEDOM Act limits bulk collection of telecommunications metadata on U.S. citizens.", "true"],
  ["dpl02", "When subscribing to a social networking service, the company generally has the legal right to sell personal information to third parties.", "true"],
  ["dps01", "Regularly deleting cookies, cache, and browsing history can make tracking internet activity more difficult.", "true"],
  ["dps04", "Passwords combining letters, numbers, and symbols are generally safer than simple words or numbers.", "true"],
  ["dps05", "Using different passwords for different online services helps prevent access to personal data.", "true"]
];
const IUIPC_ITEMS = [
  "It is important for me to control what information about me is available to people online.", "It is important for me to control who can access information about me online.", "It is important for me to control how information about me is used.", "I am concerned that companies are collecting too much personal information about me.", "I am concerned about my online privacy.", "I am concerned that my personal information may be used for purposes I did not approve.", "Organizations should tell people how they use personal information.", "Organizations should explain their privacy practices clearly.", "Organizations should provide people with ways to control their personal information.", "Organizations should let people know when their personal information is collected."
];
const TRUST_ITEMS = [
  "Automated systems are deceptive.", "Automated systems behave in an underhanded manner.", "I am suspicious of automated systems’ intentions, actions, or outputs.", "I am wary of automated systems.", "Automated systems’ actions may have harmful or injurious outcomes.", "I am confident in automated systems.", "Automated systems provide security.", "Automated systems have integrity.", "Automated systems are dependable.", "Automated systems are reliable.", "I can trust automated systems.", "I am familiar with automated systems."
];

const state = {
  prototype: "panel",
  scenario: "desk",
  selectedRisk: 0,
  timelineStep: 0,
  haptic: true,
  protectedRisks: {},
  snoozedScopes: new Set(),
  dialogModes: {}
};

const embedParams = new URLSearchParams(window.location.search);
const embedConcept = Number(embedParams.get("concept"));
if (embedParams.get("embed") === "1") document.body.classList.add("embed-mode");
if (Number.isInteger(embedConcept) && PROTOTYPES[embedConcept]) state.prototype = PROTOTYPES[embedConcept].id;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function clampScore(score) {
  return `${Math.max(0, Math.min(100, score))}%`;
}

function currentPrototype() {
  return PROTOTYPES.find((item) => item.id === state.prototype) || PROTOTYPES[0];
}

function prototypeRenderKey(prototypeId = state.prototype) {
  return (PROTOTYPES.find((item) => item.id === prototypeId) || PROTOTYPES[0]).renderer || prototypeId;
}

function currentScenario() {
  return SCENARIOS[state.scenario] || SCENARIOS.desk;
}

function currentRisk() {
  const risks = currentScenario().risks;
  return risks[state.selectedRisk] || risks[0];
}

function currentScopeKey(prototypeId = state.prototype, scenarioId = state.scenario) {
  return `${prototypeId}:${scenarioId}`;
}

function currentProtectedRisks() {
  const key = currentScopeKey();
  if (!state.protectedRisks[key]) state.protectedRisks[key] = new Set();
  return state.protectedRisks[key];
}

function currentDialogMode() {
  return state.dialogModes[`${currentScopeKey("dialog")}:${currentRisk().id}`] || "pending";
}

function setCurrentDialogMode(mode) {
  state.dialogModes[`${currentScopeKey("dialog")}:${currentRisk().id}`] = mode;
}

function triggerRiskHaptic() {
  if (state.haptic && currentRisk().score >= 80 && navigator.vibrate) {
    navigator.vibrate([35, 20, 35]);
  }
}

function renderNav() {
  const nav = $("#prototypeNav");
  if (!nav) return;
  nav.innerHTML = PROTOTYPES.map((item) => `
    <button class="nav-item ${item.id === state.prototype ? "active" : ""}" type="button" data-prototype="${item.id}">
      <span class="nav-icon ${item.icon}"></span>
      <span>
        <strong>${item.title}</strong>
        <small>${item.meta}</small>
      </span>
    </button>
  `).join("");

  nav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-prototype]");
    if (!button) return;
    state.prototype = button.dataset.prototype;
    state.selectedRisk = 0;
    state.timelineStep = 0;
    triggerRiskHaptic();
    renderLab();
  });
}

function bindScenarioTabs() {
  const tabs = $("#scenarioTabs");
  if (!tabs) return;
  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scenario]");
    if (!button) return;
    state.scenario = button.dataset.scenario;
    state.selectedRisk = 0;
    state.timelineStep = 0;
    triggerRiskHaptic();
    renderLab();
  });
}

function renderScene() {
  $$(".scenario-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.scenario === state.scenario));
  $$(".scene").forEach((scene) => scene.classList.toggle("active", scene.dataset.scene === state.scenario));
  $("#scenarioTitle").textContent = currentScenario().title;
  renderOverlay();
}

function renderOverlay() {
  const layer = $("#overlayLayer");
  if (!layer) return;
  const risks = currentScenario().risks;
  const activeRisk = currentRisk();
  const overlays = [];

  const renderKey = prototypeRenderKey();
  if (renderKey === "boxedPanel") {
    overlays.push(...risks.map((risk, index) => `
      <button class="risk-outline selectable" type="button" data-risk-index="${index}" aria-label="View ${risk.label} risk" data-label="${risk.label} ${risk.score}%" style="--x:${risk.box.x};--y:${risk.box.y};--w:${risk.box.w};--h:${risk.box.h};--color:${risk.color};opacity:${index === state.selectedRisk ? 1 : 0.46}"></button>
    `));
  }

  if (renderKey === "hint" && !state.snoozedScopes.has(currentScopeKey())) {
    overlays.push(...risks.map((risk, index) => `
      <button class="hint-bubble" type="button" data-risk-index="${index}" style="--x:${risk.box.x};--y:${risk.box.y};--color:${risk.color}">
        ${risk.label}: ${risk.score >= 80 ? "High risk" : "Review"}
      </button>
    `));
  }

  if (renderKey === "contained") {
    overlays.push(...risks.map((risk, index) => `
      <article class="contained-frame ${index === state.selectedRisk ? "active" : "compact"}" style="--x:${risk.box.x};--y:${risk.box.y};--w:${risk.box.w};--h:${risk.box.h};--color:${risk.color}">
        <header>${risk.label} · ${risk.score}%</header>
        ${index === state.selectedRisk
          ? `<p>${risk.inference}</p><button type="button" data-risk-index="${index}" data-overlay-action="mask">Treat this region</button>`
          : `<button class="contained-select" type="button" data-risk-index="${index}">View</button>`}
      </article>
    `));
  }

  if (renderKey === "timeline" && state.timelineStep >= 1) {
    overlays.push(`
      <div class="risk-outline" data-label="${activeRisk.label} ${activeRisk.score}%" style="--x:${activeRisk.box.x};--y:${activeRisk.box.y};--w:${activeRisk.box.w};--h:${activeRisk.box.h};--color:${activeRisk.color};"></div>
    `);
  }

  const protectedIds = currentProtectedRisks();
  risks.forEach((risk) => {
    if (!protectedIds.has(risk.id)) return;
    overlays.push(`
      <div class="privacy-mask" style="--x:${risk.box.x};--y:${risk.box.y};--w:${risk.box.w};--h:${risk.box.h};--color:${risk.color}">
        <span>Protected · ${risk.label}</span>
      </div>
    `);
  });

  layer.innerHTML = overlays.join("");
}

function renderPrototypePreview(prototypeId, label = "", scenarioId = "desk") {
  const scenario = SCENARIOS[scenarioId] || SCENARIOS.desk;
  const risks = scenario.risks;
  const [health, work, routine] = risks;
  const caption = label ? `<figcaption>${label}</figcaption>` : "";
  const imageByScenario = {
    desk: "./assets/room-office.jpg",
    street: "./assets/room-living.jpg",
    venue: "./assets/room-shared-office.jpg"
  };
  const image = `<img src="${imageByScenario[scenarioId] || imageByScenario.desk}" alt="Privacy inference cues in ${scenario.title}" />`;

  const overlays = {
    panel: `
      <aside class="preview-panel">
        <strong>AI may infer</strong>
        ${risks.map((risk) => `
          <span style="--color:${risk.color}">
            <b>${risk.label}</b>
            <em>${risk.score}%</em>
          </span>
        `).join("")}
      </aside>
    `,
    dialog: `
      <div class="preview-chat">
        <p>Documents, bottles, and shelf cues were detected.</p>
        <p>Reduce work-identity and lifestyle inferences?</p>
        <span class="preview-action">Treat high-risk cues</span>
      </div>
    `,
    boxedPanel: `
      <div class="preview-box" style="--x:35%;--y:62%;--w:33%;--h:30%;--color:${work.color}" data-label="${work.label}"></div>
      <div class="preview-box" style="--x:70%;--y:68%;--w:24%;--h:24%;--color:${routine.color}" data-label="${routine.label}"></div>
      <aside class="preview-path">
        <strong>Risk path</strong>
        <span>Desk document</span>
        <span>+</span>
        <span>Repeated item</span>
        <b>${work.label}</b>
      </aside>
    `,
    timeline: `
      <div class="preview-timeline">
        <span class="done">Identify objects</span>
        <span class="done">Combine cues</span>
        <span>Form profile</span>
        <span>Recommend action</span>
      </div>
      <div class="preview-box soft" style="--x:54%;--y:62%;--w:58%;--h:48%;--color:${health.color}" data-label="Inference accumulating"></div>
    `,
    hint: `
      <div class="preview-hint" style="--x:33%;--y:50%;--color:${work.color}">Document may reveal work identity</div>
      <div class="preview-hint" style="--x:70%;--y:55%;--color:${routine.color}">Repeated items suggest routine</div>
      <div class="preview-hint" style="--x:86%;--y:32%;--color:${health.color}">Shelf items may reveal interests</div>
    `,
    contained: `
      <article class="preview-contained" style="--x:29%;--y:62%;--w:30%;--color:${work.color}">
        <strong>${work.label} · ${work.score}%</strong>
        <span>Mask document heading</span>
      </article>
      <article class="preview-contained" style="--x:69%;--y:64%;--w:26%;--color:${routine.color}">
        <strong>${routine.label} · ${routine.score}%</strong>
        <span>Remove repeated-item cue</span>
      </article>
    `
  };

  const previewKey = prototypeRenderKey(prototypeId);
  return `
    <figure class="photo-preview preview-kind-${previewKey}">
      ${image}
      <div class="photo-scrim"></div>
      ${overlays[previewKey] || overlays.panel}
      ${caption}
    </figure>
  `;
}

function renderLab() {
  const prototype = currentPrototype();
  $("#prototypeTitle").textContent = prototype.title;
  $("#prototypePanelTitle").textContent = prototype.title;
  $("#prototypeMeta").textContent = prototype.meta;
  $("#prototypeMode").textContent = prototype.meta;
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.prototype === state.prototype));
  renderScene();

  const body = $("#prototypeBody");
  if (!body) return;

  const renderers = {
    panel: renderFlatPanel,
    dialog: renderDialog,
    boxedPanel: renderBoxedPanel,
    timeline: renderTimeline,
    hint: renderHint,
    contained: renderContained
  };

  const renderKey = prototype.renderer || prototype.id;
  body.innerHTML = (renderers[renderKey] || renderFlatPanel)();
  bindPrototypeBody();
}

function renderFlatPanel() {
  const risks = currentScenario().risks;
  const risk = currentRisk();
  const protectedIds = currentProtectedRisks();
  const selectedProtected = protectedIds.has(risk.id);
  const allProtected = risks.every((item) => protectedIds.has(item.id));
  return `
    <div class="flat-grid">
      ${risks.map((item, index) => `
        <article class="risk-row ${index === state.selectedRisk ? "active" : ""} ${protectedIds.has(item.id) ? "protected" : ""}" data-risk-index="${index}" style="--risk:${item.color}">
          <div>
            <h3>${item.label}</h3>
            <p>${item.inference}</p>
          </div>
          <div class="risk-meter">
            <strong>${item.score}%</strong>
            <div class="bar"><span style="--score:${clampScore(item.score)}"></span></div>
            ${protectedIds.has(item.id) ? "<small>Protected</small>" : ""}
          </div>
        </article>
      `).join("")}
      <section class="detail-drawer">
        <p class="eyebrow">Selected</p>
        <h3>${risk.label}</h3>
        <p>${risk.inference}</p>
        <div class="evidence-list">${risk.evidence.map((item) => `<span>${item}</span>`).join("")}</div>
        <div class="button-row">
          <button class="primary-btn" type="button" data-action="mask" ${selectedProtected ? "disabled" : ""}>${selectedProtected ? "This risk is protected" : risk.action}</button>
          <button class="ghost-btn" type="button" data-action="safe">Mark as safe to share</button>
          <button class="ghost-btn" type="button" data-action="apply-all" ${allProtected ? "disabled" : ""}>${allProtected ? "All risks protected" : "Protect all risks"}</button>
        </div>
      </section>
    </div>
  `;
}

function renderDialog() {
  const risk = currentRisk();
  const risks = currentScenario().risks;
  const mode = currentDialogMode();
  const status = {
    pending: ["No action yet", "Choose an option; the scene will not change until you confirm."],
    recommended: ["Recommended action applied", `The cues contributing to “${risk.label}” are protected.`],
    strict: ["Strict action applied", "All inference risks in this scene are protected."],
    light: ["Light reminder mode", "Explanations remain available; the original scene is unchanged."]
  }[mode] || ["No action yet", "Choose an option."];
  return `
    <div class="timeline-risk-tabs" aria-label="Choose an inference risk">
      ${risks.map((item, index) => `
        <button class="chip-btn ${index === state.selectedRisk ? "active" : ""}" type="button" data-risk-index="${index}">
          ${item.label} · ${item.score}%
        </button>
      `).join("")}
    </div>
    <div class="chat-shell">
      <div class="chat-window" id="chatWindow">
        <article class="chat-message ai"><p>“${risk.label}” could be inferred from ${risk.evidence.join(", ")}.</p></article>
        <article class="chat-message user"><p>I want to reduce the risk without disrupting my main task.</p></article>
        <article class="chat-message ai"><p>You can ${risk.action.toLowerCase()}. This keeps the main scene while reducing this inference path.</p></article>
      </div>
      <div class="suggestion-grid">
        <button class="chip-btn" type="button" data-action="strict">Use stricter protection</button>
        <button class="chip-btn" type="button" data-chat="why">Explain why</button>
        <button class="chip-btn" type="button" data-action="light-mode">Use a light reminder</button>
        <button class="primary-btn" type="button" data-action="recommended">Apply recommended action</button>
      </div>
      <section class="chat-status">
        <strong id="chatOutcome">${status[0]}</strong>
        <p>${status[1]}</p>
      </section>
    </div>
  `;
}

function renderBoxedPanel() {
  const risk = currentRisk();
  return `
    <div class="boxed-layout">
      <section class="mini-map">
        <p class="mini-map-title">What the system combines</p>
        ${risk.evidence.map((item, index) => `
          <div class="mini-node evidence-node" style="--x:${14 + index * 24}%;--y:${42 + (index % 2) * 22}%;--color:${risk.color}"><small>Evidence ${index + 1}</small>${item}</div>
        `).join("")}
        <div class="mini-node inference-node" style="--x:87%;--y:53%;--color:${risk.color}"><small>Possible inference</small>${risk.label}</div>
      </section>
      <section class="detail-drawer">
        <p class="eyebrow">How the inference is formed</p>
        <h3>${risk.label}</h3>
        <p>${risk.inference}</p>
        <div class="path-list">
          ${risk.evidence.map((item, index) => `
            <article class="path-step">
              <strong>${index + 1}. ${item}</strong>
              <p>${index === 0 ? "A visual or text cue is identified." : index === 1 ? "The cue is combined with context." : "The combination increases confidence in a sensitive profile."}</p>
            </article>
          `).join("")}
        </div>
        <button class="primary-btn" type="button" data-action="mask">${risk.action}</button>
      </section>
    </div>
  `;
}

function renderTimeline() {
  const risk = currentRisk();
  const risks = currentScenario().risks;
  const steps = [
    ["Collect visual cues", "The system identifies visible objects, text, and locations, but has not formed a personal profile."],
    ["Combine evidence", `${risk.evidence.join(", ")} reinforce one another and form an inference path.`],
    ["Form a sensitive profile", `The system forms a “${risk.label}” assessment with ${risk.score}% confidence.`],
    ["Offer an action", `Recommended action: ${risk.action}. It will run only after you confirm.`]
  ];
  return `
    <div class="timeline-risk-tabs" aria-label="Choose an inference risk">
      ${risks.map((item, index) => `
        <button class="chip-btn ${index === state.selectedRisk ? "active" : ""}" type="button" data-risk-index="${index}">
          ${item.label} · ${item.score}%
        </button>
      `).join("")}
    </div>
    <div class="timeline-panel">
      <div class="timeline-track">
        ${steps.map((step, index) => `
          <button class="timeline-step ${index === state.timelineStep ? "active" : ""}" type="button" data-step="${index}">
            <strong>Step ${index + 1}</strong>
            <span>${step[0]}</span>
          </button>
        `).join("")}
      </div>
      <section class="timeline-detail">
        <p class="eyebrow">Step ${state.timelineStep + 1}</p>
        <h3>${steps[state.timelineStep][0]}</h3>
        <p>${steps[state.timelineStep][1]}</p>
        <div class="confidence-grid stage-status-grid">
          ${steps.map((step, index) => {
            const stageLabels = ["Object identified", "Evidence linked", `${risk.score}% risk assessment`, "Awaiting your confirmation"];
            return `
              <div class="confidence-item">
              <span>${step[0]}</span>
                <div class="bar"><span style="--score:${index <= state.timelineStep ? "100%" : "0%"};background:${risk.color}"></span></div>
                <span>${index <= state.timelineStep ? stageLabels[index] : "Not viewed"}</span>
              </div>
            `;
          }).join("")}
        </div>
        ${state.timelineStep === steps.length - 1 ? `<button class="primary-btn timeline-action" type="button" data-action="mask">${risk.action}</button>` : ""}
      </section>
    </div>
  `;
}

function renderHint() {
  const risks = currentScenario().risks;
  const snoozed = state.snoozedScopes.has(currentScopeKey());
  return `
    <div class="hint-list">
      ${risks.map((risk, index) => `
        <article class="hint-item ${index === state.selectedRisk ? "active" : ""}" data-risk-index="${index}">
          <span class="hint-dot" style="--color:${risk.color}"></span>
          <div>
            <strong>${risk.label}</strong>
            <p>${risk.evidence[0]} is increasing inference risk. Select this cue to view options.</p>
          </div>
          <button type="button" data-risk-index="${index}" aria-label="View ${risk.label}">›</button>
        </article>
      `).join("")}
    </div>
    <section class="hint-summary">
      ${snoozed ? "Reminders are paused for this scene." : `${risks.filter((risk) => risk.score >= 70).length} high-risk reminders are shown inline in the scene.`}
    </section>
    <div class="button-row" style="margin-top:12px">
      <button class="primary-btn" type="button" data-action="apply-hints">Protect high-risk cues</button>
      <button class="ghost-btn" type="button" data-action="${snoozed ? "resume-hints" : "snooze"}">${snoozed ? "Resume scene reminders" : "Pause scene reminders"}</button>
    </div>
  `;
}

function renderContained() {
  const risk = currentRisk();
  const protectedIds = currentProtectedRisks();
  const isProtected = protectedIds.has(risk.id);
  return `
    <section class="contained-info">
      <p class="eyebrow">In-frame decision</p>
      <h3>${risk.label}</h3>
      <p>${risk.inference}</p>
      <div class="evidence-list">${risk.evidence.map((item) => `<span>${item}</span>`).join("")}</div>
      <div class="hint-summary">${isProtected ? "This area is protected." : "Review and manage this cue in the risk frame on the left; this panel summarizes the selected area."}</div>
    </section>
  `;
}

function bindPrototypeBody() {
  const body = $("#prototypeBody");
  if (body.dataset.interactionsBound === "true") return;
  body.dataset.interactionsBound = "true";
  body.addEventListener("click", (event) => {
    const riskButton = event.target.closest("[data-risk-index]");
    if (riskButton) {
      state.selectedRisk = Number(riskButton.dataset.riskIndex);
      triggerRiskHaptic();
      renderLab();
      return;
    }

    const stepButton = event.target.closest("[data-step]");
    if (stepButton) {
      state.timelineStep = Number(stepButton.dataset.step);
      renderLab();
      return;
    }

    const chatButton = event.target.closest("[data-chat]");
    if (chatButton) {
      appendChat(chatButton.dataset.chat);
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      simulateAction(actionButton.dataset.action);
    }
  });
}

function appendChat(kind) {
  const risk = currentRisk();
  const chat = $("#chatWindow");
  const replies = {
    why: ["Please explain why this could be inferred.", `${risk.evidence[0]} is not necessarily sensitive on its own, but together with ${risk.evidence.slice(1).join(", ")} the model combines them into “${risk.label}”.`]
  };
  const pair = replies[kind];
  chat.insertAdjacentHTML("beforeend", `
    <article class="chat-message user"><p>${pair[0]}</p></article>
    <article class="chat-message ai"><p>${pair[1]}</p></article>
  `);
  chat.scrollTop = chat.scrollHeight;
}

function simulateAction(action) {
  const risk = currentRisk();
  const protectedIds = currentProtectedRisks();
  const renderKey = prototypeRenderKey();
  let message = "";

  if (action === "safe" || action === "allow") {
    protectedIds.delete(risk.id);
    message = action === "safe"
      ? `“${risk.label}” is marked safe to share in this scene.`
      : `Use of the “${risk.label}” area is allowed for this session.`;
  } else if (action === "snooze") {
    state.snoozedScopes.add(currentScopeKey());
    message = `Reminders for “${currentScenario().title}” are paused.`;
  } else if (action === "resume-hints") {
    state.snoozedScopes.delete(currentScopeKey());
    message = `Reminders for “${currentScenario().title}” are resumed.`;
  } else if (action === "apply-all") {
    currentScenario().risks.forEach((item) => protectedIds.add(item.id));
    message = "All inference risks in this scene are protected.";
  } else if (action === "strict") {
    currentScenario().risks.forEach((item) => protectedIds.add(item.id));
    setCurrentDialogMode("strict");
    message = "Strict protection applied to all inference risks in this scene.";
  } else if (action === "apply-hints") {
    currentScenario().risks.filter((item) => item.score >= 70).forEach((item) => protectedIds.add(item.id));
    message = "All high-risk cues in this scene are protected.";
  } else if (action === "recommended") {
    protectedIds.add(risk.id);
    setCurrentDialogMode("recommended");
    message = `${risk.action} applied.`;
  } else if (action === "light-mode") {
    protectedIds.delete(risk.id);
    setCurrentDialogMode("light");
    message = "Light reminder mode enabled: explanations remain, but the original scene is unchanged.";
  } else {
    protectedIds.add(risk.id);
    message = action === "deny" ? `Recognition of the “${risk.label}” area is blocked.` : `${risk.action} applied.`;
  }

  renderLab();
  const body = $("#prototypeBody");
  const note = document.createElement("div");
  note.className = "hint-summary";
  note.textContent = message;
  body.prepend(note);
  window.setTimeout(() => note.remove(), 2200);

  triggerRiskHaptic();
}

function bindOverlayActions() {
  const layer = $("#overlayLayer");
  if (!layer) return;
  layer.addEventListener("click", (event) => {
    const target = event.target.closest("[data-risk-index]");
    if (!target) return;
    state.selectedRisk = Number(target.dataset.riskIndex);
    const action = target.dataset.overlayAction;
    if (action) simulateAction(action);
    else renderLab();
  });
}

function bindMapDialog() {
  const dialog = $("#mapDialog");
  const open = $("#openMap");
  const close = $("#closeMap");
  if (!dialog || !open || !close) return;
  open.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  });
  close.addEventListener("click", () => {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  });
}

function bindHaptic() {
  const button = $("#hapticToggle");
  if (!button) return;
  button.addEventListener("click", () => {
    state.haptic = !state.haptic;
    button.setAttribute("aria-pressed", String(state.haptic));
    if (state.haptic && navigator.vibrate) navigator.vibrate(35);
  });
}

function initLab() {
  if (!$("#prototypeNav")) return;
  renderNav();
  bindScenarioTabs();
  bindMapDialog();
  bindHaptic();
  bindOverlayActions();
  renderLab();
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}


document.addEventListener("DOMContentLoaded", () => { initLab(); });
