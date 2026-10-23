# Scroll flow, Work concepts and photo zoom

23 October 2026. Self-authored refinement under the owner's explicit direction: "be creative but do not compromise stability and functionality". The owner also supplied [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft).

## Reference and approach

Checked the live repository through GitHub. Its current commit, `75d81f74e83692add18cd7a8a8e078b8a887a579`, matches the existing ignored reference checkout. Read the skill, device, hero-depth, feeling-curve and verification guidance. Adapted its layering, varied pacing, phone composition and intermediate-frame verification to this existing React site.

The portfolio keeps its current Motion implementation and native browser scrolling. The standalone ScrollCraft engine, video scrubbing, extra dependencies, cursor capture and long pinned sections were not introduced. The owner requested a refinement of the working site, rather than a new page grammar or generated scene. No photo assets, private forms or environment configuration changed.

The sequence remains: meet Francis, inspect real work, browse concept directions, understand services and experience, then make contact. The visual peak is the real desktop and phone displays settling into one composition while their project text stays still. The concept rail has a different job: scan possible directions at the visitor's own pace. The contact section stays calm. No empty scroll holds were added.

| Before                                                  | After                                                                                   | Why                                                                    |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Header progress plus another blue line below the hero   | One reading indicator in the header                                                     | Remove the duplicate loader-like line requested by the owner           |
| Hero copy translated separately from the page           | Text scrolls naturally; only the artwork has depth                                      | Keep reading and clicking predictable                                  |
| Static paired project displays                          | Browser gently settles from 96% scale; phone arrives independently                      | Give the real work a clear focal sequence                              |
| Same motion range across sizes                          | Phones use 98.5% initial display scale and 12px phone travel; desktop uses 96% and 28px | Preserve mobile space and stability                                    |
| Concept previews stay visually unchanged during a swipe | The image settles as its card enters the native horizontal rail                         | Distinguish browsing from vertical storytelling                        |
| Work ends after two websites                            | A translated concept invitation with shop/travel previews and a Studio link             | Help visitors find website directions after seeing the actual projects |
| A photo dialog only fits an image                       | Fit/2x controls, keyboard shortcuts and native panning                                  | Let visitors inspect details without leaving the site                  |

## Motion and fallbacks

Hero artwork uses bounded spring-smoothed translation and scale: maximum travel 72px on desktop and 24px on compact screens, with scale capped at 1.12 and 1.06 respectively. Project text never has a decorative transform. Images reserve their original layout dimensions, so the motion does not push following sections around.

The concept image animation uses a named inline view timeline scoped to its own tile. It is gated by CSS feature support and `prefers-reduced-motion: no-preference`; unsupported browsers keep static images and a fully working native rail. Keyboard focus disables that image animation. The [MDN animation-timeline reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline) documents the timeline syntax and limited browser availability. Native CSS is an enhancement, not a navigation dependency.

Reduced motion removes decorative transforms and image animation. Useful native navigation, touch swipes, keyboard rail controls and explicit photo zoom remain available. Essential copy starts visible and links remain server-rendered.

## Work invitation and photo viewer

The invitation follows the real project grid, outside the project filters. All five locales link to the matching localized Studio. PACE and SAFIRI previews also link directly to their demos. The copy identifies the examples as demo brands and explains that a similar idea can be adapted for the visitor's business.

The existing Radix dialog retains Escape, focus trapping and focus return. The photo viewer adds a 44px zoom control, a fit state, a live zoom label and help in all five languages. `+`/`=` zoom in; `-`/`0` fit the image. Browser Ctrl/Command zoom shortcuts are left alone. Panning uses the scrollable image area without pointer lock or custom gesture capture. Closing the dialog resets zoom on the next open. Its flex layout keeps controls and instructions visible on short landscape screens.

## Evidence

- Lint, strict TypeScript and 55 unit/API tests passed.
- Initial browser pass: all 34 relevant cases passed. After the inline concept-image enhancement and short-screen viewer adjustment, all 22 affected cases passed, including the two added cases.
- Checks cover 320px, 390px and 1440px, all five locales, concept navigation, complete project frames, keyboard and native rail browsing, zoom/pan dimensions, dialog focus return, accessibility and reduced motion. Existing no-JavaScript, mobile spacing, theme and navigation checks passed.
- Production build passed with all 81 routes generated.
- Captured actual hero opening, intermediate and exit frames on desktop and phone, plus phone reduced motion. `refinement-preview/scroll-flow.webp` is the contact sheet; measurements and original frames are in ignored `tmp/scroll-zoom-qa/frames/`.
- The sample at 70% hero-height scroll measured 38.5px artwork translation on desktop and 11.2px on phone. Reduced motion measured zero translation and scale 1 at every sampled position. These are sampled positions, not maximum settings.
- Work and zoom previews are in `tmp/scroll-zoom-qa/`. Browser submissions remain intercepted; no real email or WhatsApp message was sent.

These are real Chrome layout and interaction checks. They do not claim full ScrollCraft engine telemetry, physical-device testing or an FPS benchmark. The local development server continues to use port 3000.
