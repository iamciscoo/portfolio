import { l } from "@/lib/localize";
import type { ContactInput } from "@/lib/contact-schema";

export const inquiryPresets = [
  {
    id: "website",
    service: "business",
    label: l(
      "A website for my business",
      "Сайт для моего бизнеса",
      "Tovuti ya biashara yangu",
    ),
    brief: l(
      "I’d like a website for my business.\nBusiness and audience: \nPages or features I need: \nExisting website (if any): \nPreferred launch date: ",
      "Мне нужен сайт для бизнеса.\nБизнес и аудитория: \nНужные страницы и функции: \nТекущий сайт (если есть): \nЖелаемая дата запуска: ",
      "Ningependa tovuti ya biashara yangu.\nBiashara na walengwa: \nKurasa au vipengele ninavyohitaji: \nTovuti iliyopo (ikiwa ipo): \nTarehe ninayopendelea: ",
    ),
  },
  {
    id: "application",
    service: "application",
    label: l(
      "An application or product idea",
      "Приложение или идея продукта",
      "Programu au wazo la bidhaa",
    ),
    brief: l(
      "I’d like to discuss an application idea.\nThe problem it should solve: \nWho will use it: \nEssential features: \nWhat I have so far: ",
      "Хочу обсудить идею приложения.\nКакую задачу оно решает: \nКто будет пользоваться: \nОсновные функции: \nЧто уже есть: ",
      "Ningependa kujadili wazo la programu.\nTatizo linalopaswa kutatuliwa: \nWatumiaji wake: \nVipengele muhimu: \nNilichonacho hadi sasa: ",
    ),
  },
  {
    id: "windows",
    service: "windows",
    label: l(
      "Install or reinstall Windows",
      "Установить или переустановить Windows",
      "Kusakinisha au kusakinisha upya Windows",
    ),
    brief: l(
      "I need help installing or reinstalling Windows.\nComputer model: \nCurrent Windows version: \nFiles I need to keep: \nDrivers or applications needed: \nPreferred time: ",
      "Нужна помощь с установкой или переустановкой Windows.\nМодель компьютера: \nТекущая версия Windows: \nКакие файлы нужно сохранить: \nНужные драйверы и программы: \nУдобное время: ",
      "Nahitaji msaada kusakinisha Windows.\nAina ya kompyuta: \nToleo la sasa la Windows: \nFaili ninazotaka kuhifadhi: \nViendeshi au programu zinazohitajika: \nMuda unaofaa: ",
    ),
  },
  {
    id: "software",
    service: "software",
    label: l(
      "Install software or fix an error",
      "Установить программу или исправить ошибку",
      "Kusakinisha programu au kutatua hitilafu",
    ),
    brief: l(
      "I need help with software on my computer.\nApplication name: \nComputer and operating system: \nWhat happens, or the error message: \nWhat I have already tried: ",
      "Нужна помощь с программой на компьютере.\nНазвание программы: \nКомпьютер и операционная система: \nЧто происходит или текст ошибки: \nЧто уже пробовал(а): ",
      "Nahitaji msaada wa programu kwenye kompyuta.\nJina la programu: \nKompyuta na mfumo wa uendeshaji: \nKinachotokea au ujumbe wa hitilafu: \nNilichojaribu tayari: ",
    ),
  },
  {
    id: "gaming",
    service: "gaming",
    label: l(
      "Install a game or fix a launch issue",
      "Установить игру или решить проблему с запуском",
      "Kusakinisha mchezo au kutatua tatizo la kuanza",
    ),
    brief: l(
      "I’d like help setting up a game on my PC.\nGame and launcher: \nComputer specifications: \nInstallation or launch issue: \nController or driver help needed: ",
      "Нужна помощь с игрой на ПК.\nИгра и лаунчер: \nХарактеристики компьютера: \nПроблема с установкой или запуском: \nНужна ли помощь с контроллером или драйверами: ",
      "Ningependa msaada wa mchezo kwenye PC.\nMchezo na programu ya kuanzisha: \nSifa za kompyuta: \nTatizo la kusakinisha au kuanza: \nMsaada wa kidhibiti au viendeshi: ",
    ),
  },
] as const satisfies readonly {
  id: string;
  service: ContactInput["service"];
  label: ReturnType<typeof l>;
  brief: ReturnType<typeof l>;
}[];
