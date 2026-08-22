"use client";

import { useDictionary } from "./DictionaryProvider";

export function useT() {
  const map = useDictionary();
  return (en: string) => map?.[en] ?? en;
}
