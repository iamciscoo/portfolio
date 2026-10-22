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
    hero: { src: "/images/profile/hero-placeholder.svg", confirmed: false },
    headshot: {
      src: "/images/profile/headshot-placeholder.svg",
      confirmed: false,
    },
    lifestyle: {
      src: "/images/profile/lifestyle-placeholder.svg",
      confirmed: false,
    },
    gallery: [] as { src: string; alt: string }[],
  },
  currentEducation: {
    institution: "Don State Technical University",
    country: "Russia",
    qualification: null as string | null,
    start: null as string | null,
    end: null as string | null,
  },
};
