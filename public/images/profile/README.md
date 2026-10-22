# Authentic profile photography

Instagram content could not be fetched. These three SVGs are deliberately graphic placeholders, not portraits of Francis or generated people.

Recommended replacements:

- `hero.webp`: authentic portrait, ideally 1600×1900 or larger. Keep the face toward the upper center, with some breathing room. The desktop crop is roughly 0.87:1; mobile uses a wider crop. Adjust `object-position` in `.portrait-frame > img` if needed.
- `headshot.webp`: professional headshot at least 1200×1400, with a simple background and natural light.
- `lifestyle.webp`: casual image from Tanzania/Russia at least 1800×1200. No private address, documents, or identifying details in the background.
- Optional gallery: add files here and list them in `profile.photos.gallery` with useful alt text.

Use a consistent neutral grade and retain natural skin tones. Next Image generates responsive sizes and AVIF/WebP variants. After changing each path in `src/content/profile.ts`, set its `confirmed` flag to true. Confirmed photos replace the corresponding placeholder labels automatically.
