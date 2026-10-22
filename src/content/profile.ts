import { l } from "@/lib/localize";

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
    hero: { src: "/images/profile/journey-cinematic.webp", confirmed: true },
    headshot: {
      src: "/images/profile/cisco-candid-enhanced.webp",
      originalSrc: "/images/profile/cisco-candid.webp",
      width: 1086,
      height: 1448,
      confirmed: true,
    },
    boat: {
      src: "/images/profile/cisco-boat-enhanced.webp",
      originalSrc: "/images/profile/cisco-boat-original.webp",
      width: 1670,
      height: 941,
      alt: l(
        "Francis on a boat wearing an orange life jacket",
        "Фрэнсис в лодке в оранжевом спасательном жилете",
        "Francis kwenye boti akiwa na koti la kuokoa maisha",
        "Francis sur un bateau avec un gilet de sauvetage orange",
        "Francis en un barco con chaleco salvavidas naranja",
      ),
      caption: l(
        "Blue water chronicles · from my personal collection",
        "На воде · из личной коллекции",
        "Safari ya majini · kutoka mkusanyiko wangu",
        "Au fil de l’eau · ma collection personnelle",
        "Entre aguas azules · mi colección personal",
      ),
      source:
        "https://www.instagram.com/just.cisco/p/DQUvsETgDE22V2USaZgOfCBy46cTHC-439P3fU0/?img_index=2",
    },
    gallery: [
      {
        src: "/images/profile/cisco-timun-assembly.webp",
        width: 1440,
        height: 1920,
        alt: l(
          "Delegates raising country placards at TIMUN",
          "Делегаты поднимают таблички стран на TIMUN",
          "Wajumbe wakiinua mabango ya nchi kwenye TIMUN",
          "Des délégués lèvent les pancartes de leur pays au TIMUN",
          "Delegados levantando carteles de países en TIMUN",
        ),
        caption: l(
          "Inside TIMUN · a moment from my Dodoma collection",
          "На TIMUN · момент из моей коллекции из Додомы",
          "Ndani ya TIMUN · tukio kutoka Dodoma",
          "Au cœur du TIMUN · un instant de ma collection de Dodoma",
          "Dentro de TIMUN · un momento de mi colección de Dodoma",
        ),
        source:
          "https://www.instagram.com/just.cisco/p/DM3EVlDCb_n3_gL8lQ_QmQWFfmpttDouHFut140/?img_index=9",
      },
      {
        src: "/images/profile/cisco-timun-enhanced.webp",
        originalSrc: "/images/profile/cisco-timun.webp",
        width: 1086,
        height: 1448,
        alt: l(
          "Francis at Tanzania International Model United Nations, 2025",
          "Фрэнсис на Tanzania International Model United Nations, 2025",
          "Francis kwenye Tanzania International Model United Nations, 2025",
          "Francis au Tanzania International Model United Nations, 2025",
          "Francis en Tanzania International Model United Nations, 2025",
        ),
        caption: l(
          "TIMUN, Tanzania · 2025",
          "TIMUN, Танзания · 2025",
          "TIMUN, Tanzania · 2025",
          "TIMUN, Tanzanie · 2025",
          "TIMUN, Tanzania · 2025",
        ),
        source: "https://www.instagram.com/i.amcisco/p/DM2G1E3o8Jy/",
      },
      {
        src: "/images/profile/cisco-glasses-enhanced.webp",
        originalSrc: "/images/profile/cisco-glasses.webp",
        width: 1086,
        height: 1448,
        alt: l(
          "Francis wearing glasses, a candid close-up",
          "Портрет Фрэнсиса в очках",
          "Picha ya karibu ya Francis akiwa na miwani",
          "Portrait spontané de Francis avec ses lunettes",
          "Retrato espontáneo de Francis con gafas",
        ),
        caption: l(
          "A candid close-up",
          "Непостановочный портрет",
          "Picha ya kawaida ya karibu",
          "Un portrait spontané",
          "Un retrato espontáneo",
        ),
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
