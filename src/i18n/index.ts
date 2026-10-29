import settings from "../site.config.json" with { type: "json" };
import zh from "./zh.json" with { type: "json" };
import en from "./en.json" with { type: "json" };
import es from "./es.json" with { type: "json" };

export const languages = ["zh", "en", "es"] as const;
export type Language = (typeof languages)[number];
export type TranslationKey = keyof typeof zh;
type Dictionary = Record<TranslationKey, string>;
export const dictionaries = { zh, en, es } satisfies Record<
  Language,
  Dictionary
>;

// The default language is served at the root; others live under /<lang>/.
export const defaultLanguage: Language = "zh";
export const locales = { zh: "zh-CN", en: "en-US", es: "es-ES" } as const;
export const ogLocales = { zh: "zh_CN", en: "en_US", es: "es_ES" } as const;

export const isLanguage = (value: unknown): value is Language =>
  languages.some((language) => language === value);

export function getLanguage(value?: string): Language {
  return isLanguage(value) ? value : defaultLanguage;
}
export function getLanguageFromPath(pathname: string): Language {
  return getLanguage(pathname.split("/")[1]);
}
// "/es/posts/" -> "/posts/" for non-default, unchaged for default
export function stripLanguage(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  return isLanguage(first) && first !== defaultLanguage
    ? `/${rest.join("/")}`
    : pathname;
}
// "/posts/" -> "/es/posts/" for non-default languages, unchanged for the default language.
export function localizePath(lang: Language, path: string): string {
  if (!path.startsWith("/") || lang === defaultLanguage) return path;
  return `/${lang}${path}`;
}

export function translate(
  lang: Language,
  key: TranslationKey,
  values: Record<string, string | number> = {},
): string {
  const dictionary: Dictionary =
    dictionaries[lang] || dictionaries[defaultLanguage];
  const overrides = (settings.text[lang as keyof typeof settings.text] ||
    {}) as Partial<Dictionary>;
  const singularKey = `${key}.one` as TranslationKey;
  const selectedKey =
    typeof values.count === "number" &&
    new Intl.PluralRules(locales[lang] || locales[defaultLanguage]).select(
      values.count,
    ) === "one" &&
    singularKey in dictionary
      ? singularKey
      : key;
  const text =
    overrides[selectedKey] ??
    dictionary[selectedKey] ??
    dictionaries[defaultLanguage][selectedKey] ??
    key;
  if (typeof text !== "string") return key;
  const parameters = {
    site: settings.site.name,
    name:
      (settings.author.name as Record<string, string>)[lang] ||
      (settings.author.name as Record<string, string>)[defaultLanguage] ||
      settings.site.name,
    ...values,
  };
  return text.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in parameters
      ? String(parameters[name as keyof typeof parameters])
      : placeholder,
  );
}
export const useTranslations =
  (lang: Language) =>
  (key: TranslationKey, values?: Record<string, string | number>) =>
    translate(lang, key, values);

export function formatDate(
  lang: Language,
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  return new Intl.DateTimeFormat(locales[lang] || locales[defaultLanguage], {
    timeZone: "UTC",
    ...options,
  }).format(new Date(value));
}

// Static paths for routes under src/pages/[...lang]/.
export const languagePaths = () =>
  languages.map((lang) => ({
    params: { lang: lang === defaultLanguage ? undefined : lang },
  }));
