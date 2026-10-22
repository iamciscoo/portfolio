import { l } from "@/lib/localize";
// Only confirmed CV capabilities are published. Add named tools after owner verification.
export const skillGroups = [
  {
    title: l(
      "Frontend development",
      "Фронтенд-разработка",
      "Uundaji wa frontend",
      "Développement frontend",
      "Desarrollo frontend",
    ),
    skills: [
      l(
        "Full-stack web development",
        "Full-stack-разработка",
        "Uundaji wa full-stack",
        "Développement web full-stack",
        "Desarrollo web full-stack",
      ),
      l(
        "Interface implementation",
        "Разработка интерфейсов",
        "Uundaji wa muonekano",
        "Réalisation d’interfaces",
        "Implementación de interfaces",
      ),
      l(
        "Responsive web experiences",
        "Адаптивные интерфейсы",
        "Uzoefu wa vifaa tofauti",
        "Expériences web adaptatives",
        "Experiencias web adaptables",
      ),
    ],
  },
  {
    title: l(
      "Backend & data",
      "Бэкенд и данные",
      "Backend na data",
      "Backend et données",
      "Backend y datos",
    ),
    skills: [
      l(
        "Database management",
        "Управление базами данных",
        "Usimamizi wa data",
        "Gestion de bases de données",
        "Gestión de bases de datos",
      ),
      l(
        "Systems design",
        "Проектирование систем",
        "Usanifu wa mifumo",
        "Conception de systèmes",
        "Diseño de sistemas",
      ),
      l(
        "Object-oriented programming",
        "Объектно-ориентированное программирование",
        "Programu zenye mwelekeo wa vitu",
        "Programmation orientée objet",
        "Programación orientada a objetos",
      ),
    ],
  },
  {
    title: l(
      "Infrastructure & support",
      "Инфраструктура и поддержка",
      "Miundombinu na msaada",
      "Infrastructure et assistance",
      "Infraestructura y soporte",
    ),
    skills: [
      l(
        "Computer networking",
        "Компьютерные сети",
        "Mitandao ya kompyuta",
        "Réseaux informatiques",
        "Redes informáticas",
      ),
      l(
        "LAN maintenance",
        "Обслуживание LAN",
        "Utunzaji wa LAN",
        "Maintenance de réseaux locaux",
        "Mantenimiento de redes locales",
      ),
      l(
        "Computer troubleshooting",
        "Устранение неполадок",
        "Utatuzi wa hitilafu",
        "Dépannage informatique",
        "Solución de problemas informáticos",
      ),
    ],
  },
  {
    title: l(
      "Product & people",
      "Продукт и люди",
      "Bidhaa na watu",
      "Produit et collaboration",
      "Producto y personas",
    ),
    skills: [
      l(
        "Product management",
        "Управление продуктом",
        "Usimamizi wa bidhaa",
        "Gestion de produit",
        "Gestión de producto",
      ),
      l(
        "Technical project delivery",
        "Техническая реализация проектов",
        "Utekelezaji wa miradi",
        "Réalisation de projets techniques",
        "Entrega de proyectos técnicos",
      ),
      l(
        "Communication & collaboration",
        "Коммуникация и сотрудничество",
        "Mawasiliano na ushirikiano",
        "Communication et collaboration",
        "Comunicación y colaboración",
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
