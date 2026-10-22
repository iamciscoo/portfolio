# Personal photos and frameless project displays

## Scope

The owner requested removing the coloured mats behind real project showcases, adding genuinely new photographs from `just.cisco`, and enhancing the current photographs. The homepage now shows browser and phone displays directly on the page. Their natural height is retained instead of clipping the bottom of the desktop capture. The project listing uses the same treatment. Motion, case-study links and mobile displays remain.

## New Instagram photos

Reviewed the authenticated Chrome profile and opened the actual carousels. Downloaded the visible photograph, not a hidden adjacent thumbnail or video poster. Each source was visually checked locally before use.

- Boat portrait: `https://www.instagram.com/just.cisco/p/DQUvsETgDE22V2USaZgOfCBy46cTHC-439P3fU0/?img_index=2`, original download `572138421_17928635283120862_4593124187197682538_n.jpg`, 1080 × 609. About opens with its enhanced version. No specific location is inferred from the playful post geotag.
- TIMUN assembly: `https://www.instagram.com/just.cisco/p/DM3EVlDCb_n3_gL8lQ_QmQWFfmpttDouHFut140/?img_index=9`, original download `527571910_17918598303120862_6283546351777488353_n.jpg`, 1440 × 1920. The post identifies the Dodoma collection. The gallery uses the actual photograph, WebP encoded without generative edits; country placards and original motion blur are retained. No new professional role or credential is inferred.

No account credentials, cookies, messages, comments, map-location screenshots or unrelated carousel media were copied into the website. The owner explicitly requested public portfolio use of these personal photos. Existing source images remain available; no original was overwritten.

## Clarity enhancement

Used the built-in Imagegen editing tool with each source photograph explicitly referenced. Saved project outputs:

| Image | Before | Enhanced asset | Actual output |
| --- | --- | --- | --- |
| Indoor portrait | `cisco-candid.webp`, 720 × 960 | `public/images/profile/cisco-candid-enhanced.webp` | 1086 × 1448 |
| Glasses portrait | `cisco-glasses.webp`, 810 × 1080 | `public/images/profile/cisco-glasses-enhanced.webp` | 1086 × 1448 |
| TIMUN portrait | `cisco-timun.webp`, 720 × 960 | `public/images/profile/cisco-timun-enhanced.webp` | 1086 × 1448 |
| Boat portrait | `cisco-boat-original.webp`, 1080 × 609 | `public/images/profile/cisco-boat-enhanced.webp` | 1670 × 941 |

These are AI-assisted restoration variants. They are not additional camera evidence or a claim of lossless recovered detail. The viewer labels enhanced images and provides an Original/Enhanced switch in all five languages. The subject and scene were compared visually with the input; small texture or detail reconstruction remains possible. The original is the reference.

The four generated PNGs remain under `C:/Users/Administrator/.codex/generated_images/01a163a1-303f-7620-b2b5-ed6b736b238d/`: `exec-2b1e9a19-4c76-4699-83c4-9b2d458ea288.png`, `exec-993e0505-f020-4894-b43f-6680247e39a7.png`, `exec-aa20c10a-1774-4185-84f7-650a4031379b.png`, and `exec-cdde6c3c-9018-4643-abb1-c583302f0aed.png` respectively. WebP encoding preserves their returned dimensions; no extra upscale is presented as native detail.

Shared final prompt:

> Use case: identity-preserve. Edit this exact provided photograph for conservative high-quality photographic restoration. Increase clarity and useful resolution, reduce JPEG compression and sensor noise gently, recover natural tonal detail, and make a restrained neutral white balance and exposure correction. Preserve this SAME person's exact identity and facial geometry, expression, asymmetric details, hairline, glasses, skin tone, natural skin texture, pose, body proportions, clothing, jewelry, background, composition and camera perspective. Do not beautify, reshape, smooth the skin, change expression, replace scenery or invent objects. Keep any readable lettering, logos, clothing, signs and printed material exactly as in the original; do not rewrite unclear text. No dramatic relighting or cinematic grade. No crop or reframing. Match the original aspect ratio and framing precisely. The output should look like a cleaner higher-quality version of the SAME photograph, not a new photoshoot.

Portrait suffix: `Portrait 3:4, target 1536x2048.` Boat suffix: `Landscape 16:9, target 2160x1218.` Actual outputs are recorded above; target sizes were not returned exactly. `manifest.json` records every source, derivative and placement.

## Verification

Dedicated browser coverage checks transparent showcase stages, complete browser displays, all four device widths, actual new photo paths, original/enhanced switching, translated controls, focus return and photo-viewer accessibility. Existing suite coverage includes all routes, all five languages, themes, reduced motion and no-JavaScript content. Browser contact submissions remain intercepted; this refinement sends no live inquiry email. Preview uses port 3000 only. Current results and screenshots are in `VERIFICATION.md` and `refinement-preview/`.
