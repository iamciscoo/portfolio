import { l } from "@/lib/localize";
export const demos = [
  {
    slug: "restaurant",
    name: "SAVOUR",
    category: "restaurant",
    image: "/images/demos/restaurant.webp",
    body: l(
      "Seasonal dining, slow evenings, and a table worth coming back to.",
      "Сезонная кухня, неспешные вечера и столик, к которому хочется вернуться.",
      "Chakula cha msimu, jioni tulivu na meza ya kurudia.",
    ),
  },
  {
    slug: "fashion",
    name: "AMARA",
    category: "fashion",
    image: "/images/demos/fashion.webp",
    body: l(
      "An editorial world for a model with a point of view.",
      "Редакционный взгляд на портфолио модели с характером.",
      "Ulimwengu wa mitindo kwa mwanamitindo mwenye mtazamo wake.",
    ),
  },
  {
    slug: "construction",
    name: "FORMWORK",
    category: "construction",
    image: "/images/demos/construction.webp",
    body: l(
      "Precision, purpose, and places built to last.",
      "Точность, смысл и пространства на долгие годы.",
      "Usahihi, kusudi na majengo ya kudumu.",
    ),
  },
  {
    slug: "consulting",
    name: "NORTHLINE",
    category: "consulting",
    image: "/images/demos/consulting.webp",
    body: l(
      "Clear thinking for the decisions that shape what comes next.",
      "Ясное мышление для решений, определяющих будущее.",
      "Fikra zilizo wazi kwa maamuzi yanayounda hatua inayofuata.",
    ),
  },
] as const;
