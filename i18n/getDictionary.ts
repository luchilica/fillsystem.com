import type { Locale } from "./locales";

export async function getDictionary(
  locale: Locale,
): Promise<Record<string, string> | undefined> {
  switch (locale) {
    case "es-US":
      return (await import("./dictionaries/es-US")).default;
    case "ru-US":
      return (await import("./dictionaries/ru-US")).default;
    case "zh-Hans":
      return (await import("./dictionaries/zh-Hans")).default;
    default:
      return undefined;
  }
}
