# Designing for Visual Inferential Privacy

## Purpose

This document presents a design space for interfaces that help people notice, understand, and respond to privacy risks created when AI systems infer sensitive information from images or video.

## What is visual inferential privacy?

Visual inferential privacy concerns sensitive information that an AI system derives indirectly from ordinary visual cues. The sensitive attribute may not be explicitly shown. Instead, the system combines several cues, such as objects, text, spatial context, appearance, or repeated observations, to form an inference.

For example, a photograph may contain a medicine bottle, an appointment reminder, and a work schedule. Individually, these items may appear harmless. Together, they may support an inference about a person's health or daily routine. Similar risks can arise in social-media posts, smart-glasses recordings, video-conference backgrounds, home cameras, and vlogs.

## Design objective

An effective privacy interface should help people:

1. notice which visual cues are being used;
2. understand how those cues support an inference;
3. decide whether the inference is acceptable in context; and
4. protect selected cues without losing more useful context than necessary.

## Design directions

### Standalone risk panel

A separate panel lists inferred privacy categories, contributing evidence, confidence, and available protection actions. This format supports a pre-sharing review without covering the original scene.

### Conversational privacy assistant

A conversational assistant explains why an inference was produced and lets the user state a protection goal in natural language. The assistant can propose actions while leaving the final decision to the user.

### In-image boxes with explanation panel

The interface marks evidence directly in the image and connects the marked cues to an inference explanation. Users can inspect the evidence chain and protect only the relevant regions.

### Inference timeline

A timeline separates cue collection, evidence combination, profile formation, and subsequent use. This makes cumulative risk across multiple images easier to inspect.

### Contextual hint

Short notices appear near potentially sensitive objects when risk increases. The design aims to provide awareness with limited interruption during a time-sensitive task.

### Fully contained in-image explanation

Each risky region contains its inferred conclusion, confidence, and an action such as masking or replacing text. This keeps the decision within the user's visual context.

## User-centered design framework

### Discover

Identify the user, task, and visual setting. Document which objects, text, people, or environmental features may be recorded and what sensitive attributes could be inferred from them.

### Define

State whether the primary problem is lack of awareness, lack of explanation, lack of control, or a combination of these. Also specify whether support is needed before capture, during capture, or after processing.

### Design

Represent the inference path explicitly: visual cue, intermediate interpretation, sensitive inference, and available intervention. Protection should be selective, understandable, and reversible where possible.

### Evaluate

Assess whether users can identify the inferred risk, explain which cues contributed to it, choose an appropriate protection action, and complete the main task without excessive interruption. Evaluation can combine task accuracy, decision time, perceived control, understandability, trust, and qualitative feedback.

## Interaction principles

- Show the relationship between an observed cue and the resulting inference.
- Distinguish direct recognition from indirect inference.
- Make confidence and uncertainty understandable.
- Offer targeted protection instead of requiring all-or-nothing blocking.
- Preserve the user's ability to inspect, override, or undo an action.
- Scale the amount of explanation to the sensitivity and complexity of the risk.
- Avoid exposing personal data, participant identifiers, or study metadata in public demonstrations.

## Interactive demonstration

The accompanying [`prototype/`](prototype/) folder contains a standalone, anonymized MVP. It demonstrates six visualization directions across three generic visual scenarios. It does not include the study interface, participant data, response data, recruitment information, or author-identifying metadata.
