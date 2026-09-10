# Evaluation-Flow Reference

This frontend preserves the available six-design study flow: introductory example, comprehension questions, three storyboard/interaction/rating rounds, and a final ranking. It is a local inspection reference for the August 17 frontend snapshot. It is not asserted to be the final collection build.

## Run locally

Use Node.js 22.12 or later (Node 24 was used for the integration check).

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open the address printed by Vite. The interface defaults to English. Use a fictional participant code such as `REVIEW01`; do not enter real participant identifiers.

- `/` opens the local evaluation-flow reference.
- `/prototype-gallery.html` opens the six interactive designs without rating collection.
- `/conditions.html` lists the available three-design combinations.

The flow saves its local progress in the browser and supports a local JSON export. No Prolific collection service is included; Prolific entry parameters are disabled in this reference package. The original upstream collection adapter remains available in the source repository's history, while this package cannot send responses to a collection server.

For a production frontend build, run `npm run build`; `npm run preview -- --host 127.0.0.1` serves that build locally. Backend-only package scripts have been removed because this package is frontend-only.

## Relation to the materials

The six main concepts are cataloged in [Six Design Concepts](../02_Six_Design_Concepts/Six_Design_Concepts.md). The exact rating strings in this reference are reproduced in [Evaluation Questionnaire](../03_Evaluation/Evaluation_Questionnaire.md). The separate standalone demo preserves another set of rating-question constants, documented in that same file for comparison.

The background instruments recorded in the collection export are not administered by this older flow. Their recovered question text is in [Background Questionnaire Items](../03_Evaluation/Background_Questionnaire_Items.md). The bundled Chinese font is omitted; existing system-font fallbacks are used. The original code license is retained.
