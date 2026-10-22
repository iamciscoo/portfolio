import { l } from "@/lib/localize";
export const restaurant = {
  eyebrow: l(
    "SEASONAL KITCHEN · COASTAL SPIRIT",
    "СЕЗОННАЯ КУХНЯ · ДУХ ПОБЕРЕЖЬЯ",
    "JIKO LA MSIMU · ROHO YA PWANI",
  ),
  title: l(
    "A seat at\nsomething special.",
    "Место для\nособенных вечеров.",
    "Nafasi katika\nkitu cha kipekee.",
  ),
  intro: l(
    "Good food. Better company. An unhurried celebration of the season, from the first bite to the last conversation.",
    "Хорошая еда. Прекрасная компания. Неспешное наслаждение сезоном — от первого кусочка до последнего разговора.",
    "Chakula kizuri. Kampuni nzuri zaidi. Furahia msimu bila haraka, kutoka tonge la kwanza hadi mazungumzo ya mwisho.",
  ),
  storyTitle: l(
    "Rooted in the coast.\nMade for the table.",
    "Рождённое на побережье.\nСозданное для вашего стола.",
    "Mizizi ya pwani.\nKwa ajili ya meza.",
  ),
  story: l(
    "SAVOUR is a fictional neighbourhood kitchen imagined around fresh produce, generous hospitality and the simple joy of sharing a meal. Our concept menu follows the coast: bright citrus, warming spices and carefully prepared local ingredients.",
    "SAVOUR — концепт уютного ресторана, основанный на свежих продуктах, гостеприимстве и радости совместного ужина. В меню — настроение побережья: цитрусы, тёплые специи и местные ингредиенты.",
    "SAVOUR ni dhana ya mgahawa wa ujirani wenye mazao safi, ukarimu na furaha ya kula pamoja. Menyu yetu ya mfano inafuata pwani: machungwa, viungo na mazao ya eneo.",
  ),
  menuTitle: l("A taste of the season.", "Вкус сезона.", "Ladha ya msimu."),
  menuNote: l(
    "Sample menu · Prices in TZS · Fictional restaurant",
    "Пример меню · Цены в TZS · Вымышленный ресторан",
    "Menyu ya mfano · Bei kwa TZS · Mgahawa wa kubuni",
  ),
  featured: l(
    "A little time.\nA lasting memory.",
    "Немного времени.\nДолгое послевкусие.",
    "Muda kidogo.\nKumbukumbu ya kudumu.",
  ),
  featuredBody: l(
    "Long dinners, seasonal plates, and room for one more story. Explore the space and imagine an evening here.",
    "Долгие ужины, сезонные блюда и время ещё для одной истории. Загляните внутрь и представьте свой вечер здесь.",
    "Chakula cha jioni, sahani za msimu na nafasi ya hadithi moja zaidi. Tazama eneo na fikiria jioni hapa.",
  ),
  visit: l(
    "Find your way to the table.",
    "Ваш путь к нашему столу.",
    "Fika kwenye meza.",
  ),
  location: l(
    "Concept location: Dar es Salaam, Tanzania. No physical restaurant operates under this demonstration.",
    "Условное расположение: Дар-эс-Салам, Танзания. За этим концептом не стоит действующий ресторан.",
    "Mahali pa mfano: Dar es Salaam, Tanzania. Hakuna mgahawa halisi unaoendeshwa kupitia demo hii.",
  ),
  hours: l(
    "Tuesday–Sunday / 18:00–22:30\nMonday / Closed",
    "Вторник–воскресенье / 18:00–22:30\nПонедельник / Выходной",
    "Jumanne–Jumapili / 18:00–22:30\nJumatatu / Imefungwa",
  ),
};
export const menu = [
  {
    id: "starters",
    title: l("To begin", "Для начала", "Kuanza"),
    dishes: [
      {
        name: l("Charred garden greens", "Овощи на гриле", "Mboga za kuchoma"),
        description: l(
          "Lemon labneh, toasted seeds, herb oil",
          "Лабне с лимоном, семечки, масло с травами",
          "Labneh ya limau, mbegu na mafuta ya mimea",
        ),
        price: "18,000",
      },
      {
        name: l(
          "Coastal prawn toast",
          "Тост с креветками",
          "Tosti ya kamba wa pwani",
        ),
        description: l(
          "Sourdough, chilli butter, fresh lime",
          "Заквасочный хлеб, масло с чили, лайм",
          "Mkate, siagi ya pilipili na ndimu",
        ),
        price: "24,000",
      },
      {
        name: l(
          "Roasted tomato salad",
          "Салат с печёными томатами",
          "Saladi ya nyanya zilizooka",
        ),
        description: l(
          "Basil, creamy curd, crisp shallots",
          "Базилик, нежный сыр, хрустящий шалот",
          "Basili, jibini laini na vitunguu",
        ),
        price: "16,000",
      },
    ],
  },
  {
    id: "mains",
    title: l("The main event", "Главные блюда", "Mlo mkuu"),
    dishes: [
      {
        name: l("Catch of the evening", "Улов вечера", "Samaki wa jioni"),
        description: l(
          "Pan-seared fish, coconut rice, citrus greens",
          "Рыба, кокосовый рис, зелень с цитрусами",
          "Samaki, wali wa nazi na mboga",
        ),
        price: "42,000",
      },
      {
        name: l(
          "Slow-braised short rib",
          "Томлёные говяжьи рёбра",
          "Mbavu zilizopikwa polepole",
        ),
        description: l(
          "Silky mash, roasted roots, red wine jus",
          "Пюре, запечённые корнеплоды, винный соус",
          "Viazi, mboga za mizizi na mchuzi",
        ),
        price: "48,000",
      },
      {
        name: l("Garden risotto", "Ризотто с овощами", "Risotto ya mboga"),
        description: l(
          "Seasonal greens, aged cheese, lemon",
          "Сезонные овощи, выдержанный сыр, лимон",
          "Mboga za msimu, jibini na limau",
        ),
        price: "32,000",
      },
    ],
  },
  {
    id: "desserts",
    title: l("Something sweet", "На сладкое", "Kitamu kidogo"),
    dishes: [
      {
        name: l(
          "Coconut panna cotta",
          "Кокосовая панна-котта",
          "Panna cotta ya nazi",
        ),
        description: l(
          "Passion fruit, coconut crumb",
          "Маракуйя, кокосовая крошка",
          "Pasheni na makombo ya nazi",
        ),
        price: "14,000",
      },
      {
        name: l(
          "Warm chocolate tart",
          "Тёплый шоколадный тарт",
          "Tart ya chokoleti moto",
        ),
        description: l(
          "Vanilla ice cream, sea salt",
          "Ванильное мороженое, морская соль",
          "Aiskrimu ya vanila na chumvi ya bahari",
        ),
        price: "16,000",
      },
    ],
  },
];
