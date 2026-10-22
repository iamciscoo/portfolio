export const profile = {
  name: "Francis Jacob Mwambene",
  shortName: "Francis Mwambene",
  alias: "Cisco",
  email: "francisjac21@gmail.com",
  origin: "Tanzania",
  location: "Russia",
  github: "https://github.com/iamciscoo",
  repository: "https://github.com/iamciscoo/portfolio",
  instagram: [
    "https://www.instagram.com/just.cisco/",
    "https://www.instagram.com/i.amcisco/",
  ],
  // Add an approved, privacy-reviewed PDF to public/ and set its URL here.
  cvUrl: null as string | null,
  photos: {
    hero: { src: "/images/profile/journey-art.webp", confirmed: true },
    headshot: {
      src: "/images/profile/cisco-candid.webp",
      confirmed: true,
    },
    lifestyle: {
      src: "/images/profile/journey-art-wide.webp",
      confirmed: true,
    },
    gallery: [
      {
        src: "/images/profile/cisco-timun.webp",
        alt: "Francis at Tanzania International Model United Nations, 2025",
      },
      {
        src: "/images/profile/cisco-glasses.webp",
        alt: "Francis wearing glasses, a candid close-up",
      },
    ],
  },
  currentEducation: {
    institution: "Don State Technical University",
    country: "Russia",
    qualification: null as string | null,
    start: null as string | null,
    end: null as string | null,
  },
};
