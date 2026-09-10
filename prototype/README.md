# Six-Design Interactive Demonstration

Open `index.html` directly in a browser. Alternatively, from this folder run `python3 -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000`.

The navigation contains exactly six designs:

| Paper label | Demo label |
|---|---|
| D1. Central Risk List | Standalone Risk Panel |
| D2. Conversational Control | Conversational Privacy Assistant |
| D3. Marked Clues with Side Explanation | In-image Boxes with Explanation Panel |
| D4. Step-by-Step Timeline | Inference Timeline |
| D5. Contextual Lightweight Hint | Contextual Hint |
| D6. In-place Risk Action | Fully Contained In-image Explanation |

Choose a design, switch between the three generic scene tabs, inspect evidence and an inference, and use the available privacy controls. Risk scores and action feedback are simulated.

This standalone demonstration has no response-submission backend. Its three scene choices illustrate design behavior; they should not be interpreted as the conditions of the evaluation study. The [storyboards](../02_Six_Design_Concepts/Six_Design_Concepts.md) and [evaluation-flow reference](../study-reference/README.md) are provided separately.

Background-question constants retained in the source are transcribed in [Background Questionnaire Items](../03_Evaluation/Background_Questionnaire_Items.md); the demo does not present them as a survey.

System fonts are used; no external font download is required.
