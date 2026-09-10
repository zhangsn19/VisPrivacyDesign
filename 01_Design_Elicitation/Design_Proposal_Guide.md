# Design Proposal Guide: Designing for Inferential Privacy

English instruction text from the supplied pre-workshop guide, reformatted for reuse. Original section numbers are retained. The consent form, institutional contact details, and submission address are omitted from this material extract. The hypothetical protection outcomes in the reference example describe the proposed design, not a tested guarantee of AI behavior.

## Task at a glance

Recall a real visual scenario, propose at least two interface or interaction design ideas, and explain how you would evaluate them. Submit the completed proposal together with sketches or screenshots, and submit the background form separately. The source guide allocates about 2–3 hours and requests submission at least three hours before the workshop begins. These are the instructions in the guide, not measured session durations.


## 2. Background: What is inferential privacy?

Inferential privacy: AI uses information you did not explicitly state, combines it with background knowledge, and infers your private attributes.

Inference here means indirect inference, not direct extraction: from A that you provide, AI jumps to B that you did not state. The more sensitive the inferred information is, and the harder it is for users to notice, the greater the privacy risk.

Key takeaway

The issue is not only whether sensitive data appears, but whether ordinary visual cues can be combined to infer sensitive information.

Design goal

Help users see the inference path, understand the risk, and make controls at the right moment.


## 3. Background: What is visual inferential privacy?

Visual inferential privacy is inferential privacy in image/video contexts.

AI, especially vision-language models (VLMs), may infer sensitive information that users did not intend to disclose from an ordinary photo or video frame. This process does not require the user to provide text. Information that cannot be inferred from one image can often be inferred by combining multiple images.

Example: What might an “ordinary selfie” reveal?

- Background decoration style -> possible inference about income level
- View outside the window / street view -> possible inference about rough location or city
- Books or posters on a shelf -> possible inference about religion or political orientation
- Complexion, body shape, or medicine -> possible inference about health status

Common visual risk scenarios

Posting images on social media

WeChat Moments, Xiaohongshu, Weibo, Instagram: background, location, relationships, and consumption level may be inferred.

Smart glasses / first-person view

Continuous, real-time, and hard to notice: may record other people, home environments, screen content, or medical clues.

Video meeting backgrounds

Room layout, work materials, family members, and screen content may be identified by models and combined for inference.

Surveillance / home cameras

Long-term behavior patterns may indirectly reveal routines, visitors, health status, or family relationships.


## 4. Traditional privacy-protection methods and their limitations

These methods remain valuable, but they do not necessarily solve the problem of indirect inference.

Blurring / masking

Example: Street-view maps blur faces and license plates.

Limitation: AI can still infer from other unmasked cues such as objects, environment, and lighting.

Permission management

Example: iOS/Android require apps to obtain camera or location permission.

Limitation: It only controls whether data can be accessed, not what can be inferred after data is obtained.

Privacy policies

Example: Privacy statements shown during app installation or on websites.

Limitation: They are long and legalistic; they often say what is collected, but rarely say what is inferred.

Data minimization

Example: Collect only the minimum data necessary for the task.

Limitation: For inference, even “minimum data” may be combined to infer sensitive information.

Anonymization

Example: Remove direct identifiers such as names or ID numbers.

Limitation: AI may re-identify people through indirect information such as appearance, behavior, and environment, limiting the effectiveness of anonymization.

Why is a new design needed?

The challenge of visual inferential privacy is that risks often occur in reasoning processes that users cannot see. Therefore, design should not only hide data; it should also show what has been inferred, what evidence the inference relies on, and how the user can intervene.


## 5. Your design task

Goal: Design an interface or interaction solution that helps users perceive, understand, and respond to visual inferential privacy risks.

Before you start, please complete this step

- Recall a real scenario where you think visual inferential privacy risk exists, such as posting on WeChat Moments, filming with smart glasses, a video meeting background, a home camera, or Vlog recording.
- Use this scenario as the starting point for your design proposal. You are welcome to attach screenshots or images if available.
- When submitting, organize the content around one real scenario using the four UCD stages. You may use text descriptions, sketches, flowcharts, interface images, or screenshots. We recommend including at least one image.

The design proposal needs to answer 4 questions


### 01 Discover - Whose problem are you solving?

- Who are the target users? In what situation do they face visual inferential privacy risks?
- What are their current pain points? Why are existing methods insufficient?
- What is the core user problem you hope to address through design?

Please describe the users and scenario targeted by your design:

[Response]


### 02 Define - What exactly are you solving?

- Based on your selected users and scenario, define the design problem you want to solve. This can be a one-sentence “How might we...” question.
- Is your design goal to help users know the risk (notification/awareness), understand the risk (explanation/inference path), control the risk (intervention/protection), or all three?
- Which stage does your design focus on: warning before risk occurs, real-time prompting while it occurs, or post-event audit and review?

Please write your design problem definition:

[Response]


### 03 Design - What does your solution look like?


Please provide at least 2 design ideas (sketches or text descriptions are both acceptable). For each idea, explain:

1. Interface/interaction form: What does the user see, and what can they do?
2. Inference visualization: How do you show what AI has inferred and what evidence it used?
3. User control: What responses or interventions can the user make?
4. Difference from traditional methods: Which limitation of traditional approaches does your design address?

Idea 1:

[Response]


Idea 2:

[Response]


### 04 Evaluate - How will you know whether the design is effective?

- What method would you use to verify whether your design truly helps users?
- What are the success criteria? For example, can users correctly identify inferential risks? Does the design feel bothersome?
- What limitations or trade-offs might your design have, such as affecting smoothness of use?

Please describe your evaluation plan:

[Response]


## 6. Design guidelines


Please design a system around a scenario you are familiar with that may involve video or image input and that can help users perceive or protect inferential privacy. When designing, use the four-stage User-Centered Design (UCD) framework to organize your thinking, and submit your work in this format. We encourage you to present your content visually and recommend including at least one figure.

### 1. Context of use

What situation are you imagining? What are users doing, and in what scenario? For example, recording daily life with a phone or shopping while wearing smart glasses.

In this situation, what task does the user need to complete? What information might be captured in the image/video and then used to infer private information that the user may not want to reveal?


### 2. User requirements

To address the inferential privacy risks above, what conditions do you think the system needs to meet? For example:

- Users need to be aware of what information is being collected.
- Users need to understand which objects lead to which inferences.
- Without interrupting the main task, users need to quickly decide whether to block certain information from being collected.

### 3. Design solutions

What kind of solution will you design to protect user privacy? You may provide sketches, a flow, or a written description.


### 4. Evaluation

How would you verify that your solution is effective? For example, can users better perceive that their privacy is being collected or inferred, and can the design reduce inferential privacy risks during use?


## 7. Reference example

Scenario

A user walks around at home wearing smart glasses. There is a prescription medicine bottle on the desk. After recognizing it, AI infers that the user may be receiving treatment or may have a history of chronic illness. The user never told AI this information, but it has already been exposed, and the inference process is completely black-box to the user.

Design solution

After the system recognizes the medicine bottle, it displays a bubble on the glasses: “AI is inferring your health status from the medicine bottle.” When the user taps the bubble, the medicine bottle is highlighted and an “anonymize” option is provided. After the user selects it, the medicine bottle is blurred, and AI will no longer use it for inference in the future.

Evaluation method

Ask users to try the system. Use questionnaires and interviews to evaluate whether users can more clearly understand their own inferential privacy risks and whether the design interferes with normal use.
