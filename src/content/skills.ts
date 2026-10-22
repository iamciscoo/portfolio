import { l } from "@/lib/localize";
// Only confirmed CV capabilities are published. Add named tools after owner verification.
export const skillGroups = [
  {
    title: l(
      "Frontend development",
      "Фронтенд-разработка",
      "Uundaji wa frontend",
    ),
    skills: [
      l(
        "Full-stack web development",
        "Full-stack-разработка",
        "Uundaji wa full-stack",
      ),
      l(
        "Interface implementation",
        "Разработка интерфейсов",
        "Uundaji wa muonekano",
      ),
      l(
        "Responsive web experiences",
        "Адаптивные интерфейсы",
        "Uzoefu wa vifaa tofauti",
      ),
    ],
  },
  {
    title: l("Backend & data", "Бэкенд и данные", "Backend na data"),
    skills: [
      l("Database management", "Управление базами данных", "Usimamizi wa data"),
      l("Systems design", "Проектирование систем", "Usanifu wa mifumo"),
      l(
        "Object-oriented programming",
        "Объектно-ориентированное программирование",
        "Programu zenye mwelekeo wa vitu",
      ),
    ],
  },
  {
    title: l(
      "Infrastructure & support",
      "Инфраструктура и поддержка",
      "Miundombinu na msaada",
    ),
    skills: [
      l("Computer networking", "Компьютерные сети", "Mitandao ya kompyuta"),
      l("LAN maintenance", "Обслуживание LAN", "Utunzaji wa LAN"),
      l(
        "Computer troubleshooting",
        "Устранение неполадок",
        "Utatuzi wa hitilafu",
      ),
    ],
  },
  {
    title: l("Product & people", "Продукт и люди", "Bidhaa na watu"),
    skills: [
      l("Product management", "Управление продуктом", "Usimamizi wa bidhaa"),
      l(
        "Technical project delivery",
        "Техническая реализация проектов",
        "Utekelezaji wa miradi",
      ),
      l(
        "Communication & collaboration",
        "Коммуникация и сотрудничество",
        "Mawasiliano na ushirikiano",
      ),
    ],
  },
];
export const pendingTechnologies = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Git",
  "Vercel",
  "Linux",
];
