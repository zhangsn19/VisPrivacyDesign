# Evaluation Questionnaire

## Wording and scale provenance

The six rating items, open question, and ranking prompts below are reproduced from the available English local prototype source. That source presents five response choices. The supplied collection export stores all design-rating answers within 1–5, while the current manuscript says seven-point design ratings. This is a recoverable questionnaire draft; confirm its wording and anchors against the collection build before treating it as the final administered instrument.

## After each design

Instruction: **Answer based on the interaction you just completed.**

Choose one integer from **1, 2, 3, 4, 5** for each item. Repeat the same six items after each of the three designs.

| Item | English wording | Response anchors |
|---|---|---|
| Q1 | Can you relate to the user’s privacy concern in this story? | 1 = Not at all; 5 = Completely |
| Q2 | This notification approach helps me understand what the system may infer about me | 1 = Strongly disagree; 5 = Strongly agree |
| Q3 | This notification approach makes me feel able to control privacy risks | 1 = Strongly disagree; 5 = Strongly agree |
| Q4 | This design would not interrupt the task I am currently completing | 1 = Strongly disagree; 5 = Strongly agree |
| Q5 | I would trust a system that uses this notification approach | 1 = Strongly disagree; 5 = Strongly agree |
| Q6 | Overall, this is a good notification approach | 1 = Strongly disagree; 5 = Strongly agree |


**Q7. Additional comments**

Why is this notification approach effective or ineffective? What situations suit it?

[Free-text response]

The local source requires all six ratings and a non-empty comment; it does not impose a 50-word minimum.

## After all three designs

**Q8. Compare the three designs you just rated**

Rank the notification approaches first, second, and third by how effectively they help users notice and address privacy risks.

| Rank | Design |
|---|---|
| 1 | |
| 2 | |
| 3 | |

Select each of the three assigned designs once.

**Q9. Explain your ranking**

[Free-text response]

Confirmation: **I have reviewed and confirmed this ranking.**

## Background measures recorded in the collection export

| Measure | Recorded instrument | Items and responses |
|---|---|---|
| Online privacy literacy | OPLIS-12-UK / OPLIS-12-US | 12 item responses and a total score; country-specific versions |
| Internet users' information privacy concerns | IUIPC-10 | 10 numeric item responses in 1–7 and a mean score |
| Trust in automation | Jian-Bisantz-Drury-2000 | 12 numeric item responses in 1–7 and a mean score |

The [background-question transcript](Background_Questionnaire_Items.md) now includes the OPLIS-US question bank and its source answer key, ten privacy-concern items, and twelve trust items recovered from the standalone prototype source. The UK-specific questions, final response labels, and check wording/placement still require confirmation.

## Rating wording retained in the standalone demo source

The demo contains the following alternative question strings, but does not administer a rating form. They are retained here as source evidence for choosing the final wording; they are not an additional questionnaire to administer after the six questions above. The demo constants contain endpoint text but no response-count implementation.

| Field | Source wording |
|---|---|
| `relate` | Can you relate to the user's privacy concerns in this story? |
| `understand` | This design helps me understand what the system knows about me. |
| `control` | This design gives me sufficient privacy control. |
| `nonInterruption` | This design would not interrupt my everyday activities. |
| `trust` | I would trust this system. |
| `overall` | Overall, this is a good design. |
