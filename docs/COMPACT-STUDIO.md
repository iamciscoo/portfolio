# Compact homepage, shop and travel concepts

The homepage uses native horizontal scroll-snap rails for both real projects and six studio concepts. Touch/trackpad scrolling, previous/next controls, keyboard arrows and Home/End all reach the slides. No vertical scroll interception, autoplay or new dependency is used. Reduced motion removes animated scrolling. The studio catalogue keeps its full grid. Real client work and fictional concepts remain clearly distinguished.

Each real project and every concept now explain that Francis can build a similar experience adapted to the visitor's brand, content and requirements. The inquiry links select the existing business website service.

PACE is an illustrative shop with category filters, a local sample bag, quantity changes, removal, empty state and recalculated TZS totals. It has no checkout, inventory promise, payment or order transmission. SAFIRI is a fictional Tanzania tour company with route filters, expandable sample itineraries and an enquiry preview prefilled with the selected route. Existing validation is reused; no booking is sent. All copy and controls support English, Russian, Kiswahili, French and Spanish.

The mobile homepage hero no longer fills the viewport. At 390px the English hero measured approximately 435px in the initial smoke check, including its actions and About link. Touch feedback uses tap highlights, press opacity and restrained scaling, respecting reduced motion. Mobile rails preserve a visible next slide and contain horizontal overflow.

The photo viewer now displays only the selected enhanced photograph, with zoom and close. The Original/Enhanced controls and their state/styles/copy are removed. Original files are retained as source records, not shown in the viewer. This supersedes the comparison UI described in PHOTOS-AND-DISPLAYS.md. AI provenance remains documented.

All published raster photography in public/images is WebP. Next Image is configured to serve WebP exclusively, replacing AVIF preference. Dynamic PNG Open Graph cards and temporary QA screenshots are not published photographs.

## New imagery

Built-in Imagegen created the illustrative artwork, with no source photographs or external API key. Outputs were encoded to WebP without changing returned dimensions. Neither image depicts an actual client product range or a verified tour departure.

- Shop: public/images/demos/shop.webp, 1536 x 1024, quality 90, 126618 bytes. PNG source: C:/Users/Administrator/.codex/generated_images/01a163a1-303f-7620-b2b5-ed6b736b238d/exec-98ba2f99-09cb-479f-a1a3-150f303700a9.png.
- Tours: public/images/demos/tours.webp, 1672 x 941, quality 90, 387678 bytes. PNG source: C:/Users/Administrator/.codex/generated_images/01a163a1-303f-7620-b2b5-ed6b736b238d/exec-33b70c2c-51b7-4f1c-aaf1-df3b0306cd8d.png.

Final prompts:

### shop

Create a premium editorial product photograph for a fictional modern everyday-goods online shop called PACE. No text, logo or watermark. Wide landscape 3:2 composition, target 1800x1200. On a matte pale cool-gray seamless studio surface: a black heavyweight canvas tote with long handles, a steel reusable water bottle, a neatly folded cobalt blue cotton T-shirt, and off-white low-top trainers with charcoal soles. Four plausible unbranded products, clean realistic materials, detailed stitching, soft directional daylight and natural grounded shadows. Asymmetrical styling with room on the left for a website heading, objects concentrated middle-right. High detail restrained luxury ecommerce art direction, no beige, no fake labels, no people, no decorative UI. This is illustrative fictional merchandise.

### tours

Create a photorealistic editorial travel image for a fictional Tanzania tour company called SAFIRI. No text, logos, watermark or people. Wide landscape 16:9, target 2160x1216. An evocative East African savannah at warm early morning, flat-topped acacia at right, a small group of elephants walking at a natural middle distance, layered blue-green hills and a broad atmospheric sky with space for website text on the left. Restrained natural color, crisp plausible animal anatomy, documentary travel-magazine photography, no fantasy, no composite of incompatible landmarks, no vehicles, high detail. It is illustrative AI-created travel scenery rather than evidence of an actual expedition.

## Verification

Focused browser checks exercise rail buttons and keyboard, phone touch input, compact hero bounds, sample bag math, route filters, itinerary expansion, prefilled enquiries, photo viewer and accessibility. Both new routes are included in all-locale, five-width and accessibility suites. Contact POSTs remain intercepted. No live email, order, payment or booking is sent. Port 3000 remains the only Portfolio preview listener. See VERIFICATION.md for final results.
