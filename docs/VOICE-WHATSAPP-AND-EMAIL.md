# Voice, WhatsApp and inquiry email

23 October 2026. Owner-requested additions and refinements, continuing the portrait/contact work.

## Photos and favicon

Added the two exact carousel frames requested by the owner, downloaded through signed-in Chrome. They were orientation-corrected, bounded in size and encoded as WebP without generative changes:

- `public/images/profile/cisco-skyline.webp`, 1800 x 2400, from [October collection, frame 6](https://www.instagram.com/p/DeExbaBAPhCbuBgekkSXS2JjvxGmRjrS69gIFo0/?img_index=6).
- `public/images/profile/cisco-mountain.webp`, 1440 x 1920, from [March collection, frame 10](https://www.instagram.com/p/DWovX4YF-6iEwvuqjVqKX_fNdeS5UAgcUp8tLs0/?img_index=10).

Source links and captions are kept in `src/content/personal-moments.ts`. The gallery now has nine photographs. The headphone portrait keeps its own crop position when new images are inserted before it.

Both SVG and ICO favicons now show a single c. Metadata uses a versioned icon URL to refresh browser caches.

## Voice and requests

Applied the Humanizer and Impeccable clarify workflows. Replaced abstract promotional copy on the main portfolio surfaces with first-person statements and concrete actions in all five locales. Examples:

- "Ideas travel. I build them." becomes "Hi, I'm Cisco. I build websites."
- "Explore my work" becomes "See my work".
- "Good things start with a conversation" becomes "Tell me what you need".
- "Send inquiry" becomes "Send message".

The request flow explains what to include, offers templates next to the message and says Francis will reply by email. Company, budget, timing and preferred reply language remain optional. Consent meaning and delivery behavior are preserved. Language information states verified English, Kiswahili and basic French ability without adding Russian fluency or other credentials.

## WhatsApp reference

The owner asked to follow [GloboExpats](https://globoexpats.com/). Chrome inspection found a 48px circular green button, a 28px WhatsApp mark, desktop bottom/right offsets of 24px and a mobile right offset of 16px. The portfolio follows those dimensions, with safe-area handling and a 24px bottom offset because it has no mobile bottom navigation bar.

The destination is the owner-supplied `255693749306`. Hover and keyboard focus reveal a translated "Can I help?" hint. The link opens WhatsApp in a new tab with a translated editable greeting; it does not send a message. A direct WhatsApp link is also available on Contact. The floating link hides while a gallery or navigation dialog is open, and footer spacing keeps the last links clear.

## Email

Replaced the unbounded list of fields with a 600px email layout using presentation tables and inline styles. The visitor's message appears before optional details. Reply buttons use mailto, phone links use tel, and the provider's Reply-To still points to the visitor's validated address. Budget, timing and language codes are expanded into readable labels. User-supplied HTML remains escaped; multiline messages use explicit line breaks. A matching plain-text email remains available.

The subject includes the service and sender's name. Delivery configuration was not changed. No live inquiry or WhatsApp message was sent during verification.

Local previews: `tmp/message-qa/inquiry-email.html` and `docs/refinement-preview/inquiry-email.webp`. These use explicitly fictional test contact details, not a real customer inquiry. Browser rendering is a local layout check; a Gmail or Outlook inbox delivery was not performed.

## Verification

- 55 unit/API tests passed, including readable email labels, reply links, optional fields and HTML escaping.
- Lint and strict TypeScript passed.
- Full browser run: 74 of 75 passed initially. The remaining mobile check caught an extra line above the work showcase. Shortening that line fixed the issue; all five mobile-clarity checks then passed without changing their thresholds.
- Browser checks include every locale and route, responsive layouts, keyboard operation, reduced motion, no-JavaScript content, accessibility, both added photos and the icon metadata. New tests verify WhatsApp dimensions, edge offsets, number, translated greeting, hint visibility and dialog stacking at 320px, 390px and 1440px.
- Email previews fit 320px, 390px and 900px without horizontal overflow. Resend calls are mocked or intercepted in tests.

The production build passed and generated all 81 routes. Development remains available on port 3000.
