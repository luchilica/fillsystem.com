"use client";

import { createContext, useContext } from "react";

const DictContext = createContext<Record<string, string> | undefined>(undefined);

export function DictionaryProvider({
  dict,
  children,
}: {
  dict?: Record<string, string>;
  children: React.ReactNode;
}) {
  return <DictContext value={dict}>{children}</DictContext>;
}

export function useDictionary() {
  return useContext(DictContext);
}
