# Portrait expressions and compact contact

Owner request, 23 October 2026: make the indoor portrait smile, relax the boat selfie expression, add four specific Instagram carousel photos to About, and shorten the contact page.

## Images

The built-in image generation tool edited the full-resolution existing derivatives, rather than screenshots of the site. Original sources and previous derivatives remain intact. These are owner-authorized expression edits, not documentary originals or claims of recovered detail.

Published assets:

- `public/images/profile/cisco-candid-smile.webp`, 1086 x 1448.
- `public/images/profile/cisco-boat-smile.webp`, 1670 x 942.

The four new photos were downloaded from the exact owner-selected carousel frames through the signed-in Chrome session. They received orientation handling, bounded resizing and WebP encoding only. Existing in-photo collages and captions remain part of the original photographs. The full-sized downloaded JPEGs remain in Downloads.

| Published asset                 | Source frame                                                                                                      | WebP dimensions |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------- |
| `cisco-headphones.webp`         | [May collection, frame 3](https://www.instagram.com/p/DZBDa8LgC99b_dSDwpYpvGgWvqqv7S9klH0opE0/?img_index=3)       | 2000 x 1502     |
| `cisco-campus.webp`             | [October collection, frame 10](https://www.instagram.com/p/DeExbaBAPhCbuBgekkSXS2JjvxGmRjrS69gIFo0/?img_index=10) | 1803 x 2400     |
| `cisco-basketball.webp`         | [January collection, frame 8](https://www.instagram.com/p/DUO0MrCgBSBczthSlFVklj-TNUYI1mztJRzSMM0/?img_index=8)   | 1440 x 1852     |
| `cisco-family-celebration.webp` | [April collection, frame 5](https://www.instagram.com/p/DXzZnF3l2tkTqrCqJ387irKfPKQUrt8E3162go0/?img_index=5)     | 2000 x 2324     |

All six assets live in `public/images/profile/`. Source URLs and five-language captions are recorded in `src/content/personal-moments.ts`. About uses two gallery columns on phones with tap-to-enlarge dialogs, and three on desktop.

### Final prompts, built-in imagegen

Indoor portrait:

> Use case: identity-preserve. Edit target: the attached indoor portrait of Francis in a white shirt. Change only his facial expression into a warm, relaxed, natural smile with gently lifted cheeks and slightly parted smiling lips, a small glimpse of natural upper teeth. Preserve his exact identity, facial proportions, skin tone and real skin texture, hairline and hairstyle, facial hair, eyes, age, clothing, pose, full portrait framing, original room, bag, cabinetry, lighting and colors. Do not beautify or reshape his face, do not create a different person. Avoid exaggerated grin, big artificial teeth, retouched plastic skin. Keep the original portrait aspect ratio and detailed photographic quality. No captions, logos or UI.

Boat portrait:

> Use case: identity-preserve. Edit target is the boat selfie of Francis wearing wire-frame glasses and an orange life jacket. Make only a subtle expression correction: relax his raised eyebrows and squint, soften the tense asymmetric mouth into an easy natural closed-lip smile, with gently lifted mouth corners. Keep it subtle and recognizable. Preserve exact identity and face structure, skin tone and texture, hair, beard, glasses including reflections, head position, shirt and life jacket, necklace, boat motor, water, wake, rocky green shoreline, lighting, landscape aspect ratio and full composition. No beauty reshaping, no new pose or scene, no over-wide grin, no UI or text additions. Detailed authentic photograph.

## Contact design

Preserve the established charcoal, warm white and cobalt palette. Reduce repeated introductory copy and oversized portrait treatment. Keep name, email, phone, service and message visible. Templates remain next to the message with explicit replacement. Company, budget, timeline and preferred reply language sit in a native optional disclosure; closing it never clears fields. Locale defaults to the active route. Existing API, consent and delivery handling are unchanged.

## Verification

- Lint, strict TypeScript and 52 unit/API tests passed.
- 22 relevant browser tests passed, including all five locales, 320/390/768/1440px contact layouts, template replacement, optional-detail persistence and intercepted submission, photo dialogs and mobile scroll regressions.
- Contact accessibility scans passed at 390px and 1440px; expanded form and photo-dialog scans also passed.
- No live email is sent by browser verification. Screenshots are in `tmp/portrait-contact-qa/`.
- The user's Chrome has Grammarly, which can inject body attributes and cause a development hydration notice. Application verification uses isolated Chrome contexts.

Production build passed, generating all 81 routes. The local development server remains on port 3000.
