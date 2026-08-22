import { getLocale } from "next-intl/server";
import type { Locale } from "./locales";
import { getDictionary } from "./getDictionary";

export async function getT() {
  const locale = (await getLocale()) as Locale;
  const map = await getDictionary(locale);
  return (en: string) => map?.[en] ?? en;
}
