import { l } from "@/lib/localize";
export const milestones = [
  {
    id: "dstu",
    type: "education",
    date: l("Current", "Сейчас", "Kwa sasa"),
    title: l(
      "Don State Technical University",
      "Донской государственный технический университет",
      "Don State Technical University",
    ),
    place: l("Russia", "Россия", "Urusi"),
    body: l(
      "Continuing my education in Russia. Institution confirmed; qualification and dates awaiting confirmation.",
      "Продолжаю образование в России. Учебное заведение подтверждено; программа и даты уточняются.",
      "Naendelea na elimu Urusi. Chuo kimethibitishwa; programu na tarehe zinasubiri uthibitisho.",
    ),
  },
  {
    id: "globo",
    type: "experience",
    date: l(
      "Nov 2025 — present",
      "Ноябрь 2025 — настоящее время",
      "Novemba 2025 — sasa",
    ),
    title: l(
      "Product Manager · GloboExpats",
      "Менеджер продукта · GloboExpats",
      "Meneja wa Bidhaa · GloboExpats",
    ),
    place: l("Tanzania", "Танзания", "Tanzania"),
    body: l(
      "Product management and full-stack development alongside the team, building a marketplace for the expat community.",
      "Управление продуктом и full-stack-разработка вместе с командой маркетплейса для экспатов.",
      "Usimamizi wa bidhaa na uundaji wa full-stack pamoja na timu, tukijenga soko la jamii ya wageni.",
    ),
  },
  {
    id: "habari",
    type: "experience",
    date: l(
      "Aug — Sep 2024",
      "Август — сентябрь 2024",
      "Agosti — Septemba 2024",
    ),
    title: l(
      "Network Management Apprentice",
      "Практикант по управлению сетями",
      "Mwanafunzi wa Usimamizi wa Mitandao",
    ),
    place: l(
      "Habari Node PLC · Arusha",
      "Habari Node PLC · Аруша",
      "Habari Node PLC · Arusha",
    ),
    body: l(
      "Practical exposure to computer networks, technical support and enterprise IT operations.",
      "Практическое знакомство с компьютерными сетями, технической поддержкой и корпоративной ИТ-инфраструктурой.",
      "Uzoefu wa vitendo katika mitandao, msaada wa kiufundi na shughuli za TEHAMA za kampuni.",
    ),
  },
  {
    id: "uds",
    type: "education",
    date: l(
      "From Oct 2023 · historical record",
      "С октября 2023 · архивная запись",
      "Kuanzia Oktoba 2023 · rekodi ya awali",
    ),
    title: l(
      "University of Dar es Salaam",
      "Университет Дар-эс-Салама",
      "Chuo Kikuu cha Dar es Salaam",
    ),
    place: l(
      "Computer Science studies",
      "Обучение информатике",
      "Masomo ya Sayansi ya Kompyuta",
    ),
    body: l(
      "Listed in the supplied CV. This is a historical education entry; it does not imply current enrollment or a completed degree.",
      "Указано в предоставленном резюме. Архивная запись не означает текущего обучения или получения степени.",
      "Imeorodheshwa kwenye CV. Rekodi hii haimaanishi bado ninasoma hapo au nimemaliza shahada.",
    ),
  },
  {
    id: "rumem",
    type: "experience",
    date: l(
      "Aug — Sep 2023",
      "Август — сентябрь 2023",
      "Agosti — Septemba 2023",
    ),
    title: l(
      "Software Management Intern",
      "Стажёр по управлению ПО",
      "Mwanafunzi wa Usimamizi wa Programu",
    ),
    place: l("RUMEM · Sumbawanga", "RUMEM · Сумбаванга", "RUMEM · Sumbawanga"),
    body: l(
      "User support and LAN maintenance experience at Rukwa Mbeya Eden Merchandise.",
      "Опыт поддержки пользователей и обслуживания локальной сети в Rukwa Mbeya Eden Merchandise.",
      "Uzoefu wa kusaidia watumiaji na kutunza LAN katika Rukwa Mbeya Eden Merchandise.",
    ),
  },
  {
    id: "mzumbe",
    type: "education",
    date: l("2020 — 2023", "2020 — 2023", "2020 — 2023"),
    title: l(
      "Mzumbe Secondary School",
      "Средняя школа Мзумбе",
      "Shule ya Sekondari Mzumbe",
    ),
    place: l("Morogoro, Tanzania", "Морогоро, Танзания", "Morogoro, Tanzania"),
    body: l(
      "Advanced Secondary Education.",
      "Полное среднее образование, старшая ступень.",
      "Elimu ya sekondari ya juu.",
    ),
  },
  {
    id: "livingstone",
    type: "education",
    date: l("2016 — 2019", "2016 — 2019", "2016 — 2019"),
    title: l(
      "Living Stone Boy’s Seminary",
      "Семинария Living Stone Boy’s",
      "Living Stone Boy’s Seminary",
    ),
    place: l("Tanga, Tanzania", "Танга, Танзания", "Tanga, Tanzania"),
    body: l(
      "Certificate of Secondary Education Examination.",
      "Свидетельство о среднем образовании.",
      "Cheti cha Elimu ya Sekondari.",
    ),
  },
] as const;
