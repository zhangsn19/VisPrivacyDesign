# Appendix: Study Materials

*Author-review draft. Evaluation instructions and rating anchors below come from the local prototype; their match to the final administered form remains to be confirmed. Recovered background questions are supplied separately; the UK-specific OPLIS items remain outstanding.*

## A. Design Elicitation

Participants received an introduction to visual inferential privacy: how AI can combine ordinary visual cues to infer private attributes that users did not explicitly disclose. A reference example showed smart glasses inferring a possible health condition from a medicine bottle, with a proposed interface that highlights the evidence and offers a masking action.

Participants selected a real scenario and proposed **at least two design ideas**, without restrictions on the target device. The guide organized their responses into four stages:

1. **Discover:** Who are the users, what is the situation, and why are existing approaches insufficient?
2. **Define:** What problem does the design address? Does it support awareness, explanation, or control, and when does it intervene?
3. **Design:** For each idea, describe the interface, how it shows inferences and evidence, the available user actions, and its difference from existing approaches.
4. **Evaluate:** How would effectiveness be assessed? What are the success criteria, limitations, and trade-offs?

Submissions could include text, sketches, flowcharts, or screenshots; at least one image was recommended. The guide allocated approximately 2–3 hours. A separate form collected demographics, design and research experience, and familiarity with privacy, AI, HCI, and inferential privacy.

The [full task guide](01_Design_Elicitation/Design_Proposal_Guide.md) and [blank background form](01_Design_Elicitation/Participant_Background_Form.md) provide the original prompts and response format.

## B. Six Design Concepts

Following the manuscript's synthesis procedure, two researchers extracted features from the submitted designs, grouped functionally and visually similar features through affinity diagramming, and refined the groups through consensus discussions. This informed three design-space dimensions—visual anchor, visual depth, and delivery timing—and the six concepts below.

The six concepts are illustrated in the main text.

| Design | Presentation and user action |
|---|---|
| **D1. Central Risk List** | Review inferred attributes in a separate panel after the task; open supporting evidence and manage inferences and clues. |
| **D2. Conversational Control** | Ask follow-up questions about evidence and use; request that an inference be forgotten or its future use restricted. |
| **D3. Marked Clues with Side Explanation** | Locate evidence through scene markers, inspect the side-panel explanation, and select clues to mask or restrict. |
| **D4. Step-by-Step Timeline** | Review how clues accumulate over time and remove or restrict contributing clues. |
| **D5. Contextual Lightweight Hint** | Notice a brief contextual cue, open details on demand, and take a privacy action. |
| **D6. In-place Risk Action** | Inspect the explanation and act directly within the relevant risk region. |

The [illustrated design catalog](02_Six_Design_Concepts/Six_Design_Concepts.md) includes all six existing storyboards and their five-step English narratives. Depicted protection outcomes illustrate the proposed interactions.

## C. Evaluation Procedure and Questionnaire

The manuscript describes an online study with English-fluent Prolific users in the U.S. or U.K., with approval rates of at least 95%. After consent and an introduction, participants view and interact with **three assigned designs from D1–D6**, rate each, and rank the three designs with an explanation.

**Local prototype task.** In the shared desk scene, open the Health status risk and inspect how medicine, a follow-up reminder, and late-work time support a hypothetical inference. Choose **Address this risk**, **Allow this use**, or **Remind me later**. Ratings unlock after opening the risk and choosing an action. Risks and feedback are predefined interface content.

**Per-design questions.** Answer based on the interaction just completed. The local form uses integers **1–5**: Q1 ranges from **Not at all** to **Completely**; Q2–Q6 range from **Strongly disagree** to **Strongly agree**.

| Item | Question |
|---|---|
| Q1 | Can you relate to the user’s privacy concern in this story? |
| Q2 | This notification approach helps me understand what the system may infer about me |
| Q3 | This notification approach makes me feel able to control privacy risks |
| Q4 | This design would not interrupt the task I am currently completing |
| Q5 | I would trust a system that uses this notification approach |
| Q6 | Overall, this is a good notification approach |

**Open response after each design:** “Why is this notification approach effective or ineffective? What situations suit it?”

**Final ranking:** Rank the three approaches first, second, and third by how effectively they help users notice and address privacy risks. Select each design once and explain the ranking.

**Background measures:** Collection records include OPLIS-12 (UK/US variants), IUIPC-10, and the 12-item Jian–Bisantz–Drury trust-in-automation measure. IUIPC and trust responses use values in 1–7. The [rating questionnaire](03_Evaluation/Evaluation_Questionnaire.md) and [recovered background questions](03_Evaluation/Background_Questionnaire_Items.md) provide the available English wording and identify the remaining form-specific details.
