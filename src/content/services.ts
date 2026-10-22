import { l } from "@/lib/localize";
export const services = [
  {
    id: "business",
    title: l("Business websites", "Сайты для бизнеса", "Tovuti za biashara"),
    body: l(
      "A clear, credible home for your business, designed to help the right people take the next step.",
      "Понятный и убедительный сайт, который помогает вашим клиентам сделать следующий шаг.",
      "Tovuti inayoeleweka na kuaminika, inayosaidia wateja kuchukua hatua inayofuata.",
    ),
    deliverables: l(
      "Responsive pages · Service discovery · Inquiry forms · Search metadata",
      "Адаптивные страницы · Каталог услуг · Формы заявок · SEO-метаданные",
      "Kurasa zinazobadilika · Huduma · Fomu za maombi · SEO",
    ),
  },
  {
    id: "personal",
    title: l(
      "Personal brands & portfolios",
      "Личный бренд и портфолио",
      "Chapa binafsi na portfolio",
    ),
    body: l(
      "A distinctive online presence for professionals, creatives and people building their own path.",
      "Выразительное присутствие в интернете для профессионалов, авторов и творческих специалистов.",
      "Utambulisho wa kipekee mtandaoni kwa wataalamu, wabunifu na wanaojenga njia yao.",
    ),
    deliverables: l(
      "Visual direction · Portfolio gallery · Biography · Booking inquiry",
      "Визуальная концепция · Галерея работ · Биография · Форма связи",
      "Mwelekeo wa ubunifu · Picha za kazi · Wasifu · Maombi",
    ),
  },
  {
    id: "application",
    title: l(
      "Full-stack applications",
      "Full-stack-приложения",
      "Programu za full-stack",
    ),
    body: l(
      "Bring a product idea to life with connected interfaces, server logic and a practical data model.",
      "Воплощение продуктовой идеи: интерфейсы, серверная логика и продуманная модель данных.",
      "Geuza wazo la bidhaa kuwa uhalisia kwa muonekano, mifumo ya seva na data.",
    ),
    deliverables: l(
      "Product flows · Frontend & backend · Data modeling · Deployment handover",
      "Пользовательские сценарии · Фронтенд и бэкенд · Модель данных · Передача проекта",
      "Mtiririko wa bidhaa · Frontend na backend · Data · Makabidhiano",
    ),
  },
  {
    id: "marketplace",
    title: l(
      "E-commerce & marketplaces",
      "Интернет-магазины и маркетплейсы",
      "Biashara na masoko mtandaoni",
    ),
    body: l(
      "Help buyers discover what they need and give sellers a coherent way to present their offer.",
      "Удобный поиск для покупателей и понятные инструменты представления товаров для продавцов.",
      "Saidia wanunuzi kupata wanachohitaji na wauzaji kuonyesha bidhaa vizuri.",
    ),
    deliverables: l(
      "Catalog & discovery · Buyer/seller flows · Integration planning",
      "Каталог и поиск · Сценарии покупателя и продавца · План интеграций",
      "Katalogi na utafutaji · Wanunuzi na wauzaji · Miunganisho",
    ),
  },
  {
    id: "redesign",
    title: l("Website redesign", "Обновление сайтов", "Kuboresha tovuti"),
    body: l(
      "Give an existing site a clearer structure, a fresh visual identity and a better mobile experience.",
      "Более ясная структура, актуальный визуальный стиль и удобство на мобильных устройствах.",
      "Boresha muundo, utambulisho wa muonekano na matumizi kwenye simu.",
    ),
    deliverables: l(
      "UX review · Information architecture · Responsive rebuild",
      "Аудит UX · Информационная архитектура · Адаптивная разработка",
      "Ukaguzi wa UX · Mpangilio wa taarifa · Ujenzi upya",
    ),
  },
  {
    id: "integration",
    title: l("APIs & integrations", "API и интеграции", "API na miunganisho"),
    body: l(
      "Connect the services your business relies on through thoughtful, maintainable integrations.",
      "Подключение нужных бизнесу сервисов с понятной и поддерживаемой архитектурой.",
      "Unganisha huduma zinazotegemewa na biashara kwa njia inayoweza kutunzwa.",
    ),
    deliverables: l(
      "API contracts · Third-party connections · Error handling · Documentation",
      "Контракты API · Сторонние сервисы · Обработка ошибок · Документация",
      "API · Huduma nyingine · Kushughulikia hitilafu · Nyaraka",
    ),
  },
  {
    id: "windows",
    title: l(
      "Windows installation & setup",
      "Установка и настройка Windows",
      "Usakinishaji na usanidi wa Windows",
    ),
    body: l(
      "A clean Windows installation or a fresh start for an existing PC, with drivers, updates and essential setup.",
      "Чистая установка Windows или новая настройка компьютера: драйверы, обновления и необходимые программы.",
      "Usakinishaji mpya wa Windows au kuandaa upya kompyuta, pamoja na viendeshi, masasisho na mipangilio muhimu.",
    ),
    deliverables: l(
      "Windows installation · Driver setup · Updates · File-backup planning",
      "Установка Windows · Драйверы · Обновления · План резервного копирования",
      "Windows · Viendeshi · Masasisho · Mpango wa kuhifadhi faili",
    ),
  },
  {
    id: "software",
    title: l(
      "Software setup & troubleshooting",
      "Установка и поддержка программ",
      "Usanidi na utatuzi wa programu",
    ),
    body: l(
      "Help installing everyday applications, resolving software errors and getting a computer ready for work or study.",
      "Помощь с установкой приложений, устранением ошибок и подготовкой компьютера к работе или учёбе.",
      "Msaada wa kusakinisha programu, kutatua hitilafu na kuandaa kompyuta kwa kazi au masomo.",
    ),
    deliverables: l(
      "Application installation · Configuration · Software troubleshooting",
      "Установка приложений · Настройка · Устранение ошибок",
      "Usakinishaji wa programu · Mipangilio · Utatuzi wa hitilafu",
    ),
  },
  {
    id: "gaming",
    title: l(
      "Game installation & PC setup",
      "Установка игр и настройка ПК",
      "Usakinishaji wa michezo na usanidi wa PC",
    ),
    body: l(
      "Get your games installed and configured, with help for launch errors, required components and controller setup.",
      "Установка и настройка игр, помощь с ошибками запуска, нужными компонентами и подключением контроллера.",
      "Usakinishaji na mipangilio ya michezo, msaada kwa hitilafu za kuanzisha, vipengele vinavyohitajika na vidhibiti.",
    ),
    deliverables: l(
      "Game installation · Launch troubleshooting · Drivers & controllers",
      "Установка игр · Ошибки запуска · Драйверы и контроллеры",
      "Usakinishaji wa michezo · Hitilafu za kuanza · Viendeshi na vidhibiti",
    ),
  },
  {
    id: "consultation",
    title: l(
      "Product & technical guidance",
      "Продуктовые и технические консультации",
      "Ushauri wa bidhaa na teknolojia",
    ),
    body: l(
      "Turn a broad idea into a useful scope, clear priorities and a realistic development direction.",
      "От общей идеи к понятному объёму работ, приоритетам и направлению разработки.",
      "Badili wazo pana kuwa mahitaji yanayoeleweka, vipaumbele na mwelekeo wa maendeleo.",
    ),
    deliverables: l(
      "Requirements discovery · Product planning · Technical direction",
      "Анализ требований · Планирование продукта · Техническая концепция",
      "Mahitaji · Mipango ya bidhaa · Mwelekeo wa teknolojia",
    ),
  },
] as const;
