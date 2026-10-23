# Mobile reading, motion and brief templates

The owner requested removing em dashes, reducing crowded mobile copy, improving phone scrolling and placing templates with "Tell me what you need".

## Reading hierarchy

Removed literal em dashes and encoded variants from tracked text, including metadata, alt text, email punctuation, content, documentation and instruction headings. No policy or instruction meaning changed.

Shortened the hero introduction and work/studio introductions in all five languages. On phones, repeated role/name labels and per-project summaries are omitted from the homepage rail; full contributions and descriptions remain in the case studies and project index. The shared custom-build invitation stays visible. Concept cards keep their industry, name and demo link without a repeated paragraph.

Phone hero body text is 16px with 1.75 line height. Headings have more open leading and tracking. At 320px, the hero actions stack instead of squeezing onto one line. The imagined-art caption remains visible and uses the available width. Form labels are larger, preferences stack in one column and fields have more separation.

## Mobile motion

The existing Motion implementation now responds to the compact breakpoint through React's server-safe external-store hook. It only updates on breakpoint changes, not on each scroll event. Mobile background travel is limited to 24px, scaling from 1.03 to 1.06. Hero copy stays still. Section reveals move 8px over 280ms and start at 92% opacity so content remains readable. Desktop movement retains its previous range.

Phone rails use native proximity snapping. Buttons still move to a specific slide; keyboard navigation is immediate. Reduced motion removes decorative movement, and the page remains readable without JavaScript. No scroll interception or new dependency was added.

## Templates where people write

The existing native template picker is immediately above the message textarea, after its label. The separate introductory card at the top of the form is removed. The phone picker spans the same width as the textarea. All five templates and the write-your-own option remain.

Selecting a template immediately fills its service and editable brief. There is no separate preview or apply button. Name, email, phone, company and other preferences remain intact. Choosing the write-your-own option preserves the current text. Focus stays on the native dropdown, allowing keyboard browsing and a normal Tab into the textarea. Existing validation, consent and email handling are preserved.

| Before                                                        | After                                                     | Why                                                |
| ------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------- |
| Choose a template, read a duplicate preview, then click Apply | Choosing a template fills the actual textarea immediately | Remove the redundant action requested by the owner |
| Applying moves focus into the textarea                        | Focus stays on the select; Tab reaches the textarea       | Keep native keyboard browsing predictable          |

## Verification and proof

Focused browser coverage checks 320px and 390px layouts in all five languages, body type size, bounded hero height, earlier project displays, no page overflow, native-template placement and width, automatic filling, preserved contacts, stationary copy, limited background travel and reduced motion. All five templates are checked in all five languages. The existing suite covers forms, metadata, all routes, accessibility, themes, galleries and no-JavaScript navigation.

A browser-only mutation inverted the compact background-travel branch. The travel-limit assertion rejected it; no source or server file was changed by that experiment. Browser contact POSTs remain intercepted. This task sends no live inquiry emails.

Final production previews are in `refinement-preview/mobile-clear-home.webp`, `mobile-clear-projects.webp`, `mobile-clear-fr-320.webp`, `mobile-brief-template.webp`, `mobile-template-preview.webp` and `desktop-brief-template.webp`. Results are recorded in `VERIFICATION.md`. The preview uses port 3000 only.

Earlier mobile-reading verification: 52 unit/API tests, ESLint and the 81-route production build passed. The full browser run passed 64 cases. After the accessible-name adjustment, all five mobile clarity cases passed, including the phone accessibility scan. The English 390px hero measured 455.5px; the template selector and textarea both measured 350px wide. All checks use isolated browser contexts and intercept contact submissions.

Automatic-template verification, 24 October 2026: 63 unit/API tests, six focused browser cases, ESLint, strict TypeScript and the 81-route production build pass. The browser checks cover immediate replacement, preserved contacts, manual editing, write-your-own preservation, keyboard focus/Tab, all 25 template/language combinations, the compact mobile picker and form accessibility. The initial new behavior check failed against the old apply-button flow. The final phone form was visually inspected and independent code review passed. No real email was sent.
